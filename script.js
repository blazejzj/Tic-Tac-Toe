const gameBoard = (function() {
    let gameContainer = document.querySelector(".board");
    let board = Array(9).fill(""); // fill board with empty strings for now

    const createBoard = () => {
        gameContainer.innerHTML = '';  // Clear existing squares if any
        for (let i = 0; i < 9; i++) {
            gameContainer.appendChild(createBoardSquare(i));
        }
    };

    const createBoardSquare = (index) => {
        let square = document.createElement("div");
        square.classList.add("square", "square" + index);
        square.addEventListener("click", () => {
            gameState.handlePlayerMove(index);
        });
        return square;
    };

    const markSquare = (index, playerMarker) => {
        const square = document.querySelector(".square" + index);
        board[index] = playerMarker;
        square.textContent = playerMarker;
    };

    const resetBoard = () => {
        board.fill("");
        document.querySelectorAll(".square").forEach(square => square.textContent = "");
    };

    const getBoard = () => board;

    return { createBoard, markSquare, resetBoard, getBoard };

})();

function createPlayer(name, marker) {
    return {name, marker, score: 0};
};

const gameState = (function() {

    const playerNameForms = document.getElementById("playerNameForm");
    const informationDisplay = document.getElementById("infoDisplay");
    const scoreDisplay = document.getElementById("score");
    const board = gameBoard.getBoard();

    let player1, player2, currentPlayer, rounds;
    let roundsPlayed = 0;
    let gameActive = false;

    playerNameForms.addEventListener("submit", function (e) {
        e.preventDefault();
        resetGame(); // At every submit we reset the game -> incase of name change in the middle of the game

        // get player names
        const player1NameValue = document.getElementById("firstName").value;
        const player2NameValue = document.getElementById("secondName").value;

        // get desired amount of rounds
        rounds = parseInt(document.getElementById("rounds").value);

        // create players
        player1 = player1NameValue ? createPlayer(player1NameValue, "O") : createPlayer("Player 1", "O");
        player2 = player2NameValue ? createPlayer(player2NameValue, "X") : createPlayer("Player 2", "X");
        currentPlayer = player1;

        // reset forms, start game, update display with names
        playerNameForms.reset();
        gameBoard.createBoard();
        scoreDisplay.style.display = "block";
        gameActive = true;
        updateDisplay();
    });

    const updateDisplay = () => {
        if (checkForWin()) {
            currentPlayer.score++; // if round won give score and increment amount of rounds played
            roundsPlayed++;
            informationDisplay.textContent = `${currentPlayer.name} wins the round!`;

            if (roundsPlayed < rounds) {
                // restart board after a round win after 2 seconds
                setTimeout(() => gameBoard.resetBoard(), 2000);
            } 
            
            else {
                // Determine winner
                let winner = player1.score > player2.score ? player1.name : player2.name;
                informationDisplay.textContent = `${winner} wins the whole game!`;
                gameActive = false;
            };

        } 

        else {
            informationDisplay.textContent = `${currentPlayer.name} (${currentPlayer.marker})'s turn`;
        }

        // Score display update
        scoreDisplay.textContent = `${player1.name}: ${player1.score} / ${rounds} | ${player2.name}: ${player2.score} / ${rounds}`;
    };

    const handlePlayerMove = (index) => {
        let board = gameBoard.getBoard();
        if (board[index] === "" && gameActive) {
            gameBoard.markSquare(index, currentPlayer.marker);
            if (checkForWin()) {
                updateDisplay();
            } else {
                switchTurn();
                updateDisplay();
            }
        }
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkForWin = () => {
        const winningPatterns = [
            // rows - columns - diagonals
            [0, 1, 2], [0, 3, 6], [0, 4, 8],
            [3, 4, 5], [1, 4, 7], [6, 4, 2],
            [6, 7, 8], [2, 5, 8],
        ];

        for(let pattern of winningPatterns) {

            for(let j = 0; pattern.length; j++) {

                // if marker not found break & try different pattern
                if(board[pattern[j]] !== currentPlayer.marker) {
                    break;
                }

                if(j === pattern.length - 1) {
                    return true;
                }
            };
        };

        return false;
        
    };

    const resetGame = () => {
        roundsPlayed = 0;
        gameBoard.resetBoard();
        if (player1 && player2) {
            player1.score = 0;
            player2.score = 0;
        }
        gameActive = false;
    };

    return { handlePlayerMove };

})();
``
