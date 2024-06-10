const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment');

const cronMedia = async () => {
  try {
    const now = moment().format('DD-MM-YYYY HH:mm');
    const [date, time] = now.split(' ');
     console.log("data",date,time)
    const mediaItems = await prisma.media.findMany({
      where: {
        published: false,
        scheduledDate: date,
        scheduledTime: time,
      },
    });
  console.log("data",mediaItems)
    for (const media of mediaItems) {
      await prisma.media.update({
        where: { id: media.id },
        data: { published: true },
      });

      console.log(`Published media id: ${media.id}`);
    }
  } catch (error) {
    console.error('Error publishing media:', error);
  }
};

// Schedule a task to run every minute
cron.schedule('* * * * *', cronMedia);

module.exports = { cronMedia };
