import { Telegraf } from 'telegraf';
import {
  startCommand,
  helpCommand,
  commandsCommand,
  resetCommand
} from '../controllers/basicCommands.js';

import {
  languageCommand,
  levelCommand,
  salaryCommand,
  workmodeCommand,
  searchtypeCommand,
  locationCommand,
  postdateCommand,
  contractCommand,
  companysizeCommand,
  industryCommand,
  experienceCommand,
  filtersCommand
} from '../controllers/filterCommands.js';

import { searchCommand } from '../controllers/searchController.js';

const setupBotRoutes = (bot) => {
  // Comandos básicos
  bot.start(startCommand);
  bot.help(helpCommand);
  bot.command('commands', commandsCommand);
  bot.command('reset', resetCommand);
  
  // Comandos de filtro
  bot.command('language', languageCommand);
  bot.command('level', levelCommand);
  bot.command('salary', salaryCommand);
  bot.command('workmode', workmodeCommand);
  bot.command('searchtype', searchtypeCommand);
  bot.command('location', locationCommand);
  bot.command('postdate', postdateCommand);
  bot.command('contract', contractCommand);
  bot.command('companysize', companysizeCommand);
  bot.command('industry', industryCommand);
  bot.command('experience', experienceCommand);
  bot.command('filters', filtersCommand);
  
  // Comando de busca
  bot.command('search', searchCommand);
};

export default setupBotRoutes;