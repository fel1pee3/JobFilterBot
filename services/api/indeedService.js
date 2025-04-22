import axios from 'axios';
import { API_CONFIG } from '../../config/apiConfig';

export const fetchIndeedJobs = async (filters) => {
  try {
    const params = {
      ...API_CONFIG.INDEED.DEFAULT_PARAMS,
      q: filters.languages.join(' OR '),
      l: filters.location === 'Remoto' ? '' : filters.location,
      fromage: filters.postDate === '24h' ? 1 : 3
    };

    const response = await axios.get(API_CONFIG.INDEED.BASE_URL, { params });
    return response.data.results.map(job => ({
      title: job.jobtitle,
      description: job.snippet.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
      salary: job.salary || 'A combinar',
      technologies: filters.languages, // Indeed não retorna techs diretamente
      platform: 'Indeed',
      url: job.url,
      company: job.company
    }));
  } catch (error) {
    console.error('Indeed Error:', error);
    return [];
  }
};