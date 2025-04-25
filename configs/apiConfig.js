export const API_CONFIG = {
    // Indeed
    INDEED: {
      BASE_URL: 'https://api.indeed.com/ads/apisearch',
      DEFAULT_PARAMS: {
        publisher: process.env.INDEED_API_KEY,
        v: '2',
        format: 'json',
        limit: 10
      }
    },
  
    // Adzuna
    ADZUNA: {
      BASE_URL: 'https://api.adzuna.com/v1/api/jobs/br',
      DEFAULT_PARAMS: {
        app_id: process.env.ADZUNA_APP_ID,
        app_key: process.env.ADZUNA_APP_KEY,
        results_per_page: 10
      }
    },
  
    // JSearch (RapidAPI)
    JSEARCH: {
      BASE_URL: 'https://jsearch.p.rapidapi.com/search',
      HEADERS: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    }
  };