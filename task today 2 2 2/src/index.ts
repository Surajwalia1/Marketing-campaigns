import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import campaignRoutes from './routes/campaignRoutes'; // Import campaign routes
import { authenticateJWT } from './middleware/authMiddleware'; // Import JWT authentication middleware
import scheduleCampaigns from './scheduler/campaignScheduler'; // Import campaign scheduler
import authRoutes from './routes/authRoutes'; // Import auth routes (for signup, login)
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

dotenv.config();

const app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse JSON request bodies
app.use(express.json());

// Register the routes for authentication (signup, login)
app.use('/api/auth', authRoutes);

// Uncomment this line if you want JWT to protect all routes
app.use(authenticateJWT); // This will apply to all routes below unless specified otherwise

// Register the routes for campaigns
app.use('/api', campaignRoutes);

// Health check route (Optional)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running smoothly' });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong', details: err.message });
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI as string) // Removed useNewUrlParser and useUnifiedTopology
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the campaign scheduler after MongoDB connection is established
    scheduleCampaigns();

    // Start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
