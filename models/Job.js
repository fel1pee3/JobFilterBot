import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  workMode: { type: String, enum: ['Remoto', 'Híbrido', 'Presencial'] },
  salary: { min: Number, max: Number },
  level: { type: String, enum: ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Líder'] },
  technologies: [String],
  postedAt: { type: Date, default: Date.now },
  url: String,
  contract: { type: String, enum: ['CLT', 'PJ', 'Freelance', 'Temporário'] },
  companySize: { type: String, enum: ['Startup', 'Média', 'Grande'] },
  experience: String
});

export default mongoose.model('Job', jobSchema);