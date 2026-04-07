const basket = document.getElementById("basket");
const fruit = document.getElementById("fruit");

const scoreText = document.getElementById("score");
const missText = document.getElementById("miss");

const catchSound = document.getElementById("catchSound");
const loseSound = document.getElementById("loseSound");
const bgMusic = document.getElementById("bgMusic");

const gameOverDiv = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

// daftar 5 buah
const fruits = [
    "img/buah1.png",
    "img/buah2.png",
    "img/buah3.png",
    "img/buah4.png",
    "img/buah5.png"
];

let basketX = 160;
let fruitX = 0;
let fruitY = 0;

let score = 0;
let miss = 0;
let gameRunning = true;

// volume
bgMusic.volume = 0.25;
catchSound.volume = 1;
loseSound.volume = 0.8;

// play musik setelah klik
document.addEventListener("click", () => {
    bgMusic.play();
}, { once: true });

// gerak keranjang
document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    if (e.key === "ArrowLeft") basketX -= 20;
    if (e.key === "ArrowRight") basketX += 20;

    if (basketX < 0) basketX = 0;
    if (basketX > 320) basketX = 320;

    basket.style.left = basketX + "px";
});

// reset buah (random)
function resetFruit() {
    fruitY = 0;
    fruitX = Math.random() * 360;

    let index = Math.floor(Math.random() * fruits.length);
    fruit.src = fruits[index];
}

// update game
function update() {
    if (!gameRunning) return;

    fruitY += 5;

    fruit.style.top = fruitY + "px";
    fruit.style.left = fruitX + "px";

    // kena keranjang
    if (
        fruitY > 430 &&
        fruitX > basketX - 20 &&
        fruitX < basketX + 80
    ) {
        score++;
        scoreText.textContent = "Skor: " + score;

        catchSound.currentTime = 0;
        catchSound.play();

        resetFruit();
    }

    // jatuh
    if (fruitY > 500) {
        miss++;
        missText.textContent = "Gagal: " + miss + " / 5";

        loseSound.currentTime = 0;
        loseSound.play();

        resetFruit();
    }

    // game over
    if (miss >= 5) {
        gameRunning = false;

        bgMusic.pause();

        finalScore.textContent = "Skor kamu: " + score;
        gameOverDiv.classList.add("show");
    }
}

// restart
function restartGame() {
    location.reload();
}

// mulai
resetFruit();
setInterval(update, 30);