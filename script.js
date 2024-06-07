

const gameBoard = (function() {



    var gameContainer = document.querySelector(".board");
    // Initialize the state array
    var board = Array(9).fill("");

    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
            square = createBoardSquare(i);
            gameContainer.appendChild(square);
        }
    }

    const createBoardSquare = (index) => {
        var singleSquare = document.createElement("div");
        singleSquare.classList.add("squares", "square" + index);
        singleSquare.addEventListener("click", function() {
            handlePlayerMove(index)
        });
        return singleSquare
    }

    const markSquare = (index, playerMarker) => {
        const square = document.querySelector(".square" + index);
        // Mark index with playerMarker
        board[index] = playerMarker;
        square.textContent = board[index];
    }
    
    const resetBoard = () => {
        board.fill("");
    }

    const getBoard = () => {
        return board;
    }

    return { createBoard, markSquare, resetBoard, getBoard }
})

function createPlayer(name, marker) {
    return {name, marker};
}

const gameState = (function() {

    // Initialize players -> Gather names later
    const player1 = createPlayer("placeholder1", "o");
    const player2 = createPlayer("placeholder2", "x");

    // Initialize boardgameContainer
    const handlePlayerMove = (index) => {

        // Check first if square is empty
        if(board[index] === "") {
            gameBoard.markSquare(index, currentPlayer.marker);

            if(!checkForWin()) {
                switchTurn();
            }
            // else {
            //     gameBoard.resetBoard();
            // }
        }
    };

    const switchTurn = () => {
        // If currentplayer equals to player 1 then switch, else switch to player1
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkForWin = () => {

        const winningPatterns = [
            // rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // diagonals
            [0, 4, 8],
            [6, 4, 2],
        ];

        for(let pattern of winningPatterns) {
            for(let j = 0; pattern.length; j++) {
                if(board[pattern[j]] !== currentPlayer.marker) {
                    break;
                }

                return j === pattern.length - 1; // if j reaches the last index -> indicates a win
            };
        };

        return false;
        
    };

    return { handlePlayerMove };

});


gameBoard.createBoard();
gameState();