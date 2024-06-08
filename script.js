
const gameBoard = (function() {

    let gameContainer = document.querySelector(".board");
    // Initialize the state array
    let board = Array(9).fill("");

    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
            let square = createBoardSquare(i);
            gameContainer.appendChild(square);
        };
    };

    const createBoardSquare = (index) => {
        let singleSquare = document.createElement("div");
        singleSquare.classList.add("square", "square" + index);
        singleSquare.addEventListener("click", function() {
            gameState.handlePlayerMove(index)
        });
        return singleSquare;
    }

    const markSquare = (index, playerMarker) => {
        const square = document.querySelector(".square" + index);
        // Mark index with playerMarker
        board[index] = playerMarker;
        square.textContent = board[index];
    };
    
    const resetBoard = () => {
        board.fill("");
        // reset each square
        document.querySelectorAll(".square").forEach(square => square.textContent = "");
    };

    const getBoard = () => {
        return board;
    };
    

    return { createBoard, markSquare, resetBoard, getBoard }
})();

function createPlayer(name, marker) {
    return {name, marker};
};

const gameState = (function() {

    const playerNameForms = document.getElementById("playerNameForm");
    const informationDisplay = document.getElementById("infoDisplay")
    const board = gameBoard.getBoard(); // get the board
    let gameActive = false;
    let player1, player2, currentPlayer;


    playerNameForms.addEventListener("submit", function (e) {
        e.preventDefault();

        // gather names
        const player1NameValue = document.getElementById("firstName").value;
        const player2NameValue = document.getElementById("secondName").value;

        // assign player names
        player1 = player1NameValue ? createPlayer(player1NameValue, "O") : createPlayer("Player 1", "O");
        player2 = player2NameValue ? createPlayer(player2NameValue, "X") : createPlayer("Player 2", "X");

        // assign current player (always first player going to be playing "O")
        currentPlayer = player1;

        // clear the forms
        playerNameForms.reset();

        // Start the game
        gameBoard.createBoard();
        gameActive = true;
        updateDisplay();
    });

    const updateDisplay = () => {
        if(gameActive && !checkForWin()) {
            informationDisplay.textContent = currentPlayer.name + " '" + currentPlayer.marker + "' turn!";
        } 
        
        else if (gameActive && checkForWin()) {
            informationDisplay.textContent = currentPlayer.name + " HAS WON!";
        }

        else {
            informationDisplay.textContent = "Welcome to Tic-Tac-Toe!"
        }
    }

    const handlePlayerMove = (index) => {
        // Check first if square is empty
        if(board[index] === "") {
            // if square empty mark it
            gameBoard.markSquare(index, currentPlayer.marker);

            if(checkForWin()) {
                console.log(currentPlayer.name)
                updateDisplay();
                // alert(currentPlayer.name + " wins!")
                // gameBoard.resetBoard();
            }
            switchTurn();
            updateDisplay();
        }
    };

    const switchTurn = () => {
        // If currentplayer equals to player 1 then switch, else switch to player1
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

    return { handlePlayerMove };

})();