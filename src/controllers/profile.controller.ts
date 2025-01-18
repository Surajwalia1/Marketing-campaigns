import { Request, Response } from 'express';
import Profile from '../models/profile.model';

// Create a new profile
export const createProfile = async (req: Request, res: Response): Promise<void> => {
  const { email, category } = req.body;

  try {
    const newProfile = new Profile({ email, category });
    await newProfile.save();
     res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
     return;
  } catch (error) {
 res.status(500).json({ message: 'Error creating profile', error });
 return;
  }
};

// Get a profile by email
export const getProfileByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  try {
    const profile = await Profile.findOne({ email });
    if (!profile) {
       res.status(404).json({ message: 'Profile not found' });
       return;
    }
    
  } catch (error) {
     res.status(500).json({ message: 'Error fetching profile', error });
     return;
  }
};
