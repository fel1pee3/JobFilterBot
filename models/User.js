import mongoose from 'mongoose';
import { DEFAULT_FILTERS, VALID } from '../configs/constants.js';

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  firstName: String,
  username: String,
  filters: {
    searchType: { type: String, default: DEFAULT_FILTERS.searchType },
    workMode: { type: String, enum: VALID.WORKMODES, default: DEFAULT_FILTERS.workMode },
    location: { type: String, default: DEFAULT_FILTERS.location },
    salary: { type: Number, default: DEFAULT_FILTERS.salary },
    contract: { type: String, enum: VALID.CONTRACTS, default: DEFAULT_FILTERS.contract },
    languages: { type: [String], default: DEFAULT_FILTERS.languages },
    experience: { type: String, enum: VALID.EXPERIENCES, default: DEFAULT_FILTERS.experience }
  },
  lastActivity: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('User', userSchema);