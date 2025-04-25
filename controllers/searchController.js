import { searchAllJobs } from './api/unifiedController';
import { formatJobMessage } from '../utils/jobFormatter';

export const searchCommand = async (ctx) => {
  try {
    const user = await User.findOne({ telegramId: ctx.from.id });
    if (!user?.filters?.languages?.length) {
      return ctx.reply('⚠️ Defina tecnologias primeiro (/language JavaScript)');
    }

    ctx.replyWithMarkdown('🔍 *Buscando vagas nas melhores plataformas...*');

    const jobs = await searchAllJobs(user.filters);
    if (!jobs.length) {
      return ctx.reply('ℹ️ Nenhuma vaga encontrada. Tente ajustar os filtros.');
    }

    // Envia as primeiras 10 vagas
    for (const job of jobs.slice(0, 10)) {
      await ctx.replyWithMarkdown(
        formatJobMessage(job),
        { disable_web_page_preview: true } // Evita prévia do link
      );
      await new Promise(resolve => setTimeout(resolve, 300)); // Delay anti-flood
    }

  } catch (error) {
    console.error('Search Error:', error);
    ctx.reply('❌ Erro ao buscar vagas. Tente novamente mais tarde.');
  }
};  