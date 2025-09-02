# Mail Server Demo Documentation

## Overview
This is a retro-styled email client built with Next.js 15, Convex database, and Clerk authentication. The application demonstrates a full-stack mail server with real-time database operations.

## 🚀 Quick Start Demo

### 1. Start the Application
```bash
# Terminal 1: Start Next.js development server
npm run dev

# Terminal 2: Start Convex backend
npx convex dev
```

**Access Points:**
- Main Application: http://localhost:3000
- Database Seeder: http://localhost:3000/seed-data
- Database Test: http://localhost:3000/test-db
- Convex Dashboard: https://dashboard.convex.dev/d/local-DAS-owsetech_mailserver

### 2. Demo Flow

#### Step 1: Seed Test Data
1. Navigate to http://localhost:3000/seed-data
2. Click "Seed Test Data" button
3. Verify success message appears

#### Step 2: View Mail Interface
1. Go to http://localhost:3000
2. Observe the retro Windows-style interface
3. Navigate between folders: Inbox, Drafts, Sent Items, Deleted Items
4. Switch between tabs: Mail, General, View, Settings

#### Step 3: Test Database Functions
1. Visit http://localhost:3000/test-db
2. Verify environment variables are loaded
3. Check that users and mails queries return data

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15.5.2** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with retro theme
- **Clerk** - Authentication (configured but bypassed for demo)

### Backend Stack
- **Convex** - Real-time database and backend functions
- **Local Development** - Running on http://127.0.0.1:3210

### Database Schema
```typescript
// Mail Table
{
  from: string,           // sender email
  to: string,            // recipient email  
  subject: string,       // email subject
  body: string,          // email content
  date: string,          // ISO timestamp
  isDraft: boolean,      // draft status
  isDeleted: boolean,    // soft delete flag
  userId: string         // owner user ID
}

// Users Table  
{
  username: string,      // username part of email
  domain: string,        // domain part of email
  displayName: string,   // user's display name
  bio: string,          // user biography
  userId: string,       // unique user identifier
  email: string         // full email address
}
```

## 🔧 Available Functions

### Test Functions (No Auth Required)
```typescript
// List emails by folder
api.test.listMailsTest({ folder: "inbox" | "sent" | "drafts" | "deleted" })

// List all users
api.test.listUsersTest()

// Send test email
api.test.sendTestMail({ from, to, subject, body })

// Create test user
api.test.createTestUser({ username, domain, displayName })
```

### Production Functions (Auth Required)
```typescript
// Mail operations
api.mail.list({ folder })
api.mail.get({ id })
api.mail.send({ to, subject, body })
api.mail.deleteMail({ id })

// User operations
api.users.create({ username, domain, displayName, bio })
api.users.getByAddress({ username, domain })
api.users.list()
```

## 🎨 UI Features

### Retro Design Elements
- **Windows 95-style interface** with beveled borders
- **Tabbed navigation** (Mail, General, View, Settings)
- **Folder sidebar** with colored icons
- **Hover effects** and active states
- **Retro color scheme** (#e5e3db background, #3a6ea5 blue accents)

### Responsive Layout
- **Sidebar navigation** for mail folders
- **Main content area** with tabbed interface
- **Email list view** with sender, subject, and preview
- **Settings panels** for configuration options

## 🧪 Testing Scenarios

### Scenario 1: Basic Mail Flow
1. **Seed Data**: Create test users and emails
2. **View Inbox**: See received emails
3. **Switch Folders**: Navigate to Sent, Drafts, Deleted
4. **Email Details**: Click on email to view (if detail page exists)

### Scenario 2: Database Verification
1. **Check Convex Dashboard**: View raw database tables
2. **Test Queries**: Use test-db page to verify data retrieval
3. **Monitor Real-time**: Watch database updates in dashboard

### Scenario 3: UI Interaction
1. **Tab Navigation**: Switch between Mail, General, View, Settings
2. **Folder Selection**: Test inbox, sent, drafts, deleted folders
3. **Responsive Design**: Test on different screen sizes

## 📊 Demo Data

### Test Users Created
```javascript
{
  username: "john",
  domain: "example.com", 
  displayName: "John Doe"
}

{
  username: "jane",
  domain: "example.com",
  displayName: "Jane Smith"  
}
```

### Test Emails Created
1. **Welcome Email**: john@example.com → jane@example.com
2. **Reply Email**: jane@example.com → john@example.com  
3. **System Email**: system@example.com → john@example.com

## 🔍 Troubleshooting

### Common Issues
1. **Port Conflicts**: App uses ports 3000 (Next.js) and 3210 (Convex)
2. **Authentication Errors**: Test functions bypass auth, production functions require it
3. **Build Errors**: Ensure React Hooks are called at component top level

### Debug Commands
```bash
# Check running processes
netstat -ano | findstr :3000
netstat -ano | findstr :3210

# Kill processes if needed
taskkill /f /pid [PID]

# Clean build cache
Remove-Item -Recurse -Force .next
npm run build
```

## 🎯 Demo Talking Points

### Technical Highlights
- **Real-time Database**: Convex provides instant updates
- **Type Safety**: Full TypeScript integration
- **Modern Stack**: Next.js 15 with App Router
- **Retro UI**: Nostalgic Windows 95 design

### Business Value
- **Rapid Development**: Convex eliminates backend complexity
- **Scalable Architecture**: Serverless functions and real-time sync
- **User Experience**: Familiar email interface with modern performance
- **Developer Experience**: Hot reload, type safety, integrated tooling

## 📝 Next Steps

### Potential Enhancements
1. **Authentication**: Enable Clerk auth for multi-user support
2. **Real Email**: Integrate with SMTP for actual email sending
3. **Attachments**: Add file upload and attachment support
4. **Search**: Implement email search functionality
5. **Mobile**: Optimize for mobile devices

### Production Considerations
1. **Security**: Implement proper authentication and authorization
2. **Performance**: Add pagination for large email lists
3. **Monitoring**: Add error tracking and analytics
4. **Deployment**: Configure for production hosting

---

**Demo Duration**: 10-15 minutes  
**Audience**: Technical stakeholders, developers, product managers  
**Prerequisites**: Node.js, npm, modern web browser