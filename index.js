// alert("hi");
const boxes = document.getElementsByClassName("box");
const mapToColor = {
    1: "red",
    2: "green",
    3: "blue",
    4: "yellow",
    5: "wrong",
};
let gameStarted = false; // Moved here to ensure it's defined before eventOccurred is called
let level = 0;
let currentIndex = 0;
let patternQueue = [];

function eventOccurred() {
    console.log(boxes);
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        box.addEventListener("click", function () {
            if (!gameStarted) {
                wrongInput();
                return;
            }
            box.classList.add("pressed");
            setTimeout(function () {
                box.classList.remove("pressed");
            }, 100); // Fixed delay to be a number, not a string
            inputOccurred(mapToColor[i + 1]);
            playSound(i + 1);
        });
    }
}   

function playSound(i) {
    const audio = new Audio(`./sounds/${mapToColor[i]}.mp3`);
    audio.play();
}

function gameOver() {
    currentIndex = 0;
    patternQueue = [];
    level = 0;
    gameStarted = false;
    document.getElementsByTagName("h1")[0].innerHTML = `Press Any Key to Start Again`;
}

function gamePlay() {
    // console.log("hi, I am active");
    currentIndex = 0;
    patternQueue = [];
    level = 0;
    changeHeading();
    addToPatternQueue();
    gameStarted = true;
}

function wrongInput() {
    const wrongInput = new Audio("./sounds/wrong.mp3");
    wrongInput.play();
}

function inputOccurred(eventKey) {
    // console.log(eventKey + " " + eventKey);
    if (eventKey !== patternQueue[currentIndex]) {
        gameOver();
        wrongInput();
        return; 
    }
    // console.log(patternQueue);
    // console.log(currentIndex);
    if (currentIndex === patternQueue.length - 1) {
        addToPatternQueue();
        currentIndex = -1;
        level++;
        changeHeading();
    }
    currentIndex++;
}

function addToPatternQueue() {
    const random = Math.floor(Math.random() * 4);
    patternQueue.push(mapToColor[random + 1]);
    // console.log(patternQueue + " pushed
    setTimeout(() => {u},  "300000");
    const box = boxes[random];
    box.classList.add("bot-pressed");
    setTimeout(function () {
        box.classList.remove("bot-pressed");
    }, 200);
}

function changeHeading() {
    document.getElementsByTagName("h1")[0].innerHTML = `Level - ${level}`;
}

eventOccurred();

document.addEventListener("keydown", function () {
    if (!gameStarted) {
        gamePlay();
    }
});
