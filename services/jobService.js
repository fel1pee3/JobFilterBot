import Job from '../models/Job.js';

export const loadSampleJobs = async () => {
  const sampleJobs = [
    {
      title: "Desenvolvedor Node.js Pleno",
      company: "Tech Corp",
      location: "São Paulo",
      workMode: "Remoto",
      salary: { min: 6000, max: 9000 },
      level: "Pleno",
      technologies: ["Node.js", "MongoDB"],
      contract: "CLT",
      companySize: "Média"
    },
    {
      title: "Front-end React Júnior",
      company: "StartupX",
      location: "Rio de Janeiro",
      workMode: "Híbrido",
      salary: { min: 3500 },
      level: "Júnior",
      technologies: ["React", "JavaScript"],
      contract: "PJ"
    }
  ];

  try {
    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);
    console.log("✅ Vagas de exemplo carregadas");
  } catch (error) {
    console.error("❌ Erro ao carregar vagas:", error);
  }
};