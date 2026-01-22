# Admin Setup Guide

## Creating Admin User

To create an admin user account, you have two options:

### Option 1: Using the API Endpoint (Recommended)

Call the admin creation endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/create-admin
```

This will create an admin user with:
- **Email**: admin@moortinyhouse.com
- **Password**: admin123456

### Option 2: Direct Database Setup (If you have Supabase access)

1. Go to your Supabase Dashboard
2. Create a new auth user in the Authentication section
3. The admin_users table will be populated automatically via database triggers

## Logging In

1. Navigate to `/auth/login`
2. Enter your admin credentials:
   - Email: `admin@moortinyhouse.com`
   - Password: `admin123456`
3. You'll be redirected to the admin dashboard

## Admin Dashboard Features

Once logged in, you can access:

- **Dashboard Overview**: View key metrics and recent activity
- **Contact Messages**: Manage visitor inquiries
- **Models Management**: Create and edit tiny house models
- **Testimonials**: Review and approve customer testimonials
- **Portfolio**: View completed projects
- **Analytics**: Track website traffic and page views
- **Settings**: Configure site-wide settings

## Changing Your Password

From the admin dashboard, go to Settings and update your password.

## Database Tables

The admin system uses the following Supabase tables:

- `admin_users` - Admin account information
- `site_analytics` - Page views and traffic tracking
- `contact_messages` - Contact form submissions
- `site_settings` - Global site configuration
- `tiny_house_models` - Product listings
- `portfolio_projects` - Project showcase
- `testimonials` - Customer reviews

All tables have Row Level Security (RLS) policies that restrict access to authenticated admin users only.
