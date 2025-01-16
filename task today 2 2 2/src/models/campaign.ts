import mongoose, { Schema, Document } from 'mongoose';

interface Campaign extends Document {
  message: string;           // The content of the campaign
  category: string;          // User category (all, specific category)
  scheduledTime: Date;       // When the campaign should be sent
  repeatPattern?: string;    // Optional, for recurring campaigns
  status: string;            // Status (e.g., 'pending', 'executed', etc.)
}

const CampaignSchema = new Schema({
    message: String,
    category: String,
    scheduledTime: Date,
    repeatPattern: String,
    status: { type: String, default: 'pending' },
  });
  
  export const CampaignModel = mongoose.model('Campaign', CampaignSchema);

export default CampaignModel;
