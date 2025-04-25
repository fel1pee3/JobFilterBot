import 'dotenv/config';
import { Telegraf } from 'telegraf';
import connectDB from './configs/db.js';
import setupBotRoutes from './routes/botRoutes.js';
import { loadSampleJobs } from './services/jobService.js';

// Configuração inicial
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Inicialização do sistema
const start = async () => {
  await connectDB();
  await loadSampleJobs(); // Carrega dados iniciais
  
  setupBotRoutes(bot);
  bot.launch();
  console.log('🤖 Bot iniciado com sucesso!');
};

start().catch(err => {
  console.error('❌ Falha crítica:', err);
  process.exit(1);
});

// Encerramento seguro
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));