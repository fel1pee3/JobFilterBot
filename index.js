import 'dotenv/config';
import { Telegraf } from 'telegraf';
import cron from 'node-cron';
import connectDB from './configs/db.js';
import setupBotRoutes from './routes/botRoutes.js';
import { loadSampleJobs } from './services/jobService.js';
import { sendJobNotifications } from './services/notificationService.js';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const start = async () => {
  await connectDB();
  await loadSampleJobs();

  cron.schedule('0 * * * *', () => { // Roda a cada hora
    sendJobNotifications(bot);
  });

  setupBotRoutes(bot);
  bot.launch();
  console.log('🤖 Bot operacional!');
};

start().catch(err => {
  console.error('❌ Falha crítica:', err);
  process.exit(1);
});
