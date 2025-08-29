# Product Sense Simulator

An interactive experience that simulates real product decision-making under pressure. Users make choices about launching a feature with competing constraints around time, quality, user experience, and business impact.

## Features

- **5 Decision Points**: Realistic product scenarios with trade-offs
- **URL State Management**: Shareable results via URL parameters
- **Personalized Summary**: Strategy analysis based on choices
- **Accessibility First**: Keyboard navigation, screen reader support
- **Mobile Friendly**: Responsive design that works on all devices

## How It Works

1. **Choose Your Path**: Make decisions at each step with immediate feedback
2. **See Consequences**: Each choice shows immediate effects and rationale
3. **Get Your Strategy**: Receive a personalized analysis of your decision-making style
4. **Share Results**: Copy a link to share your strategy with others

## Strategy Types

- **Balanced Innovator**: Excels at finding sweet spots between priorities
- **User-First Champion**: Prioritizes user satisfaction and experience
- **Business Driver**: Focuses on business impact and ROI
- **Technical Steward**: Values long-term code quality and sustainability
- **Speed Demon**: Prioritizes speed and iteration
- **Pragmatic Leader**: Makes practical decisions based on context

## Technical Implementation

- Built with Next.js 14 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Client-side state management with URL parameters
- Accessible components with ARIA labels and keyboard navigation

## Usage

Visit `/play/simulator` to start the experience. The simulator takes about 90 seconds to complete and provides immediate feedback at each step.
