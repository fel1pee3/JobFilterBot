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

export const formatJobMessage = (job) => `
*${job.title}* @ ${job.company}
--------------------------------
📍 *Local:* ${job.location} (${job.workMode})
💰 *Salário:* ${job.salary?.min ? `R$ ${job.salary.min.toLocaleString('pt-BR')}+` : 'A combinar'}
📌 *Nível:* ${job.level}
🛠 *Techs:* ${job.technologies.join(', ') || '-'}
📅 *Postado:* ${job.postedAt.toLocaleDateString('pt-BR')}
🔗 [Ver vaga](${job.url})
`;

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