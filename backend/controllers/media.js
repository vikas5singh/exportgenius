const { imageQueue } = require('../lib/uploadImg');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

module.exports = {
  uploadMedia: async (req, res) => {
    const data = req.user;
    const userId = data.id;
    const file = req.file;
    const body = req.body;
    console.log("body",body);
    if (!file) {
      return res.status(400).json({ success:false,message: 'File not received' });
    }

    try {
      const media = await prisma.media.create({
        data: {
          originalPath: file.path,
          processedPath:file.filename,
          userId: parseInt(userId),
          scheduledDate: body?.scheduledDate || null,
          scheduledTime: body?.scheduledTime || null,
        },
      });
      const outputFilePath = `processed/${path.basename(file.path, path.extname(file.path))}.png`;
      imageQueue.add({
        filePath: file.path,
        outputFilePath,
        mediaId: media.id,
      });

      res.status(201).json({ success:true,message: 'Image uploaded successfully', media });
    } catch (error) {
      res.status(500).json({ success:false,message: error.message });
    }
  },

  view :  async (req, res) => {
    try {
        let data = req.user;
        let id = Number(req.params.id);
     
        if(!id)  return res.status(400).json({success:false, message:"Media id is required!"});
        console.log("data",data);
        let media = await prisma.media.findUnique({where: { id: id, userId:data.id}});
        console.log("media",media);
        if(media) {
            return res.status(200).json({success: true, message:"Media fetch successfuly!",media});
        }else{
         return res.status(400).json({success: false, message:"No data found with id"});
        }
    }
    catch (error) {
       return res.status(500).json({success:false, message:error});
    }
  },

  list :  async (req, res) => {
    try {
        let data = req.user;
        let media = await prisma.media.findMany({ where:{userId:data.id}});
        if(media) {
            return res.status(200).json({success:true, message:"Media fetch successfuly!",media});
        }else{
         return res.status(400).json({success:false, message:"No data found!"});
        }
    }
    catch (error) {
       return res.status(500).json({success:false, message:error});
    }
  },
};
