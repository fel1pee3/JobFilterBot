import mongoose from 'mongoose';
import dontenv from 'dotenv';   
dontenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado com sucesso');
  } catch (error) {
    console.error('❌ Erro na conexão com MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;