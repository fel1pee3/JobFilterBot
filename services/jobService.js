import Job from '../models/Job.js';
import axios from 'axios';

export const fetchAndSaveJobs = async () => {
  try {
    // Exemplo: Buscar vagas do GitHub Jobs
    const response = await axios.get('https://jobs.github.com/positions.json');
    const jobs = response.data;
    
    // Salvar no banco de dados
    await Job.insertMany(jobs.map(job => ({
      title: job.title,
      company: job.company,
      location: job.location,
      workMode: job.type.toLowerCase().includes('remote') ? 'Remoto' : 'Presencial',
      url: job.url,
      description: job.description,
      technologies: extractTechnologies(job.description),
      level: detectLevel(job.title, job.description),
      postedAt: new Date(job.created_at),
      source: 'GitHub Jobs'
    })));
    
    console.log(`✅ ${jobs.length} vagas salvas no banco de dados`);
  } catch (error) {
    console.error('❌ Erro ao buscar e salvar vagas:', error);
  }
};

function extractTechnologies(description) {
  // Implementação simplificada
  const techs = ['JavaScript', 'Python', 'Java', 'Node.js', 'React'];
  return techs.filter(tech => 
    description.toLowerCase().includes(tech.toLowerCase())
  );
}

function detectLevel(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('senior')) return 'Sênior';
  if (text.includes('pleno')) return 'Pleno';
  if (text.includes('junior')) return 'Júnior';
  return 'Pleno'; // Default
}