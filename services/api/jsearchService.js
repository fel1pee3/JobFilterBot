import axios from 'axios';
import { API_CONFIG } from '../../config/apiConfig';

export const fetchJSearchJobs = async (filters) => {
  try {
    const response = await axios.get(API_CONFIG.JSEARCH.BASE_URL, {
      params: {
        query: `${filters.languages.join(' ')} ${filters.location}`,
        page: 1,
        num_pages: 1
      },
      headers: API_CONFIG.JSEARCH.HEADERS
    });

    return response.data.data.map(job => ({
      title: job.job_title,
      description: job.job_description?.slice(0, 100) + '...',
      salary: job.job_min_salary ? `R$ ${job.job_min_salary}` : 'A combinar',
      technologies: job.job_required_skills || [],
      platform: job.employer_name || 'JSearch',
      url: job.job_apply_link,
      company: job.employer_name
    }));
  } catch (error) {
    console.error('JSearch Error:', error);
    return [];
  }
};