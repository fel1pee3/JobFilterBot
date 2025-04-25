import User from '../models/User.js';
import Job from '../models/Job.js';
import { formatFilters, formatJobMessage } from '../utils/helpers.js';

export const searchCommand = async (ctx) => {
  try {
    const user = await User.findOne({ telegramId: ctx.from.id });
    
    if (!user) {
      return ctx.reply('❌ Seus filtros não foram configurados. Use /start primeiro.');
    }
    
    ctx.replyWithMarkdown('🔍 *Buscando vagas com seus critérios...*');
    
    // Construir query baseada nos filtros
    const query = {};
    
    // Filtro por tecnologias
    if (user.filters.languages.length > 0) {
      query.technologies = { $in: user.filters.languages.map(lang => new RegExp(lang, 'i')) };
    }
    
    // Filtro por nível
    if (user.filters.level !== 'Todos') {
      query.level = user.filters.level;
    }
    
    // Filtro por salário
    if (user.filters.salary > 0) {
      query['salary.min'] = { $gte: user.filters.salary };
    }
    
    // Filtro por modelo de trabalho
    if (user.filters.workMode !== 'Todos') {
      query.workMode = user.filters.workMode;
    }
    
    // Filtro por tipo de vaga
    if (user.filters.searchType !== 'Todos') {
      query.searchType = user.filters.searchType;
    }
    
    // Busca as vagas no banco de dados
    const jobs = await Job.find(query).limit(10);
    
    if (jobs.length === 0) {
      return ctx.replyWithMarkdown('ℹ️ *Nenhuma vaga encontrada com seus critérios atuais.*\n\n' +
        `*Filtros aplicados:*\n${formatFilters(user.filters)}`);
    }
    
    // Envia cada vaga encontrada
    for (const job of jobs) {
      await ctx.replyWithMarkdown(formatJobMessage(job));
      await new Promise(resolve => setTimeout(resolve, 300)); // Pequeno delay entre mensagens
    }
    
    ctx.replyWithMarkdown(`✅ *${jobs.length} vagas encontradas!*\n\n` +
      `Use /filters para ver seus critérios atuais ou /help para mais opções.`);
      
  } catch (error) {
    console.error('Error in searchCommand:', error);
    ctx.reply('❌ Ocorreu um erro ao buscar vagas. Por favor, tente novamente.');
  }
};