import User from '../models/User.js';
import Job from '../models/Job.js';
import { formatJobMessage } from '../utils/helpers.js';

export const sendJobNotifications = async (bot) => {
  try {
    const users = await User.find();
    
    for (const user of users) {
      const jobs = await Job.find({
        // Filtros baseados nas preferências do usuário
        $or: [
          { technologies: { $in: user.filters.languages } },
          { level: user.filters.level !== 'Todos' ? user.filters.level : { $exists: true } },
          { 'salary.min': { $gte: user.filters.salary } }
        ]
      }).limit(5);
      
      if (jobs.length > 0) {
        await bot.telegram.sendMessage(
          user.telegramId,
          `🔔 ${jobs.length} novas vagas que podem te interessar:`
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
    console.error('❌ Erro ao enviar notificações:', error);
  }
};