import { Schema, model, Document } from 'mongoose';

interface IProfile extends Document {
  email: string;
  category: string;
  blocked: boolean; // Status of profile (blocked or not)
}

const profileSchema = new Schema<IProfile>({
  email: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  blocked: { type: Boolean, default: false }, // Adding the blocked field
});

const Profile = model<IProfile>('Profile', profileSchema);

export default Profile;
