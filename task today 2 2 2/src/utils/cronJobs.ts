import cron from 'node-cron';
import { sendEmailCampaign } from '../services/email.service';
import Campaign from '../models/campaign.model';

// Function to schedule a campaign
export const scheduleCampaign = (campaign: any) => {
  // Parse the scheduledAt field into a cron time expression (for simplicity, assume it's in a specific format)
  const cronTime = `${campaign.scheduledAt.getMinutes()} ${campaign.scheduledAt.getHours()} ${campaign.scheduledAt.getDate()} ${campaign.scheduledAt.getMonth() + 1} *`;

  cron.schedule(cronTime, async () => {
    console.log(`Sending scheduled campaign: ${campaign.name}`);
    await sendEmailCampaign(campaign);  // Send the email when the cron time is reached
  });
};
