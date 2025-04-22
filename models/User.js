import mongoose from 'mongoose';
import { DEFAULT_FILTERS } from '../configs/constants.js';

const userSchema = new mongoose.Schema({
  telegramId: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  firstName: String,
  lastName: String,
  username: String,
  filters: {
    searchType: { 
      type: String, 
      enum: ['Frontend', 'Backend', 'Fullstack', 'Mobile', 'DevOps', 'Data', 'QA', 'UX/UI', 'Outros', 'Todos'],
      default: DEFAULT_FILTERS.searchType
    },
    workMode: { 
      type: String, 
      enum: ['Remoto', 'Híbrido', 'Presencial', 'Todos'],
      default: DEFAULT_FILTERS.workMode
    },
    location: { 
      type: String, 
      default: DEFAULT_FILTERS.location
    },
    postDate: { 
      type: String, 
      enum: ['24h', '7d', '30d', 'Todos'],
      default: DEFAULT_FILTERS.postDate
    },
    salary: { 
      type: Number, 
      default: DEFAULT_FILTERS.salary
    },
    level: { 
      type: String, 
      enum: ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Líder', 'Todos'],
      default: DEFAULT_FILTERS.level
    },
    contract: { 
      type: String, 
      enum: ['CLT', 'PJ', 'Freelance', 'Temporário', 'Todos'],
      default: DEFAULT_FILTERS.contract
    },
    languages: { 
      type: [String], 
      default: DEFAULT_FILTERS.languages
    },
    companySize: { 
      type: String, 
      enum: ['Startup', 'Média', 'Grande', 'Todos'],
      default: DEFAULT_FILTERS.companySize
    },
    industry: { 
      type: String, 
      default: DEFAULT_FILTERS.industry
    },
    experience: { 
      type: String, 
      enum: ['0-1', '1-3', '3-5', '5+', 'Todos'],
      default: DEFAULT_FILTERS.experience
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastActivity: { 
    type: Date, 
    default: Date.now 
  }
});

userSchema.pre('save', function(next) {
  this.lastActivity = new Date();
  next();
});

export default mongoose.model('User', userSchema);   