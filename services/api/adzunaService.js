import axios from 'axios';
import { API_CONFIG } from '../../config/apiConfig';

export const fetchAdzunaJobs = async (filters) => {
  try {
    const params = {
      ...API_CONFIG.ADZUNA.DEFAULT_PARAMS,
      what: filters.languages.join(' '),
      where: filters.location === 'Remoto' ? '' : filters.location,
      salary_min: filters.salary || 0
    };

    const response = await axios.get(`${API_CONFIG.ADZUNA.BASE_URL}/search/1`, { params });
    return response.data.results.map(job => ({
      title: job.title,
      description: job.description.slice(0, 100) + '...',
      salary: job.salary_min ? `R$ ${job.salary_min.toLocaleString('pt-BR')}` : 'A combinar',
      technologies: job.description.match(/JavaScript|Python|Java|React/g) || [],
      platform: 'Adzuna',
      url: job.redirect_url,
      company: job.company.display_name
    }));
  } catch (error) {
    console.error('Adzuna Error:', error);
    return [];
  }
};