export const DEFAULT_FILTERS = {
  searchType: 'Todos',
  workMode: 'Todos',
  location: 'Todos',
  postDate: 'Todos',
  salary: 0,
  level: 'Todos',
  contract: 'Todos',
  languages: [],
  companySize: 'Todos',
  industry: 'Todos',
  experience: 'Todos'
};

export const VALID = {
  LEVELS: ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Líder', 'Todos'],
  WORKMODES: ['Remoto', 'Híbrido', 'Presencial', 'Todos'],
  CONTRACTS: ['CLT', 'PJ', 'Freelance', 'Temporário', 'Todos'],
  COMPANY_SIZES: ['Startup', 'Média', 'Grande', 'Todos'],
  EXPERIENCES: ['under_3', 'more_than_3', 'more_than_5'], // Padrão JSearch
  POSTDATES: ['24h', '7d', '30d', 'Todos'],
  SEARCH_TYPES: ['Frontend', 'Backend', 'Fullstack', 'Mobile', 'DevOps', 'Data', 'QA', 'UX/UI', 'Outros', 'Todos']
};