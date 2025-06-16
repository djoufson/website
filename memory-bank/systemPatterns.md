# System Patterns

## Architecture
- Next.js App Router for routing and page structure
- Component-based architecture using React
- Client-side state management with React hooks
- Server-side rendering for better performance

## Design Patterns
1. **Component Composition**
   - Reusable UI components from shadcn
   - Custom components for specific features
   - Layout components for page structure

2. **Data Flow**
   - Static data for projects and content
   - TypeScript interfaces for type safety
   - Props for component communication

3. **UI Patterns**
   - Dialog for detailed project views
   - Responsive grid/list layouts
   - Badge system for status and tags
   - Icon system using Lucide React

## Component Structure
```
components/
├── ui/                 # Reusable UI components
│   ├── badge.tsx
│   ├── dialog.tsx
│   └── ...
├── Projects.tsx       # Project list and details
├── ProjectsAnimation.tsx
└── navbar.tsx
```

## Key Implementation Paths
1. **Project Display**
   - List view for project overview
   - Dialog for detailed information
   - Responsive layout adaptation
   - Image handling with placeholders

2. **Navigation**
   - Responsive navbar
   - Active page indication
   - Coming soon indicators

3. **Content Organization**
   - Project categorization
   - Detailed project information
   - Metrics and statistics display 