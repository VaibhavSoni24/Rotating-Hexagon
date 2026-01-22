// Canvas setup
const canvas = document.getElementById('hexagonCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const WIDTH = 600;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Center point
const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;

// Hexagon properties
const hexagonRadius = 240;
const hexagonVertices = 6;
let rotation = 0;
let rotationSpeed = 0.5;

// Ball properties
const ballRadius = 15;
const ball = {
    x: centerX,
    y: centerY - 100,
    vx: 1,
    vy: 0,
    radius: ballRadius,
    color: '#ff4757'
};

// Physics parameters
let gravity = 0.3;
const friction = 0.98;
const elasticity = 0.7;

// Animation state
let animationId;
let isPaused = true;

// Control elements
const startBtn = document.getElementById('startBtn');
const rotationSpeedSlider = document.getElementById('rotationSpeed');
const gravitySlider = document.getElementById('gravity');

// Event listeners
startBtn.addEventListener('click', toggleAnimation);
rotationSpeedSlider.addEventListener('input', (e) => {
    rotationSpeed = parseFloat(e.target.value);
});
gravitySlider.addEventListener('input', (e) => {
    gravity = parseFloat(e.target.value);
});

// Function to calculate hexagon vertices
function calculateHexagonVertices(rotation) {
    const vertices = [];
    for (let i = 0; i < hexagonVertices; i++) {
        const angle = (Math.PI / 3) * i + rotation;
        vertices.push({
            x: centerX + hexagonRadius * Math.cos(angle),
            y: centerY + hexagonRadius * Math.sin(angle)
        });
    }
    return vertices;
}

// Function to draw hexagon
function drawHexagon(vertices) {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    
    for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    
    ctx.closePath();
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Function to draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

// Function to check collision between ball and line
function checkLineCollision(x1, y1, x2, y2) {
    // Vector from line start to ball center
    const v1x = ball.x - x1;
    const v1y = ball.y - y1;
    
    // Vector representing the line
    const v2x = x2 - x1;
    const v2y = y2 - y1;
    
    // Length of the line
    const lineLength = Math.sqrt(v2x * v2x + v2y * v2y);
    
    // Normalize line vector
    const v2xUnit = v2x / lineLength;
    const v2yUnit = v2y / lineLength;
    
    // Calculate projection of ball center onto the line
    const projection = v1x * v2xUnit + v1y * v2yUnit;
    
    // Calculate the closest point on the line to the ball center
    let closestX, closestY;
    
    // Check if projection is beyond the line segment
    if (projection < 0) {
        closestX = x1;
        closestY = y1;
    } else if (projection > lineLength) {
        closestX = x2;
        closestY = y2;
    } else {
        closestX = x1 + v2xUnit * projection;
        closestY = y1 + v2yUnit * projection;
    }
    
    // Calculate distance from closest point to ball center
    const distance = Math.sqrt(
        (ball.x - closestX) * (ball.x - closestX) +
        (ball.y - closestY) * (ball.y - closestY)
    );
    
    // Check if distance is less than ball radius
    if (distance <= ball.radius) {
        // Calculate normal vector to the line
        const normalX = -(y2 - y1) / lineLength;
        const normalY = (x2 - x1) / lineLength;
        
        // Compute the dot product of velocity and normal
        const dotProduct = ball.vx * normalX + ball.vy * normalY;
        
        // Calculate new velocity components after collision
        ball.vx = ball.vx - 2 * dotProduct * normalX;
        ball.vy = ball.vy - 2 * dotProduct * normalY;
        
        // Apply elasticity
        ball.vx *= elasticity;
        ball.vy *= elasticity;
        
        // Move the ball outside the line
        const correction = ball.radius - distance + 1;
        ball.x += normalX * correction;
        ball.y += normalY * correction;
        
        return true;
    }
    
    return false;
}

// Function to check collision with all walls
function checkCollisions(vertices) {
    for (let i = 0; i < vertices.length; i++) {
        const nextIndex = (i + 1) % vertices.length;
        
        if (checkLineCollision(
            vertices[i].x, vertices[i].y,
            vertices[nextIndex].x, vertices[nextIndex].y
        )) {
            return true;
        }
    }
    
    return false;
}

// Function to update ball position
function updateBall(vertices) {
    // Apply gravity
    ball.vy += gravity;
    
    // Apply friction
    ball.vx *= friction;
    ball.vy *= friction;
    
    // Update position
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // Check collisions
    checkCollisions(vertices);
}

// Animation loop
function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    // Update rotation
    rotation += rotationSpeed * 0.01;
    
    // Calculate hexagon vertices
    const vertices = calculateHexagonVertices(rotation);
    
    // Draw hexagon
    drawHexagon(vertices);
    
    // Update and draw ball
    updateBall(vertices);
    drawBall();
    
    // Request next frame
    if (!isPaused) {
        animationId = requestAnimationFrame(animate);
    }
}

// Toggle animation
function toggleAnimation() {
    isPaused = !isPaused;
    
    if (!isPaused) {
        animationId = requestAnimationFrame(animate);
    } else {
        cancelAnimationFrame(animationId);
    }
}

// Initial render
function init() {
    const vertices = calculateHexagonVertices(rotation);
    drawHexagon(vertices);
    drawBall();
}

// Initialize the animation
init();
