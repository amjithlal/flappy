const bird = document.getElementById('bird');
const pipesContainer = document.getElementById('pipes-container');
const scoreDisplay = document.getElementById('score');

let birdTop = 200;
let isGameOver = false;
let score = 0;

// Start the game and update bird's position
function startGame() {
    let gameInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(gameInterval);
            alert('Game Over! Score: ' + score);
            window.location.reload();
        } else {
            bird.style.top = birdTop + 'px';
            movePipes();
            detectCollision();
        }
    }, 20);

    generatePipes();
}

// Function to generate pipes at intervals
function generatePipes() {
    setInterval(() => {
        const pipeTopHeight = Math.floor(Math.random() * 150) + 50;
        const gap = 120;

        const pipeTop = document.createElement('div');
        pipeTop.classList.add('pipe', 'pipe-top');
        pipeTop.style.height = pipeTopHeight + 'px';
        pipeTop.style.left = '320px';

        const pipeBottom = document.createElement('div');
        pipeBottom.classList.add('pipe', 'pipe-bottom');
        pipeBottom.style.height = (480 - pipeTopHeight - gap) + 'px';
        pipeBottom.style.left = '320px';

        pipesContainer.appendChild(pipeTop);
        pipesContainer.appendChild(pipeBottom);
    }, 1500);
}

// Move pipes and check if they go offscreen
function movePipes() {
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        pipeLeft -= 3;

        if (pipeLeft < -60) {
            pipe.remove();
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        } else {
            pipe.style.left = pipeLeft + 'px';
        }
    });
}

// Detect collision between bird and pipes or boundaries
function detectCollision() {
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        const pipeRect = pipe.getBoundingClientRect();
        const birdRect = bird.getBoundingClientRect();

        if (
            birdRect.left < pipeRect.left + pipeRect.width &&
            birdRect.left + birdRect.width > pipeRect.left &&
            birdRect.top < pipeRect.top + pipeRect.height &&
            birdRect.height + birdRect.top > pipeRect.top
        ) {
            isGameOver = true;
        }
    });

    // Check if the bird hits the top or bottom of the container
    if (birdTop < 0 || birdTop > 440) {
        isGameOver = true;
    }
}

// Control bird movement with arrow keys
function moveBird(e) {
    if (e.key === 'ArrowUp' && birdTop > 0) {
        birdTop -= 20; // Move up
    } else if (e.key === 'ArrowDown' && birdTop < 440) {
        birdTop += 20; // Move down
    }
}

// Event listener for arrow key controls
document.addEventListener('keydown', moveBird);

// Start the game
startGame();
