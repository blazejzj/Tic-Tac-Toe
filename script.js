
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
}

const gameState = (function() {

    // Initialize players -> Gather names later
    const player1 = createPlayer("placeholder1", "o");
    const player2 = createPlayer("placeholder2", "x");
    let board = gameBoard.getBoard(); // get the board

    // Initialize boardgameContainer
    const handlePlayerMove = (index) => {


        // Check first if square is empty
        if(board[index] === "") {
            gameBoard.markSquare(index, currentPlayer.marker);

            if(!checkForWin()) {
                switchTurn();
            }

            else {
                alert(currentPlayer.name + " wins!")
                gameBoard.resetBoard();
            }
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

                if(j === pattern.length - 1) {
                    return true;
                }
            };
        };

        return false;
        
    };

    return { handlePlayerMove };

})();


gameBoard.createBoard(); 