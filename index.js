import dontenv from 'dotenv';   
dontenv.config();
import { Telegraf } from 'telegraf';
import connectDB from './configs/db.js';
import setupBotRoutes from './routes/botRoutes.js';

// Verifica variáveis de ambiente
if (!process.env.TELEGRAM_TOKEN) {
  console.error('❌ TELEGRAM_TOKEN não definido no .env');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI não definido no .env');npms
  process.exit(1);
}

// Inicializa o bot
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Conecta ao MongoDB
connectDB();

// Configura as rotas do bot
setupBotRoutes(bot);

// Inicia o bot
bot.launch()
  .then(() => console.log('🤖 Bot iniciado com sucesso!'))
  .catch(err => console.error('❌ Erro ao iniciar o bot:', err));

// Tratamento de encerramento
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));