import User from '../models/User.js';
import { DEFAULT_FILTERS, VALID } from '../configs/constants.js';

export const startCommand = async (ctx) => {
  try {
    await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { 
        $setOnInsert: { 
          ...DEFAULT_FILTERS,
          telegramId: ctx.from.id,
          firstName: ctx.from.first_name,
          username: ctx.from.username
        }
      },
      { upsert: true }
    );
    
    ctx.replyWithMarkdown(`👋 Olá *${ctx.from.first_name}!* Eu sou o Job Filter Bot\n\n`
      + `Use /help para ver todos os comandos disponíveis`);
  } catch (error) {
    ctx.reply('❌ Erro ao iniciar. Tente /start novamente.');
  }
};

export const helpCommand = (ctx) => {
  ctx.replyWithMarkdown(`
*🛠 COMANDOS DISPONÍVEIS*

*⚙️ Configurar Filtros:*
/language [tecnologias] - Ex: /language Node.js, Python
/level [${VALID.LEVELS.join('|')}]
/salary [valor]
/workmode [${VALID.WORKMODES.join('|')}]
/contract [${VALID.CONTRACTS.join('|')}]
/companysize [${VALID.COMPANY_SIZES.join('|')}]
/postdate [${VALID.POSTDATES.join('|')}]

*🔍 Ações:*
/search - Buscar vagas
/filters - Ver filtros atuais
/reset - Resetar filtros
/commands - Lista rápida
`);
};

export const commandsCommand = (ctx) => {
  ctx.replyWithMarkdown(`
📜 *Comandos Rápidos:*
/search /filters /reset
/level /salary /workmode
/language /contract /companysize
/postdate /help
`);
};

export const resetCommand = async (ctx) => {
  try {
    await User.updateOne(
      { telegramId: ctx.from.id },
      { $set: { filters: DEFAULT_FILTERS } }
    );
    ctx.reply('✅ Filtros resetados com sucesso!');
  } catch (error) {
    ctx.reply('❌ Erro ao resetar filtros');
  }
};