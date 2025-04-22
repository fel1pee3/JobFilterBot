import User from '../models/User.js';

export const startCommand = async (ctx) => {
  try {
    const user = await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { 
        $setOnInsert: { 
          telegramId: ctx.from.id,
          firstName: ctx.from.first_name,
          lastName: ctx.from.last_name,
          username: ctx.from.username
        }
      },
      { upsert: true, new: true }
    );
    
    ctx.replyWithMarkdown(`👋 Olá, ${ctx.from.first_name}! Eu sou o *Job Filter Bot*.\n\n` +
      `🔍 Eu posso te ajudar a encontrar vagas de TI baseadas em seus critérios.\n\n` +
      `📌 Use /help para ver todos os comandos disponíveis\n` +
      `⚡ Comece configurando seus filtros com /language, /level, /salary etc.`);
  } catch (error) {
    console.error('Error in startCommand:', error);
    ctx.reply('❌ Ocorreu um erro ao iniciar o bot.');
  }
};

export const helpCommand = async (ctx) => {
  ctx.replyWithMarkdown(`
🛠 *Guia de Comandos do Job Filter Bot*

🔍 *Configuração de Filtros:*
/language <tecnologias> - Ex: /language Node.js, Python
/level <nível> - Ex: /level Pleno
/salary <valor> - Ex: /salary 5000
/workmode <tipo> - Ex: /workmode remote
/searchtype <tipo> - Ex: /searchtype Backend
/location <local> - Ex: /location São Paulo
/postdate <período> - Ex: /postdate 7d
/contract <tipo> - Ex: /contract CLT
/companysize <tamanho> - Ex: /companysize Startup
/industry <setor> - Ex: /industry Fintech
/experience <anos> - Ex: /experience 3-5

🔧 *Outros Comandos:*
/search - Busca vagas com filtros atuais
/filters - Mostra seus filtros configurados
/reset - Redefine todos os filtros
/commands - Lista todos os comandos
/help - Mostra este guia
`);
};

export const commandsCommand = async (ctx) => {
  ctx.replyWithMarkdown(`
📜 *Lista de Comandos:*

/language /level /salary /workmode /searchtype
/location /postdate /contract /companysize
/industry /experience /search /filters
/reset /commands /help
`);
};

export const resetCommand = async (ctx) => {
  try {
    await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { $set: { filters: DEFAULT_FILTERS } }
    );
    ctx.reply('✅ Todos os filtros foram redefinidos para os valores padrão.');
  } catch (error) {
    console.error('Error in resetCommand:', error);
    ctx.reply('❌ Ocorreu um erro ao redefinir seus filtros.');
  }
};