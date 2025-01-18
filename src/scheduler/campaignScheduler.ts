import cron from 'node-cron';
import CampaignModel from '../models/campaign';
import { sendEmail } from '../services/emailService';
import UserModel from '../models/User'; // Ensure User model is correctly imported

// Schedule function
const scheduleCampaigns = () => {
  cron.schedule('* * * * *', async () => { // Runs every minute, adjust as needed
    try {
      const now = new Date();

      // Fetch campaigns that are due to be executed
      const dueCampaigns = await CampaignModel.find({
        scheduledTime: { $lte: now },
        status: 'pending'
      });

      for (const campaign of dueCampaigns) {
        // Ensure campaign.category is not undefined or null
        if (!campaign.category) {
          console.warn(`Campaign ${campaign._id} does not have a category, skipping.`);
          continue; // Skip this campaign if no category
        }

        // Find users in the campaign's category
        const users = await UserModel.find({ category: campaign.category });

        if (users.length) {
          for (const user of users) {
            // Send email to each user
            await sendEmail(user.email, 'Campaign Execution', '');
          }
        }

        // Mark campaign as executed
        campaign.status = 'executed';
        await campaign.save();
      }

    } catch (error) {
      console.error('Error executing scheduled campaigns:', error);
    }
  });
};

export default scheduleCampaigns;
