# FOODprint in NYC - CDP Colloquium Presentation

## Project Structure

This is a clean, organized Reveal.js presentation about urban food systems and climate feedback loops in NYC.

### File Organization

```
├── index.html                    # Main presentation file
├── css/
│   └── presentation.css         # Custom styles with utility classes
├── js/
│   ├── presentation.js          # Reveal.js configuration
│   └── d3-visualization.js      # Modular D3.js interactive visualization
├── images/
│   └── reserch/                 # Research images and data visualizations
└── reveal.js/                   # Reveal.js framework files
```

### Key Features

#### Clean Architecture
- **Separated concerns**: D3 visualization extracted to its own module
- **CSS utility classes**: Replaced inline styles with reusable classes
- **Modular design**: Each component is self-contained and maintainable

#### Interactive Visualization
- **D3.js network diagram**: Climate-food feedback loop visualization
- **Drag interactions**: Nodes can be repositioned
- **Hover effects**: Visual feedback on interaction
- **Color-coded systems**: Climate (red), Food System (green), Feedback (orange), Bridge (gray)

#### Responsive Design
- **Flexible layouts**: Grid and flexbox-based responsive sections
- **Image optimization**: Consistent sizing and styling
- **Typography**: Clean, accessible font choices

### CSS Utility Classes

#### Layout Classes
- `.flex-container` - Horizontal flex layout with center alignment
- `.flex-column` - Vertical flex layout for full-height sections
- `.flex-content` - Content area that expands to fill space
- `.flex-image` - Image container (40% width)
- `.flex-image-45` - Image container (45% width)
- `.dual-grid` - Two-column grid layout

#### Component Classes
- `.climate-card` - Red-themed info card for climate content
- `.system-card` - Green-themed info card for food system content
- `.bridge-card` - Orange-themed info card for bridge connections
- `.info-card` - General info card with light green theme

#### Image Classes
- `.responsive-image` - Full-width responsive image with shadow
- `.responsive-image-60` - 60% width responsive image
- `.responsive-image-87` - 87% width responsive image

#### Color Classes
- `.green-text` - Primary green color (#296307)
- `.climate-color` - Climate red color (#e63946)
- `.system-color` - System green color (#296307)
- `.bridge-color` - Bridge orange color (#ff8500)

#### Spacing Classes
- `.mb-30`, `.mb-20`, `.mb-15` - Margin bottom utilities
- `.gap-40` - Grid/flex gap spacing

### D3 Visualization Configuration

The interactive network visualization is configurable through the `CONFIG` object in `d3-visualization.js`:

```javascript
const CONFIG = {
    width: 960,           // SVG width
    height: 600,          // SVG height
    nodeRadius: 12,       // Default node size
    hoverRadius: 15,      // Node size on hover
    linkDistance: 250,    // Force simulation link distance
    chargeStrength: -1000 // Node repulsion force
};
```

### Running the Presentation

1. Start a local server:
   ```bash
   python -m http.server 8000
   ```

2. Open in browser:
   ```
   http://localhost:8000
   ```

3. Navigate with arrow keys or click controls

### Development Notes

- **Reveal.js integration**: All custom styles maintain compatibility with Reveal.js
- **ES6 modules**: D3 visualization uses modern JavaScript module syntax
- **Accessibility**: Color choices maintain sufficient contrast ratios
- **Performance**: Images optimized for web delivery
- **Maintainability**: Clear separation of content, styling, and behavior

### Future Enhancements

- Add data loading from external sources for D3 visualization
- Implement slide transitions and animations
- Add interactive filtering for visualization nodes
- Include mobile-specific optimizations
