# EstateVR - Virtual Real Estate Property Tours

A fully interactive virtual real estate platform with 360° VR tours, live agent chat, and property management dashboard.

## Features

- **360° VR Tours** - Immersive panoramic room exploration using Three.js
- **Room Navigation** - Click hotspots to move between rooms
- **Live Agent Chat** - Real-time chat with property specialists during tours
- **Property Catalog** - Browse and filter listings by type
- **Agent Dashboard** - Upload tours, manage listings, view analytics
- **VR Mode** - Device orientation support for mobile VR experience
- **Responsive Design** - Works on desktop, tablet, and mobile

## Quick Start

### Option 1: Open Directly
Simply double-click `index.html` to open in your browser.

### Option 2: Local Server (Recommended)
For the best experience (especially for loading images), run a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
virtual-real-estate-tours/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── app.js          # Application logic & Three.js VR viewer
└── images/             # (Optional) Add your own 360° panoramas here
```

## How to Use

### As a Buyer
1. Browse properties on the home page
2. Click "Take VR Tour" on any property with the VR badge
3. Drag to look around the 360° environment
4. Click glowing hotspots to navigate between rooms
5. Use "Chat with Agent" to ask questions live
6. Click "Schedule Visit" to book a showing

### As an Agent
1. Click "Agent Dashboard" in the navigation
2. View analytics, manage listings, or upload new tours
3. Use the upload form to add 360° panoramas
4. Monitor visitor engagement and tour completion rates

## Adding Real 360° Panoramas

Replace the Unsplash URLs in `js/app.js` with your own equirectangular images:

```javascript
rooms: [
    { name: "Living Room", image: "images/living-room-360.jpg" },
    { name: "Kitchen", image: "images/kitchen-360.jpg" }
]
```

For best results, use images with a 2:1 aspect ratio (equirectangular projection).

## Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android)

## Technologies Used

- **Three.js** - 3D rendering and 360° panorama viewer
- **Vanilla JavaScript** - No frameworks required
- **CSS Grid & Flexbox** - Modern responsive layout
- **Unsplash API** - Sample property images

## License

MIT License - Free for personal and commercial use.
