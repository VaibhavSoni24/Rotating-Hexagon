# Bouncing Ball in Rotating Hexagon

An interactive browser-based animation of a ball bouncing inside a rotating hexagon, simulated with realistic physics.

## Demo

Open `index.html` in any modern web browser — no build step or server required.

## Features

- **Rotating hexagon** rendered on an HTML5 `<canvas>`
- **Physics simulation** including gravity, friction, and elastic collisions
- **Interactive controls**
  - **Start / Pause** button to toggle the animation
  - **Rotation Speed** slider — adjust how fast the hexagon spins
  - **Gravity** slider — adjust the gravitational pull on the ball

## Project Structure

```
Rotating-Hexagon/
├── index.html   # Page layout and canvas element
├── style.css    # Styling for the canvas and controls
└── script.js    # Animation loop and physics logic
```

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari).
3. Click **Start/Pause** to begin the animation.
4. Use the sliders to experiment with rotation speed and gravity.

## How It Works

- The hexagon vertices are recalculated each frame based on the current rotation angle.
- Gravity is applied to the ball's vertical velocity every frame.
- A friction coefficient slightly dampens velocity each frame to simulate air resistance.
- Collision detection projects the ball's position onto each hexagon edge; when the ball overlaps an edge the velocity is reflected across the edge normal and scaled by the elasticity coefficient.

## Physics Parameters

| Parameter   | Default | Range   | Description                                      |
|-------------|---------|---------|--------------------------------------------------|
| Rotation speed | 0.5  | 0 – 2   | Degrees per frame (scaled) the hexagon rotates  |
| Gravity     | 0.3     | 0 – 1   | Downward acceleration added to the ball per frame |
| Friction    | 0.98    | —       | Velocity multiplier applied every frame (constant) |
| Elasticity  | 0.7     | —       | Energy retained after each wall collision (constant) |

## Technologies Used

- HTML5 Canvas API
- Vanilla JavaScript (ES6+)
- CSS3

## License

This project is open source. Feel free to use and modify it.
