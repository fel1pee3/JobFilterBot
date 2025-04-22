import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  workMode: {
    type: String,
    enum: ['Remoto', 'Híbrido', 'Presencial'],
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'BRL'
    }
  },
  level: {
    type: String,
    enum: ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Líder'],
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  searchType: {
    type: String,
    enum: ['Frontend', 'Backend', 'Fullstack', 'Mobile', 'DevOps', 'Data', 'QA', 'UX/UI', 'Outros'],
    required: true
  },
  contract: {
    type: String,
    enum: ['CLT', 'PJ', 'Freelance', 'Temporário']
  },
  companySize: {
    type: String,
    enum: ['Startup', 'Média', 'Grande']
  },
  industry: String,
  experience: String
});

export default mongoose.model('Job', jobSchema);