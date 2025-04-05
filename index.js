const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreDisplay");
const buttonContainer = document.getElementById("button-container");
const messageContainer = document.getElementById("message-container");
const playButton = document.getElementById("playButton");
const autoPlayButton = document.getElementById("autoPlayButton");
const bestScoreDisplay = document.getElementById("bestScoreDisplay");
const speedSlider = document.getElementById("speedSlider");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = "right";
let bestScore = 0;
let score = 0;
let gameOver = false;
let gameSpeed = 100;
let intervalId;
let autoPlay = false;
let path = []; // Store the path to food
let findingPath = false;
let gameStarted = false; // Track if the game has started


function generateFood() {
    while (true) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize)),
        };
        let onSnake = false;
        for (const segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                onSnake = true;
                break;
            }
        }
        if (!onSnake) {
            break; // Food is not on the snake, exit the loop
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        let decimal = Math.floor(255 * (i / 400));
        let hexa = decimal.toString(16);
        if (hexa.length === 1) hexa = "0" + hexa;
        ctx.fillStyle = "#0000" + hexa;
        ctx.fillRect(
            snake[i].x * gridSize,
            snake[i].y * gridSize,
            gridSize,
            gridSize
        );
        ctx.strokeStyle = "#065F46";
        ctx.strokeRect(
            snake[i].x * gridSize,
            snake[i].y * gridSize,
            gridSize,
            gridSize
        );
    }

    ctx.fillStyle = "#F87171";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    ctx.strokeStyle = "#9F1239";
    ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    if (gameOver) {
        ctx.fillStyle = "#DC2626";
        ctx.font = "30px 'Press Start 2P', sans-serif";
        ctx.textAlign = "center";
        if (score == 399) {
            if (autoPlay) ctx.fillText("Computer Won", canvas.width / 2, canvas.height / 2);
            else ctx.fillText("You Won!", canvas.width / 2, canvas.height / 2);
            autoPlay = false;
        }
        else ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }
    if (autoPlay && path.length > 0) {
        for (let i = 0; i < path.length; i++) {
            ctx.fillStyle = "rgba(255, 255, 0, 0.5)";  // Semi-transparent yellow
            ctx.fillRect(
                path[i].x * gridSize,
                path[i].y * gridSize,
                gridSize,
                gridSize
            );
        }
    }

}

function update() {
    if (gameOver) {
        return;
    } else {
        const head = { x: snake[0].x, y: snake[0].y };

        if (autoPlay) {
            if (!findingPath || path.length === 0) {
                findPath();
                findingPath = true;
            }

            if (path.length > 0) {
                const nextMove = path.shift();
                if (nextMove.x > head.x) direction = "right";
                else if (nextMove.x < head.x) direction = "left";
                else if (nextMove.y > head.y) direction = "down";
                else if (nextMove.y < head.y) direction = "up";
            } else {         
                if (head.x + 1 < canvas.width / gridSize && !checkCollision({ x: snake[0].x + 1, y: snake[0].y}) && direction != "left" && head.y % 2 == 1) direction = "right";
                else if (head.x - 1 >= 0 && (!checkCollision({ x: snake[0].x - 1, y: snake[0].y}) && direction != "right") && head.y % 2 == 0) direction = "left";
                else if (head.y + 1 < canvas.height / gridSize && (!checkCollision({ x: snake[0].x, y: snake[0].y + 1}) && direction != "up") && head.x % 2 == 0) direction = "down";
                else if (head.y - 1 >= 0 && (!checkCollision({ x: snake[0].x, y: snake[0].y - 1}) && direction != "down") && head.x % 2 == 1) direction = "up";
            }
        }

        switch (direction) {
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }

        if (
            head.x < 0 ||
            head.x >= canvas.width / gridSize ||
            head.y < 0 ||
            head.y >= canvas.height / gridSize ||
            checkCollision(head)
        ) {
            gameOver = true;
            clearInterval(intervalId);
            draw();

            if(!autoPlay && score > bestScore){
                bestScore = score;
                bestScoreDisplay.textContent = "Best Score: " + bestScore;
            }
            autoPlayButton.textContent = "Auto Play";
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = "Score: " + score;
            if (score != 399) generateFood();
        } else {
            snake.pop();
        }

        draw();
    }
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function findPath() {
    const start = { x: snake[0].x, y: snake[0].y };
    const queue = [start];
    const visited = { [`${start.x},${start.y}`]: true };
    const cameFrom = {};
    const boardWidth = canvas.width / gridSize;
    const boardHeight = canvas.height / gridSize;

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.x === food.x && current.y === food.y) {
            break; // Path found
        }

        const neighbors = [];
        if (current.x + 1 < boardWidth && current.y % 2 == 1) neighbors.push({ x: current.x + 1, y: current.y, dir: "right" });
        if (current.x - 1 >= 0 && current.y % 2 == 0) neighbors.push({ x: current.x - 1, y: current.y, dir: "left" });
        if (current.y + 1 < boardHeight && current.x % 2 == 0) neighbors.push({ x: current.x, y: current.y + 1, dir: "down" });
        if (current.y - 1 >= 0 && current.x % 2 == 1) neighbors.push({ x: current.x, y: current.y - 1, dir: "up" });


        for (const neighbor of neighbors) {
            if (
                !checkPathCollision(neighbor) &&
                !visited[`${neighbor.x},${neighbor.y}`]
            ) {
                queue.push(neighbor);
                visited[`${neighbor.x},${neighbor.y}`] = true;
                cameFrom[`${neighbor.x},${neighbor.y}`] = current;
            }
        }
    }

    // Reconstruct the path
    path = [];
    let current = { x: food.x, y: food.y };
    while (current.x !== start.x || current.y !== start.y) {
        if (!cameFrom[`${current.x},${current.y}`]) {
            return;
        }
        path.unshift(current);
        current = cameFrom[`${current.x},${current.y}`];
    }
}

function checkPathCollision(cell) {
    for (const segment of snake) {
        if (segment.x === cell.x && segment.y === cell.y) {
            return true;
        }
    }
    return false;
}


playButton.addEventListener("click", () => {
    gameSpeed = 100;
    if (intervalId) {
        clearInterval(intervalId);
    }
    gameOver = false;
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    score = 0;
    generateFood();
    scoreDisplay.textContent = "Score: " + score;
    intervalId = setInterval(update, gameSpeed);
    autoPlay = false;
    playButton.textContent = "Start Game";
    autoPlayButton.textContent = "Auto Play";
    path = [];
    findingPath = false;
    gameStarted = true;

    document.addEventListener('keydown', handleKeyDown);
});

function handleKeyDown(event) {
    if (!gameStarted) return; // Only allow key presses if the game has started

    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
    event.preventDefault(); // Prevent scrolling
}

speedSlider.addEventListener("input", () => {
    gameSpeed = parseInt(speedSlider.value);
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(update, 200 - gameSpeed);
    }
});

autoPlayButton.addEventListener("click", () => {
    autoPlay = !autoPlay;
    if (autoPlay) {
        // gameSpeed = 1;
        autoPlayButton.textContent = "Stop Auto Play";
        if (intervalId) {
            clearInterval(intervalId);
        }
        gameOver = false;
        snake = [{x: 10, y: 10}];
        direction = "right";
        score = 0;
        generateFood();
        scoreDisplay.textContent = "Score: " + score;
        intervalId = setInterval(update, gameSpeed);
        findingPath = false;
        path = [];
        gameStarted = true;
        document.removeEventListener('keydown', handleKeyDown);

    } else {
        // gameSpeed = 100;
        autoPlayButton.textContent = "Auto Play (Start)";
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(update, gameSpeed);
        path = [];
        findingPath = false;
        gameStarted = true;
        document.addEventListener('keydown', handleKeyDown);
    }
});
