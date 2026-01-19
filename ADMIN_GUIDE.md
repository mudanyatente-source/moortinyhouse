# Moortinyhouse Admin Panel Guide

## Overview
Your tiny house website now has a comprehensive admin panel with full database integration, authentication, content management, and analytics tracking.

## Features Implemented

### 1. Database Schema
All tables are created in Supabase with Row Level Security (RLS) enabled:
- **admin_users** - Admin user accounts
- **site_settings** - Global site configuration
- **models** - Tiny house models with multilingual support
- **portfolio_projects** - Completed projects showcase
- **contact_messages** - Form submissions from visitors
- **testimonials** - Customer reviews and feedback
- **site_analytics** - Website traffic and page view tracking

### 2. Authentication System
- **Login Page**: `/auth/login`
- **Signup Page**: `/auth/signup`
- Email/password authentication with Supabase Auth
- Admin-only access with role checking
- Session management with automatic token refresh

### 3. Admin Dashboard (`/admin`)
Protected route that requires authentication. Includes:

#### Dashboard Overview
- Real-time statistics (total messages, weekly activity, active models, testimonials)
- Popular models by inquiry count with visual charts
- Recent contact messages feed
- Quick action buttons

#### Contact Messages Panel
- View all contact form submissions
- Filter by status (pending/responded/archived)
- Search functionality
- Detailed message view dialog
- Status management (mark as responded/archived)
- Delete messages
- Contact information display (email, phone)

#### Models Management Panel
- Add new tiny house models
- Edit existing models
- Toggle active/inactive status
- Featured model designation
- Multilingual content (Turkish/English)
- Image URL management
- Pricing, size, bedroom/bathroom counts
- Feature lists
- Display order customization

#### Testimonials Panel
- View all customer testimonials
- Approve/unapprove testimonials
- Delete testimonials
- Rating display
- Model association

#### Portfolio Panel
- View completed projects
- Featured project designation
- Client information
- Project details and images

#### Analytics Panel
- Total page views
- Unique visitors
- Bounce rate statistics
- Page-by-page analytics
- Date-based tracking

#### Settings Panel
- Company information (multilingual)
- Contact details (email, phone, address)
- Social media links (Instagram, Facebook, Twitter, LinkedIn)
- SEO settings (meta titles and descriptions)
- All changes save to database

### 4. Contact Form Integration
- Real-time form submission to database
- Inquiry type selection (tour, general, custom)
- Automatic status tracking
- Email and phone validation
- Success/error handling

### 5. Analytics Tracking
- Automatic page view tracking on all pages
- Daily aggregation by page path
- Visitor counting
- No cookies required (server-side tracking)

## Getting Started

### Initial Setup

1. **Create Your First Admin Account**
   - Visit `/auth/signup`
   - Enter your email and password (minimum 6 characters)
   - Check your email for confirmation link
   - Click the confirmation link
   - Go to `/auth/login` and sign in

2. **Access the Admin Panel**
   - Navigate to `/admin`
   - You'll be automatically redirected if not logged in

### Managing Content

#### Adding a Tiny House Model
1. Go to Admin → Models
2. Click "Add Model"
3. Fill in the form:
   - **Slug**: URL-friendly identifier (e.g., "aura-luxury-tiny-house")
   - **Name**: Model name in Turkish and English
   - **Tagline**: Short catchy phrase
   - **Description**: Full description in both languages
   - **Price**: In USD
   - **Size**: In square meters
   - **Bedrooms/Bathrooms**: Number counts
   - **Features**: One per line in textarea
   - **Main Image URL**: Path to image (e.g., "/images/model.jpg")
   - **Active**: Toggle visibility on website
   - **Featured**: Show in featured section
   - **Display Order**: Controls sort order
4. Click "Save"

#### Managing Contact Messages
1. Go to Admin → Contact Messages
2. Use the search bar to find specific messages
3. Filter by status (All/Pending/Responded/Archived)
4. Click "👁" icon to view full message details
5. Change status using dropdown menu
6. Delete unwanted messages (spam, etc.)

#### Approving Testimonials
1. Go to Admin → Testimonials
2. Review customer feedback
3. Click "Approve" to make visible on website
4. Click "Unapprove" to hide
5. Delete inappropriate testimonials

#### Updating Site Settings
1. Go to Admin → Settings
2. Update company information:
   - Name (Turkish/English)
   - Email
   - Phone
   - Address
3. Add social media URLs
4. Update SEO metadata
5. Click "Save Settings"

### Viewing Analytics
1. Go to Admin → Analytics
2. View aggregated statistics
3. See page-by-page breakdown
4. Monitor traffic trends

## Technical Details

### Database Integration
- Uses Supabase PostgreSQL database
- All data persists in real-time
- Row Level Security (RLS) protects data
- Only authenticated admins can modify content

### Authentication Flow
1. User signs up → Supabase creates auth user
2. Entry added to `admin_users` table
3. Login validates credentials
4. Session token stored in cookie
5. Middleware refreshes token automatically
6. Admin pages check for valid admin user

### Security Features
- Row Level Security (RLS) on all tables
- Server-side authentication checks
- Protected API routes
- CSRF protection via Supabase
- Secure session management

### API Endpoints

#### POST `/api/contact`
Handles contact form submissions
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested...",
  "inquiry_type": "tour",
  "preferred_date": "2024-01-15"
}
```

#### POST `/api/analytics`
Tracks page views
```json
{
  "path": "/models"
}
```

## Multilingual Support

The site supports Turkish and English:
- Database stores content in both languages
- Admin panel allows editing both versions
- Frontend displays based on user's language preference
- Language switcher in navigation

## Best Practices

### Content Management
- Always fill in both Turkish and English fields
- Use descriptive slugs for SEO
- Keep feature lists concise and scannable
- Update display order to control homepage appearance
- Mark test content as inactive rather than deleting

### Image Management
- Store images in `/public` folder
- Use descriptive filenames
- Optimize images before uploading
- Use consistent aspect ratios
- Reference with absolute paths (e.g., "/images/model.jpg")

### Contact Messages
- Respond to inquiries promptly
- Mark as "responded" after handling
- Use "archived" for completed conversations
- Export important leads to CRM

### Analytics
- Check weekly for traffic trends
- Monitor popular pages
- Identify high bounce rate pages for improvement
- Track inquiry sources

## Troubleshooting

### Can't Login
- Verify email is confirmed (check spam folder)
- Ensure account exists in `admin_users` table
- Try password reset (feature to be added)
- Check browser console for errors

### Content Not Appearing
- Verify item is marked as "active"
- Check display order
- Refresh the page (Cmd+R / Ctrl+R)
- Clear browser cache

### Form Submissions Not Saving
- Check browser console for errors
- Verify Supabase connection
- Check RLS policies are enabled
- Ensure API route is accessible

### Images Not Loading
- Verify image path is correct
- Check image exists in public folder
- Use absolute paths starting with "/"
- Check image file permissions

## Future Enhancements

Potential additions:
- Image upload directly from admin panel
- Bulk operations (delete multiple messages)
- Export data to CSV
- Email notifications for new inquiries
- Advanced analytics dashboard
- Password reset functionality
- Multi-admin user management
- Audit logs for changes

## Support

For technical issues:
1. Check browser console for errors
2. Verify Supabase connection in Vars panel
3. Check database tables have correct RLS policies
4. Review this documentation

## Environment Variables

Required environment variables (already configured):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Database connection strings (POSTGRES_*)

All variables are automatically configured through the Supabase integration.

---

**Remember**: Always test changes in the preview before deploying to production. Keep your admin credentials secure and don't share them publicly.
