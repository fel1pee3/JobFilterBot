export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  
  export const formatFilters = (filters) => {
    return `
  *Tipo de Vaga:* ${filters.searchType}
  *Modelo de Trabalho:* ${filters.workMode}
  *Localização:* ${filters.location}
  *Data de Postagem:* ${filters.postDate}
  *Salário Mínimo:* R$ ${filters.salary.toLocaleString('pt-BR')}
  *Nível:* ${filters.level}
  *Contrato:* ${filters.contract}
  *Tecnologias:* ${filters.languages.join(', ') || 'Nenhuma'}
  *Tamanho Empresa:* ${filters.companySize}
  *Setor:* ${filters.industry}
  *Experiência:* ${filters.experience}
    `;
  };
  
  export const formatJobMessage = (job) => {
    return `
  *${job.title}* - ${job.company}
  📍 *Local:* ${job.location} (${job.workMode})
  💰 *Salário:* ${job.salary?.min ? `R$ ${job.salary.min.toLocaleString('pt-BR')}${job.salary?.max ? ` - R$ ${job.salary.max.toLocaleString('pt-BR')}` : '+'}` : 'A combinar'}
  📌 *Nível:* ${job.level}
  🛠 *Tecnologias:* ${job.technologies?.join(', ') || 'Não especificado'}
  📅 *Postado em:* ${job.postedAt?.toLocaleDateString('pt-BR') || 'Data não disponível'}
  
  🔗 [Ver vaga](${job.url})
    `;
  };