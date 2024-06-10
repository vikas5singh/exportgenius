const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const Bull = require('bull'); // Correct import for Bull
const sharp = require('sharp');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Create a Bull queue for image processing
const imageQueue = new Bull('image processing', {
    limiter: {
        max: 2, // Limit to 2 jobs at a time
        duration: 1000 // per second
    }
});

// Image processing job
imageQueue.process(async (job, done) => {
    const { filePath, outputFilePath } = job.data;

    try {
        await sharp(filePath)
            .resize(400, 400)
            .toFormat('png')
            .toFile(outputFilePath);

        // Update the database with the processed image path
        await prisma.media.update({
            where: { id: job.data.mediaId },
            data: { processedPath: outputFilePath },
        });

        done();
    } catch (error) {
        done(error);
    }
});

module.exports = { upload, imageQueue };
