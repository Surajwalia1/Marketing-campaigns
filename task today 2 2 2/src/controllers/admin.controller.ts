// src/controllers/admin.controller.ts
import { Request, Response } from 'express';
import AdminModel from '../models/admin.model';


const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // For simplicity, we'll hardcode the admin credentials here.
  // In production, you should hash and compare passwords securely.
  const predefinedUsername = "admin";
  const predefinedPassword = "admin123";

  if (username === predefinedUsername && password === predefinedPassword) {
     res.status(200).json({ message: "Login successful" });
     return;
    
  } else {
     res.status(401).json({ message: "Invalid credentials" });
     return;
  }
};


import Profile from '../models/profile.model'; // Assuming you have the Profile model

// Admin creates a new profile
export const createProfile = async (req: Request, res: Response) => {
  const { email, category } = req.body;

  // Check if the profile already exists
  const existingProfile = await Profile.findOne({ email });
  if (existingProfile) {
     res.status(400).json({ message: 'Profile with this email already exists.' });
     return;
  }

  // Create a new profile
  const newProfile = new Profile({ email, category });

  try {
    await newProfile.save();
    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error });
  }
};

// Admin can block a profile
export const blockProfile = async (req: Request, res: Response) => {
   const { email } = req.body;
 
   // Find the profile by email
   const profile = await Profile.findOne({ email });
 
   if (!profile) {
      res.status(404).json({ message: 'Profile not found.' });
      return
   }
 
   // Block the profile
   profile.blocked = true;
 
   try {
     await profile.save();
     res.status(200).json({ message: 'Profile blocked successfully', profile });
   } catch (error) {
     res.status(500).json({ message: 'Error blocking profile', error });
   }
 };
 
 // Admin can unblock a profile
 export const unblockProfile = async (req: Request, res: Response) => {
   const { email } = req.body;
 
   // Find the profile by email
   const profile = await Profile.findOne({ email });
 
   if (!profile) {
      res.status(404).json({ message: 'Profile not found.' });
      return;
   }
 
   // Unblock the profile
   profile.blocked = false;
 
   try {
     await profile.save();
     res.status(200).json({ message: 'Profile unblocked successfully', profile });
   } catch (error) {
     res.status(500).json({ message: 'Error unblocking profile', error });
   }
 };


export { adminLogin };
