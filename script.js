const bird = document.getElementById('bird');
const pipe = document.getElementById('pipe');
const scoreDisplay = document.getElementById('score');

let birdTop = 200;
let gravity = 2;
let isGameOver = false;
let score = 0;

// Make the bird fall due to gravity
function startGame() {
    let gameInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(gameInterval);
            alert('Game Over! Score: ' + score);
            window.location.reload();
        } else {
            birdTop += gravity;
            bird.style.top = birdTop + 'px';
            movePipe();
            detectCollision();
        }
    }, 20);
}

// Move the pipe and reset position
function movePipe() {
    let pipeLeft = pipe.offsetLeft;
    pipeLeft -= 3;
    if (pipeLeft < -60) {
        pipeLeft = 320;
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }
    pipe.style.left = pipeLeft + 'px';
}

// Detect collision between bird and pipe or boundaries
function detectCollision() {
    const pipeTop = pipe.offsetTop + 200;
    const pipeBottom = pipeTop + 100;
    if (birdTop < 0 || birdTop > 440 || (pipe.offsetLeft < 90 && pipe.offsetLeft > 50 && (birdTop < pipeTop || birdTop > pipeBottom))) {
        isGameOver = true;
    }
}

// Control bird jump
function jump() {
    if (birdTop > 20) {
        birdTop -= 40;
    }
}

// Event listeners for controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
});
document.addEventListener('click', jump);

// Start the game
startGame();
