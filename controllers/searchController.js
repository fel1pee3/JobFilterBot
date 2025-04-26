import User from '../models/User.js';
import { fetchJobsFromAPI } from '../services/apiService.js';
import { formatJobMessage } from '../utils/helpers.js';

export const searchCommand = async (ctx) => {
  try {
    const user = await User.findOne({ telegramId: ctx.from.id });
    if (!user) return ctx.reply('⚠️ Use /start primeiro');

    await ctx.replyWithMarkdown('🔍 *Procurando vagas na JSearch...*');

    const jobs = await fetchJobsFromAPI(user.filters);
    
    if (jobs.length === 0) {
      return ctx.replyWithMarkdown('ℹ️ Nenhuma vaga encontrada com seus filtros atuais');
    }

    // Envia máximo 3 vagas com detalhes
    for (const job of jobs.slice(0, 3)) {
      await ctx.replyWithMarkdown(formatJobMessage(job), {
        disable_web_page_preview: true
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (error) {
    ctx.reply('❌ Erro na busca. Tente novamente mais tarde');
    console.error('Erro no /search:', error);
  }
};