import User from '../models/User.js';
import Job from '../models/Job.js';
import { formatJobMessage } from '../utils/helpers.js';

export const sendJobNotifications = async (bot) => {
  try {
    const users = await User.find();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    for (const user of users) {
      const query = {
        postedAt: { $gte: yesterday },
        ...buildFiltersQuery(user.filters)
      };

      const jobs = await Job.find(query).limit(3);
      
      if (jobs.length > 0) {
        await bot.telegram.sendMessage(
          user.telegramId,
          `🔔 *${jobs.length} novas vagas para você!*`,
          { parse_mode: 'Markdown' }
        );
        
        for (const job of jobs) {
          await bot.telegram.sendMessage(
            user.telegramId,
            formatJobMessage(job),
            { parse_mode: 'Markdown' }
          );
        }
      }
    }
  } catch (error) {
    console.error('Erro nas notificações:', error.message);
  }
};

const buildFiltersQuery = (filters) => {
  const query = {};
  if (filters.languages.length > 0) query.technologies = { $all: filters.languages };
  if (filters.level !== 'Todos') query.level = filters.level;
  if (filters.salary > 0) query['salary.min'] = { $gte: filters.salary };
  if (filters.workMode !== 'Todos') query.workMode = filters.workMode;
  return query;
};