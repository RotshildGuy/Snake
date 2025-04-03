# Snake Game

## Overview
This is a Snake game implemented using HTML, CSS, and JavaScript. It features a classic Snake gameplay with added enhancements like:

**Score Tracking**: Displays the current score.

**Game Over**: Detects collisions with walls and itself, ending the game.

**Auto Play**: The snake plays automatically using BFS.

**Speed Control**: A slider bar to adjust the game speed.

**Win Condition**: The game ends with a win message when the snake fills the entire board.

## How to Play
**Start Game**: Click the "Start Game" button to begin the game. Use the arrow keys to control the snake's movement.

**Control Snake**:

Use the Up arrow key to move the snake up.

Use the Down arrow key to move the snake down.

Use the Left arrow key to move the snake left.

Use the Right arrow key to move the snake right.

**Eat Food**: Guide the snake to eat the red food blocks to increase your score and the snake's length.

**Avoid Collisions**: Prevent the snake from colliding with the walls or its own body. If a collision occurs, the game ends.

**Auto Play**: Click the "Auto Play" button to watch the snake play automatically. Click "Stop Auto Play" to regain control.

**Adjust Speed**: Use the speed slider to control how fast the snake moves.

**Win Condition**: The game ends and displays "You Win!" when the snake's length is equal to the total number of cells on the game board (Minus 1 because the when the snake’s length is 1 the score is 0).

## Files
**index.html**: The main HTML file that sets up the game structure, including the canvas, buttons, and speed control.

**style.css**: Contains the CSS styles for the game, including the layout, colors, and fonts.

**index.js**: The JavaScript file that implements the game logic, including snake movement, food generation, collision detection and pathfinding.

## Features
**Score Display**: The current score is displayed at the top of the game screen.

**Auto Play**: The game includes an auto play mode where the snake is controlled by an AI. The AI uses a pathfinding algorithm to find the food.

**Path Visualization**: When auto play is enabled, the calculated path to the food is displayed as a semi-transparent yellow line.

**Speed Control**: A speed slider allows the player to adjust the game speed, making the snake move faster or slower.

**Win Condition**: The game ends with a "You Win!" message when the snake fills the entire game board.

**Responsive Design**: The game layout is responsive and adapts to different screen sizes.

**Collision Detection**: The game accurately detects collisions between the snake and the walls or its own body.

**Food Generate**: Food is randomly generated on the game board.

**Snake Movement**: The snake moves smoothly across the grid.

## Technical Details
**HTML Canvas**: The game is rendered on an HTML canvas.

**JavaScript Game Loop**: The game logic is handled by a JavaScript game loop.

**Pathfinding Algorithm**: The auto play mode uses a Breadth-First Search (BFS) algorithm with one-way routes to find the shortest path to the food.

**Collision Detection**: Collision detection is implemented by checking if the snake's head intersects with its body or the boundaries of the canvas.

Event Handling: JavaScript event listeners handle user input from the keyboard, buttons, and speed slider.
