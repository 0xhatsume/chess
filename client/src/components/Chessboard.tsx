// frontend/src/components/Chessboard.tsx
import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { fetchBoardState, makeMove, checkGameOver, fetchMoveHistory } from "../api";

const ChessboardComponent: React.FC = () => {
    const [fen, setFen] = useState("start");
    const [isWhiteTurn, setIsWhiteTurn] = useState(true); // true = White's turn, false = Black's turn
    const [moveHistory, setMoveHistory] = useState<string[]>([]);
    
    useEffect(() => {
        fetchBoardState().then(setFen);
    }, []);

    const onDrop = async (sourceSquare: string, targetSquare: string) => {
        const move = `${sourceSquare}${targetSquare}`;  // Move in UCI notation
        try {
            const newFen = await makeMove(move);
            setFen(newFen);
            setIsWhiteTurn(!isWhiteTurn);

            // Check if the game is over after each valid move
            const gameOverStatus = await checkGameOver();
            if (gameOverStatus.is_checkmate) {
                alert("Checkmate! Game Over.");
            } else if (gameOverStatus.is_stalemate) {
                alert("Stalemate! Game Over.");
            } else if (gameOverStatus.is_draw) {
                alert("Draw! Game Over.");
            }

            // Update the move history
            const history = await fetchMoveHistory();
            setMoveHistory(history);

        } catch (error) {
            // If the backend returns a 400 error, the move is invalid
            if (error.response && error.response.status === 400) {
                alert("Invalid move. Please try again.");
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <h2 className="text-lg font-bold mb-4">
                {isWhiteTurn ? "White's Turn" : "Black's Turn"}
            </h2>
            <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                <Chessboard position={fen} onPieceDrop={onDrop} />
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">Move History</h3>
                <ul>
                    {moveHistory.map((move, index) => (
                        <li key={index}>
                            {index + 1}. {move}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChessboardComponent;