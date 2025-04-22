import User from '../models/User.js';
import { 
  VALID_LEVELS, 
  VALID_WORKMODES, 
  VALID_CONTRACTS, 
  VALID_COMPANY_SIZES,
  VALID_EXPERIENCES
} from '../configs/constants.js';
import { capitalizeFirstLetter, formatFilters } from '../utils/helpers.js';

const updateFilter = async (ctx, filterField, value, validation = null) => {
  try {
    if (validation && !validation.includes(value)) {
      return ctx.reply(`❌ Valor inválido. Opções válidas: ${validation.join(', ')}`);
    }

    const user = await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { $set: { [`filters.${filterField}`]: value } },
      { new: true }
    );

    ctx.reply(`✅ ${capitalizeFirstLetter(filterField)} definido como: ${value}`);
  } catch (error) {
    console.error(`Error in ${filterField}Command:`, error);
    ctx.reply(`❌ Ocorreu um erro ao atualizar ${filterField}.`);
  }
};

export const languageCommand = async (ctx) => {
  try {
    const input = ctx.message.text.replace('/language', '').trim();
    
    if (!input) {
      return ctx.reply('❌ Informe as tecnologias. Ex: /language Node.js, Python');
    }
    
    const languages = input.split(',').map(lang => lang.trim());
    
    const user = await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { $set: { 'filters.languages': languages } },
      { new: true }
    );
    
    ctx.reply(`✅ Tecnologias salvas: ${user.filters.languages.join(', ')}`);
  } catch (error) {
    console.error('Error in languageCommand:', error);
    ctx.reply('❌ Ocorreu um erro ao salvar suas preferências.');
  }
};

export const levelCommand = async (ctx) => {
  const input = ctx.message.text.replace('/level', '').trim();
  await updateFilter(ctx, 'level', capitalizeFirstLetter(input), VALID_LEVELS);
};

export const salaryCommand = async (ctx) => {
  try {
    const input = ctx.message.text.replace('/salary', '').trim();
    const salary = parseInt(input);
    
    if (isNaN(salary)) {
      return ctx.reply('❌ Valor inválido. Ex: /salary 5000');
    }
    
    await updateFilter(ctx, 'salary', salary);
  } catch (error) {
    console.error('Error in salaryCommand:', error);
    ctx.reply('❌ Ocorreu um erro ao atualizar seu salário mínimo.');
  }
};

export const workmodeCommand = async (ctx) => {
  const input = ctx.message.text.replace('/workmode', '').trim();
  await updateFilter(ctx, 'workMode', capitalizeFirstLetter(input), VALID_WORKMODES);
};

export const searchtypeCommand = async (ctx) => {
  const input = ctx.message.text.replace('/searchtype', '').trim();
  await updateFilter(ctx, 'searchType', capitalizeFirstLetter(input));
};

export const locationCommand = async (ctx) => {
  const input = ctx.message.text.replace('/location', '').trim();
  await updateFilter(ctx, 'location', input);
};

export const postdateCommand = async (ctx) => {
  const input = ctx.message.text.replace('/postdate', '').trim();
  await updateFilter(ctx, 'postDate', input);
};

export const contractCommand = async (ctx) => {
  const input = ctx.message.text.replace('/contract', '').trim();
  await updateFilter(ctx, 'contract', capitalizeFirstLetter(input), VALID_CONTRACTS);
};

export const companysizeCommand = async (ctx) => {
  const input = ctx.message.text.replace('/companysize', '').trim();
  await updateFilter(ctx, 'companySize', capitalizeFirstLetter(input), VALID_COMPANY_SIZES);
};

export const industryCommand = async (ctx) => {
  const input = ctx.message.text.replace('/industry', '').trim();
  await updateFilter(ctx, 'industry', input);
};

export const experienceCommand = async (ctx) => {
  const input = ctx.message.text.replace('/experience', '').trim();
  await updateFilter(ctx, 'experience', input, VALID_EXPERIENCES);
};

export const filtersCommand = async (ctx) => {
  try {
    const user = await User.findOne({ telegramId: ctx.from.id });
    
    if (!user) {
      return ctx.reply('❌ Use /start para configurar seus filtros primeiro.');
    }
    
    ctx.replyWithMarkdown(`🔍 *Seus Filtros Atuais*\n\n${formatFilters(user.filters)}`);
  } catch (error) {
    console.error('Error in filtersCommand:', error);
    ctx.reply('❌ Ocorreu um erro ao recuperar seus filtros.');
  }
};