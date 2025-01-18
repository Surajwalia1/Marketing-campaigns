import express, { Request, Response } from 'express';
import { authenticateJWT, authorizeAdmin } from '../middleware/authMiddleware'; 
import CampaignModel from '../models/campaign'; 
import UserModel from '../models/User'; // Import User model correctly
import { sendEmail } from '../services/emailService'; 

const router = express.Router();

// Create a new campaign
router.post('/campaigns', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { message, category, scheduledTime, repeatPattern } = req.body;

  try {
    const newCampaign = new CampaignModel({
      message,
      category,
      scheduledTime,
      repeatPattern,
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(400).json({ error: 'Error creating campaign', details: error });
  }
});

// Get all campaigns (admin only)
router.get('/campaigns', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await CampaignModel.find();
    res.status(200).json({ campaigns });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching campaigns', details: error });
  }
});

// Update an existing campaign (admin only)
router.put('/campaigns/:id', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { message, category, scheduledTime, repeatPattern } = req.body;

  try {
    const updatedCampaign = await CampaignModel.findByIdAndUpdate(
      id,
      { message, category, scheduledTime, repeatPattern },
      { new: true }
    );

    if (!updatedCampaign) {
       res.status(404).json({ error: 'Campaign not found' });
       return;
    }

    res.status(200).json({ message: 'Campaign updated successfully', campaign: updatedCampaign });
  } catch (error) {
    res.status(400).json({ error: 'Error updating campaign', details: error });
  }
});

// Execute a campaign (send emails based on category)
router.post('/campaigns/:id/execute', authenticateJWT, authorizeAdmin, async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const campaign = await CampaignModel.findById(id);
  
      if (!campaign) {
         res.status(404).json({ error: 'Campaign not found' });
         return;
      }
  
      // Check if campaign.category is defined and valid
      if (!campaign.category) {
         res.status(400).json({ error: 'Campaign category is missing' });
         return;
      }
  
      // Ensure the category is a valid string before using it in the query
      const users = await UserModel.find({ category: campaign.category });
  
      if (!users.length) {
         res.status(404).json({ error: 'No users found for the campaign category' });
         return;
      }
  
      for (const user of users) {
        await sendEmail(user.email, 'Campaign Execution', ''); // Removed campaign.message
      }
  
      campaign.status = 'executed';
      await campaign.save();
  
      res.status(200).json({ message: 'Campaign executed and emails sent successfully', campaign });
    } catch (error) {
      res.status(500).json({ error: 'Error executing campaign', details: error });
    }
  });

export default router;
