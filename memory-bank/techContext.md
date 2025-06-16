# Technical Context

## Technologies Used
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animation**: Lottie

## Development Setup
- Node.js environment
- npm for package management
- Git for version control
- VS Code with recommended extensions

## Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "lucide-react": "^0.300.0",
    "lottie-react": "^2.0.0"
  }
}
```

## Technical Constraints
1. **Performance**
   - Optimize image loading
   - Minimize bundle size
   - Efficient state management

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoint consistency
   - Touch-friendly interactions

## Tool Usage Patterns
1. **Component Development**
   - Use shadcn components as base
   - Extend with custom functionality
   - Maintain consistent styling

2. **State Management**
   - React hooks for local state
   - Props for component communication
   - Context when needed

3. **Styling**
   - Tailwind utility classes
   - Consistent color scheme
   - Responsive design patterns 