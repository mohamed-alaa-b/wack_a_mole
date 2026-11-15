// ==========================================
// 1. DOM ELEMENTS & INITIALIZATION
// ==========================================
const mainGrid = document.getElementById('grid');
// Using plural 'squares' for NodeLists/collections for better clarity
const squares = document.querySelectorAll('.square');
const timeLeftDisplay = document.getElementById('timerNum');
const scoreDisplay = document.getElementById('scoreNum');
const playBtn = document.getElementById('playBtn');



// Create the mole image element once to reuse it across squares
const moleImg = document.createElement('img');
moleImg.src = '/halloween-card.png';
moleImg.className = 'mole';

// Note: querySelectorAll returns a NodeList, not a live array of standard DOM elements. 
// We use forEach to iterate through them and assign unique IDs (1 through 9) to each grid cell.
squares.forEach((square, index) => {
    square.setAttribute('id', index + 1);
});

// ==========================================
// 2. GAME LOGIC (MOLE MOVEMENT)
// ==========================================
// this variable will be used to be a snapshot of the last square that had a mole
let lastSquareId = null; 



function showingMole() {
    // Remove the 'mole' class from all squares before placing a new one
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    // Pick a random square from the 9 available slots
    let randomSquare = squares[Math.floor(Math.random() * squares.length)];

    // Prevent the mole from appearing in the exact same square twice in a row
    while (randomSquare.id === lastSquareId) {
        randomSquare = squares[Math.floor(Math.random() * squares.length)];
    }

    lastSquareId = randomSquare.id;

    // Add the mole class and append the image to the selected square
    randomSquare.classList.add('mole');
    randomSquare.appendChild(moleImg);
}

// Run the mole movement every 800 milliseconds
let showingMoleInterval = null;


playBtn.addEventListener('click', () => {
    playBtn.textContent = 'play again';
    result = 0;
    scoreDisplay.textContent = result;
    timeLeft = 30;
    timeLeftDisplay.textContent = timeLeft;
    clearInterval(showingMoleInterval);
    clearInterval(timerInterval);
    lastSquareId = null;

    squares.forEach(square => {
        square.classList.remove('mole');
    })
    moleImg.remove();
    
    showingMole();
    timerInterval = setInterval(updateTimer, 1000);
    showingMoleInterval = setInterval(showingMole, 800);
});


// ==========================================
// 4. EVENT LISTENERS (CLICK INTERACTION)
// ==========================================

let result = 0;

function setupClickingLogic() {
    squares.forEach(square => {
        square.addEventListener("pointerdown", () => {
            // Check if the clicked square actually contains the mole
            if (square.classList.contains('mole')) {
                result++;
                scoreDisplay.textContent = result;
                
                // remove the mole immediately upon a successful hit 
                // so the player can't rack up multiple points on the same appearance
                square.classList.remove('mole');
                moleImg.remove();
            }
        });
    });
}

setupClickingLogic();

// ==========================================
// 5. timer handling
// ==========================================

let timeLeft = 30;

function updateTimer() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(showingMoleInterval);
        clearInterval(timerInterval);
        squares.forEach(square => {
            square.classList.remove('mole');
        })
        moleImg.remove();

        timeLeftDisplay.textContent = 'Time up!';

    }
}

let timerInterval = null;
