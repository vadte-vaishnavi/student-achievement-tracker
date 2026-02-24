# Student Extracurricular Achievement Management System (SEAMS)

A modern, responsive React-based frontend platform for managing student extracurricular activities, achievements, events, and fest stall bookings. Built with React Router, Context API, and modern CSS3 with a vibrant purple gradient design theme.

## Features

### 🎓 Student Portal
- **Dashboard**: Welcome banner with personalized greeting, quick stats (activities joined, achievements earned, events registered, points earned), recent achievements showcase, and upcoming events preview
- **Activities**: Browse 15+ activities across categories (Cultural, Sports, NCC, Fest), filter by category, activity descriptions with registration buttons
- **Achievements**: Track personal achievements with level badges (College/State/National), points display, search by achievement name, filter by level, summary statistics
- **Events**: View upcoming college events with date, location, time, capacity, and registration functionality
- **Fest Stalls**: Browse and book fest stalls with size options, pricing, real-time availability tracking

### 👨‍💼 Admin Dashboard
- **Stats Overview**: Total students, activities, achievements, and events management
- **Management Tools**: Quick access to manage students, activities, achievements, events, generate reports, and system settings
- **Student Management**: View recent student registrations with action buttons (view/edit/delete)

### 🔐 Authentication
- **College ID Login**: Authenticate using college ID + password
- **Role-Based Access Control**: Separate student and admin dashboards
- **Session Persistence**: User session persists via localStorage
- **Demo Credentials**:
  - Student: CSE001 / student123
  - Admin: ADMIN001 / admin123

### 🎨 Design & UX
- **Modern UI**: Gradient theme (#667eea → #764ba2 with secondary accents)
- **Responsive Design**: Fully responsive across desktop (1440px+), tablet (768px-1024px), and mobile (<768px)
- **Smooth Animations**: Hover effects, card animations, page transitions
- **Accessibility**: High contrast colors, readable typography, intuitive navigation
- **Mobile-Optimized**: Hamburger menu sidebar, touch-friendly buttons, optimized layouts

## Project Structure

```
src/
├── components/
│   └── common/
│       ├── Sidebar.jsx          # Navigation sidebar with role-based menu
│       ├── Sidebar.css          # Sidebar styling and animations
│       ├── StatsCard.jsx        # Reusable stats display component
│       ├── StatsCard.css        # Stats card styling
│       ├── ActivityCard.jsx     # Activity card component
│       └── ActivityCard.css     # Activity card styling
├── context/
│   └── AuthContext.jsx          # Global authentication state management
├── pages/
│   ├── StudentDashboard.jsx     # Main student landing page
│   ├── StudentDashboard.css
│   ├── Activities.jsx           # Activity browsing and filtering
│   ├── Activities.css
│   ├── Achievements.jsx         # Achievement tracking with table
│   ├── Achievements.css
│   ├── Events.jsx              # Event registration page
│   ├── Events.css
│   ├── FestStalls.jsx          # Stall booking interface
│   ├── FestStalls.css
│   ├── AdminDashboard.jsx      # Admin control panel
│   └── AdminDashboard.css
├── data/
│   └── sampleData.js           # Dummy data for all features
├── assets/                     # Icons and images
├── styles/                     # Global styles
├── App.jsx                     # Main router with protected routes
├── App.css                     # App-level CSS
├── Login.jsx                   # College ID login interface
├── Login.css                   # Login styling
├── DashboardLayout.jsx         # Layout wrapper for authenticated pages
├── DashboardLayout.css
├── main.jsx                    # Application entry point
└── index.css                   # Global CSS variables and defaults
```

## Installation & Setup

1. **Clone and Install**:
   ```bash
   cd student-achievements
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5173`

3. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

## Usage

### Login Flow
1. Visit the application home page
2. Select your role (Student or Admin)
3. Enter college ID and password
4. Use demo credentials if available (shown on login form)
5. Access your dashboard after authentication

### Student Dashboard
- View personalized welcome message with your name and branch
- Check quick statistics on activities, achievements, events, and points
- Browse recent achievements with level badges
- See upcoming events with dates and locations
- Quick action cards for common tasks

### Activities Page
- Filter activities by category (Cultural, Sports, NCC, Fest)
- View 15+ available activities
- Click "Register" to join activities
- View activity descriptions and requirements

### Achievements Page
- Search achievements by name
- Filter by achievement level (College, State, National)
- View 6 achievements in table format
- See achievement icons, descriptions, and points earned
- Summary cards showing total achievements, points, and levels

### Events Page
- Browse upcoming college events
- View event details (date, time, location, capacity)
- Track registrations and capacity
- Click "Register" to join events

### Fest Stalls
- Browse available stalls
- View stall details (size, price, availability)
- Check real-time availability status
- Book stalls with one click

### Admin Dashboard
- View system-wide statistics
- Access management tools for all entities
- Quick statistics on students and activities
- View recent student registrations

## Color Scheme & Design

- **Primary Gradient**: #667eea to #764ba2 (Purple)
- **Secondary Colors**: 
  - Pink: #ff6b9d
  - Orange: #ffa500
  - Blue: #4ecdc4
  - Green: #2ecc71
- **Text Colors**: Dark gray (#333), Light gray (#666)
- **Backgrounds**: White, light gray (#f5f5f5)

## Technologies Used

- **React 18**: Modern functional components with hooks
- **React Router v6**: Client-side routing and navigation
- **Context API**: Global state management for authentication
- **CSS3**: Pure CSS with Flexbox, CSS Grid, animations
- **LocalStorage**: Session persistence
- **Vite**: Fast build tool and dev server

## Sample Data Features

The application includes 400+ lines of comprehensive sample data:
- **2 Student Users**: CSE001 (Rahul Kumar), ISE002 (Priya Sharma)
- **1 Admin User**: ADMIN001 (System Admin)
- **15 Activities**: Across 4 categories (Cultural: 4, Sports: 4, NCC: 4, Fest: 3)
- **6 Achievements**: From College, State, and National levels
- **4 Events**: Upcoming college events with dates and capacities
- **5 Fest Stalls**: Various sizes and price points for booking
- **Complete Dashboard Stats**: Activity counts, achievement points, event capacities

## Responsive Design Breakpoints

- **Desktop**: 1024px and above (full sidebar, expanded layouts)
- **Tablet**: 768px - 1023px (adjusted sidebar, optimized grids)
- **Mobile**: Below 768px (hamburger menu, single-column layouts, touch-optimized)

## Component Reusability

### StatsCard Component
Displays statistics with icon, label, value, and optional trend indicator.
```jsx
<StatsCard icon="📚" label="Activities Joined" value="8" />
```

### ActivityCard Component
Shows activity details with color-coding, buttons, and hover animations.
```jsx
<ActivityCard activity={activity} onRegister={handleRegister} />
```

## Authentication Implementation

The authentication system uses college ID validation against sample data:

1. **Login Form**: Collects college ID and password
2. **Validation**: Checks credentials against sampleData users
3. **Token Storage**: User info stored in localStorage
4. **Protected Routes**: All authenticated pages require valid session
5. **Role-Based Access**: Admin and student pages separated by role
6. **Auto Redirect**: Logged-in users redirected to dashboard, guests to login

## Customization Guide

### Adding New Activities
Edit `src/data/sampleData.js` and add to `activitiesData` array:
```javascript
{
  id: 16,
  name: "Your Activity",
  description: "Description here",
  category: "Cultural", // or Sports, NCC, Fest
  icon: "🎭",
  registered: false
}
```

### Changing Color Theme
Update CSS variables in `src/index.css` and modify gradient colors in component CSS files:
- Primary gradient colors in `.gradient-bg` classes
- Hover state colors in `:hover` selectors
- Card background gradients in component styles

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `App.jsx`
3. Import and add to AppRoutes component
4. Add sidebar menu item in `Sidebar.jsx`

## Features Highlights

✨ **No Backend Required**: All data is dummy/sample data stored locally
🎨 **Beautiful UI**: Modern gradient design with smooth animations
📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
🔒 **Secure Authentication**: College ID-based login with role separation
⚡ **Fast Performance**: Vite-powered development and production builds
🎭 **Rich Interactions**: Hover effects, smooth transitions, intuitive UX
📊 **Data-Rich**: Comprehensive sample data for realistic demonstration

## Future Enhancements

- Backend API integration (Node.js/Express)
- Database implementation (MongoDB/PostgreSQL)
- Real user registration and profile management
- Email notifications for events
- Achievement badges and certificates
- Admin analytics and reports
- Real stall booking with payment integration
- Student achievements feed/social features
- Performance tracking and analytics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Developer Notes

This is a college-level academic project showcasing modern React development practices including:
- Component-based architecture with reusability
- Responsive design with mobile-first approach
- State management with Context API
- Client-side routing with React Router
- Pure CSS3 styling with modern features
- Sample data integration for testing

The application is production-ready for demonstration purposes and can be extended with backend services as needed.
