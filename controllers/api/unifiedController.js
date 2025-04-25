import { fetchIndeedJobs } from '../../services/api/indeedService';
import { fetchAdzunaJobs } from '../../services/api/adzunaService';
import { fetchJSearchJobs } from '../../services/api/jsearchService';

export const searchAllJobs = async (filters) => {
  try {
    const [indeedJobs, adzunaJobs, jsearchJobs] = await Promise.all([
      fetchIndeedJobs(filters),
      fetchAdzunaJobs(filters),
      fetchJSearchJobs(filters)
    ]);

    // Combina e remove duplicados por URL
    const allJobs = [...indeedJobs, ...adzunaJobs, ...jsearchJobs];
    const uniqueJobs = allJobs.filter(
      (job, index, self) => index === self.findIndex(j => j.url === job.url)
    );

    return uniqueJobs;
  } catch (error) {
    console.error('Search Error:', error);
    return [];
  }
};