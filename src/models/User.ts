import mongoose, { Document, Schema } from 'mongoose';

// Extend IUser interface to include category
interface IUser extends Document {
  email: string;
  password: string;
  role: string; // 'admin' or 'user'
  category: string; // Category for targeted campaigns
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  category: { type: String }, // Make category optional
});


const User = mongoose.model<IUser>('User', userSchema);

export default User;
