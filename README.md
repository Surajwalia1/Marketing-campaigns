# Marketing Campaign Automation System

This project is a **Marketing Campaign Automation System** designed to manage campaigns, schedule them, and send emails to targeted user categories. It uses **Node.js**, **Express**, **MongoDB**, and **JWT-based authentication** for secure access control. The system includes features like campaign creation, execution, and email notifications, along with a scheduler that automatically runs campaigns based on predefined time schedules.

---


## Overview

The Marketing Campaign Automation System allows admins to:

- Create and manage marketing campaigns.
- Schedule campaigns to run at specific times.
- Execute campaigns and send emails to users in specific categories.
- Track campaign statuses (pending, executed).
- Secure access to the system using JWT tokens with admin privileges.

---

## Features

- **User Authentication**: Users can sign up and log in securely using JWT-based authentication.
- **Campaign Management**: Admins can create, update, and delete campaigns, including scheduling the campaigns for execution.
- **Email Notifications**: The system sends emails to users based on their categories, notifying them of campaigns.
- **Scheduler**: A scheduler is used to run campaigns automatically based on a set time.
- **Admin Access**: Only users with the "admin" role have access to sensitive routes like creating and managing campaigns.

---

## Technologies Used

- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database to store user data, campaign details, and scheduling information.
- **JWT (JSON Web Tokens)**: Secure authentication and authorization.
- **Bcrypt.js**: Password hashing for secure user authentication.
- **Node-Cron**: Used for scheduling recurring tasks like campaign execution.
- **Nodemailer**: Sending emails to users based on campaign categories.

---

## Setup Instructions

To get this project up and running locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Surajwalia1/Marketing-campaigns.git
cd Marketing-campaigns

API Endpoints
Authentication
POST /api/auth/signup
Description: Register a new user.
Body: { "email": "user@example.com", "password": "your-password", "role": "user/admin" }
Response: { "message": "User created successfully" }
POST /api/auth/login
Description: Log in and receive a JWT token.
Body: { "email": "user@example.com", "password": "your-password" }
Response: { "token": "jwt-token" }
Campaign Management
POST /api/campaigns
Description: Create a new campaign.
Body: { "message": "Campaign message", "category": "user-category", "scheduledTime": "2025-01-01T00:00:00Z", "repeatPattern": "daily/weekly/monthly" }
Response: { "message": "Campaign created successfully", "campaign": { campaign-details } }
GET /api/campaigns
Description: Get all campaigns (admin only).
Response: { "campaigns": [campaign1, campaign2, ...] }
PUT /api/campaigns/:id
Description: Update an existing campaign.
Body: { "message": "Updated message", "category": "updated-category", "scheduledTime": "updated-time", "repeatPattern": "updated-pattern" }
Response: { "message": "Campaign updated successfully", "campaign": { updated-campaign-details } }
POST /api/campaigns/:id/execute
Description: Execute a campaign (send emails to users in the campaign's category).
Response: { "message": "Campaign executed and emails sent successfully", "campaign": { campaign-details } }
