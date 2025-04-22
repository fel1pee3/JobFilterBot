export const formatJobMessage = (job) => {
  return `
*${job.title}* ${job.company ? `- ${job.company}` : ''}
📝 *Descrição:* ${job.description}
💰 *Salário:* ${job.salary}
🛠 *Tecnologias:* ${job.technologies.join(', ') || 'Não especificado'}
🌐 *Plataforma:* ${job.platform}

🔗 [Candidatar-se aqui](${job.url})
  `;
};