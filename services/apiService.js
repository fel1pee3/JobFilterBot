import axios from 'axios';

const JSEARCH_ENDPOINT = 'https://jsearch.p.rapidapi.com/search';

const mapFiltersToAPI = (filters) => {
  const params = {
    query: `${filters.searchType} ${filters.languages.join(' ')}`,
    page: '1',
    num_pages: '1'
  };

  // Filtros condicionais
  if (filters.location !== 'Todos') params.location = filters.location;
  if (filters.workMode === 'Remoto') params.remote_jobs_only = 'true';
  if (filters.salary > 0) params.salary_min = filters.salary;
  if (filters.contract !== 'Todos') params.employment_types = filters.contract;
  if (filters.experience !== 'Todos') params.job_requirements = filters.experience;

  return params;
};

export const fetchJobsFromAPI = async (filters) => {
  try {
    const response = await axios.get(JSEARCH_ENDPOINT, {
      params: mapFiltersToAPI(filters),
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Erro na JSearch:', error.response?.data || error.message);
    return [];
  }
};