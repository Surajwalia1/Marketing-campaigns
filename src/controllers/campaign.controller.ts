import { Request, Response } from 'express';
import Campaign from '../models/campaign';
import { sendEmail } from '../services/emailService'; // For sending emails
import { scheduleCampaign } from '../utils/cronJobs'; // For scheduling campaigns
import moment from 'moment';  // Import moment.js
import { Document, Types } from 'mongoose';

// Create a new campaign
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  const { name, type, recipients, scheduledAt } = req.body;

  try {
    // If scheduledAt is provided, parse it to a valid Date object using moment
    const parsedDate = scheduledAt ? moment(scheduledAt, "YYYY-MM-DD h:mma").toDate() : null;

    // Create a new campaign in the database
    const newCampaign = new Campaign({ name, type, recipients, scheduledAt: parsedDate });
    await newCampaign.save();

    // Send the email campaign to all users if it's a broadcast
    if (type === 'broadcast') {
      sendEmailCampaign(newCampaign);
    }

    // If there is a scheduled time, use the cron job to schedule it
    if (parsedDate) {
      scheduleCampaign(newCampaign); // Utility function to schedule
    }

    // Respond with success
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error });
  }
};

// Get a campaign by ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }

    res.status(200).json({ campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error });
  }
};
function sendEmailCampaign(newCampaign: Document<unknown, {}, { status: string; message?: string | null | undefined; category?: string | null | undefined; scheduledTime?: NativeDate | null | undefined; repeatPattern?: string | null | undefined; }> & { status: string; message?: string | null | undefined; category?: string | null | undefined; scheduledTime?: NativeDate | null | undefined; repeatPattern?: string | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }) {
  throw new Error('Function not implemented.');
}

