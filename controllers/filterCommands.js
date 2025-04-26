import User from '../models/User.js';
import { VALID } from '../configs/constants.js';
import { capitalize, formatFilters } from '../utils/helpers.js';

const validateInput = (value, options, field) => {
  if (!options.includes(value)) throw `Opções válidas para ${field}: ${options.join(', ')}`;
};

const updateFilter = async (ctx, field, value, validation) => {
  try {
    if (validation) validateInput(value, validation, field);
    
    await User.updateOne(
      { telegramId: ctx.from.id },
      { $set: { [`filters.${field}`]: value } }
    );
    
    ctx.reply(`✅ ${capitalize(field)} definido para: ${value}`);
  } catch (error) {
    ctx.reply(`❌ Erro: ${error}`);
  }
};

// Comandos Específicos
export const languageCommand = async (ctx) => {
  try {
    const input = ctx.message.text.split(' ').slice(1).join(' ');
    if (!input) throw 'Informe tecnologias separadas por vírgula';
    
    const languages = [...new Set(input.split(',').map(lang => lang.trim()))];
    await User.updateOne(
      { telegramId: ctx.from.id },
      { $set: { 'filters.languages': languages } }
    );
    ctx.reply(`✅ Linguagens salvas:\n${languages.join(', ')}`);
  } catch (error) {
    ctx.reply(`❌ ${error}`);
  }
};

export const levelCommand = async (ctx) => {
  const input = capitalize(ctx.message.text.split(' ')[1] || 'Todos');
  await updateFilter(ctx, 'level', input, VALID.LEVELS);
};

export const salaryCommand = async (ctx) => {
  const input = ctx.message.text.split(' ')[1];
  if (!input || isNaN(input)) return ctx.reply('❌ Informe um valor numérico');
  await updateFilter(ctx, 'salary', Number(input));
};

export const workmodeCommand = async (ctx) => {
  const input = capitalize(ctx.message.text.split(' ')[1] || 'Todos');
  await updateFilter(ctx, 'workMode', input, VALID.WORKMODES);
};

export const postdateCommand = async (ctx) => {
  const input = ctx.message.text.split(' ')[1] || ('Todos');
  await updateFilter(ctx, 'postDate', input, VALID.POSTDATES);
};

export const contractCommand = async (ctx) => {
  const input = capitalize(ctx.message.text.split(' ')[1] || 'Todos');
  await updateFilter(ctx, 'contract', input, VALID.CONTRACTS);
};

export const companysizeCommand = async (ctx) => {
  const input = capitalize(ctx.message.text.split(' ')[1] || 'Todos');
  await updateFilter(ctx, 'companySize', input, VALID.COMPANY_SIZES);
};

export const experienceCommand = async (ctx) => {
  const input = ctx.message.text.split(' ')[1];
  const jsearchMap = {
    '0-1': 'under_3',
    '1-3': 'under_3',
    '3-5': 'more_than_3',
    '5+': 'more_than_5'
  };
  
  await updateFilter(ctx, 'experience', jsearchMap[input] || 'Todos', VALID.EXPERIENCES);
};

export const filtersCommand = async (ctx) => {
  try {
    const user = await User.findOne({ telegramId: ctx.from.id });
    ctx.replyWithMarkdown(formatFilters(user.filters));
  } catch (error) {
    ctx.reply('❌ Use /start primeiro');
  }
};

export const searchtypeCommand = async (ctx) => {
  const input = capitalize(ctx.message.text.split(' ')[1] || 'Todos');
  await updateFilter(ctx, 'searchType', input, VALID.SEARCHTYPES);
};

export const locationCommand = async (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ') || 'Todos';
  await updateFilter(ctx, 'location', input);
};

export const industryCommand = async (ctx) => {
  const input = capitalize(ctx.message.text.split(' ').slice(1).join(' ') || 'Todos');
  await updateFilter(ctx, 'industry', input, VALID.INDUSTRIES);
};