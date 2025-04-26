export const capitalize = (str) => 
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

export const formatFilters = (filters) => `
⚙️ *FILTROS ATIVOS*
--------------------------------
🔍 Tipo: ${filters.searchType}
🏠 Modelo: ${filters.workMode}
📍 Local: ${filters.location}
📅 Postagem: ${filters.postDate}
💰 Salário: R$ ${filters.salary.toLocaleString('pt-BR')}
📌 Nível: ${filters.level}
📝 Contrato: ${filters.contract}
🛠 Techs: ${filters.languages.join(', ') || 'Nenhuma'}
🏢 Empresa: ${filters.companySize}
📈 Setor: ${filters.industry}
🎯 Experiência: ${filters.experience}
`;

export const formatJobMessage = (job) => {
  // Dados principais
  const mainDetails = [
    `*${job.job_title}* - ${job.employer_name}`,
    `📍 *Localização:* ${job.job_city || 'Remoto'} (${job.job_country})`,
    `🏠 *Modelo:* ${job.job_is_remote ? 'Remoto' : 'Presencial'}`,
    job.job_posted_at_timestamp && 
      `📆 *Postado há:* ${Math.floor((Date.now() - job.job_posted_at_timestamp * 1000) / 86400000)} dias`,
  ];

  // Salário e Benefícios
  const salarySection = job.job_min_salary ? [
    `💰 *Salário:* ${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_currency || 'USD'}`,
    job.job_salary_period && `🔄 *Período:* ${job.job_salary_period}`
  ] : ['💰 *Salário:* A combinar'];

  // Detalhes Técnicos (Extrai do JSON completo)
  const techDetails = [
    job.job_required_skills && `🛠 *Tecnologias:* ${job.job_required_skills.slice(0, 5).join(', ')}`,
    job.job_required_experience && `📌 *Experiência:* ${job.job_required_experience}`,
    job.job_employment_type && `📝 *Contrato:* ${job.job_employment_type}`
  ];

  // Link e Detalhes Adicionais
  const footer = [
    job.job_apply_link && `🔗 [Candidatar-se](${job.job_apply_link})`,
    job.job_publisher && `📰 *Fonte:* ${job.job_publisher}`
  ];

  return [
    ...mainDetails.filter(Boolean),
    ...salarySection,
    ...techDetails.filter(Boolean),
    ...footer.filter(Boolean)
  ].join('\n');
};

export const extractTechnologies = (text) => {
  const techList = ['JavaScript', 'Python', 'React', 'Node.js', 'Java'];
  return techList.filter(tech => 
    new RegExp(`\\b${tech}\\b`, 'i').test(text)
  );
};

export const detectLevel = (text) => {
  const lowerText = text.toLowerCase();
  if (/sênior|senior|sr/gi.test(lowerText)) return 'Sênior';
  if (/pleno|mid/gi.test(lowerText)) return 'Pleno'; 
  if (/júnior|junior|jr/gi.test(lowerText)) return 'Júnior';
  return 'Não especificado';
};