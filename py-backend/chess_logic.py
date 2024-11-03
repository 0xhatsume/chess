# backend/chess_logic.py
import chess

class ChessGame:
    def __init__(self):
        self.board = chess.Board()

    def make_move(self, move: str) -> bool:
        """
        Attempts to make a move on the chessboard.
        Returns True if the move is legal and successfully made, False otherwise.
        """
        try:
            # Parse the move from UCI (Universal Chess Interface) notation
            chess_move = self.board.parse_uci(move)
            if chess_move in self.board.legal_moves:
                self.board.push(chess_move)
                return True
            return False
        except ValueError:
            return False

    def get_board_state(self):
        """
        Returns the board state in FEN (Forsyth–Edwards Notation).
        """
        return self.board.fen()

    def is_game_over(self):
        """
        Returns a dictionary indicating if the game is over by checkmate, stalemate, or draw.
        """
        return {
            "is_checkmate": self.board.is_checkmate(),
            "is_stalemate": self.board.is_stalemate(),
            "is_draw": self.board.is_draw(),
        }

    def get_move_history(self):
        """
        Returns the move history in UCI notation as a list.
        """
        return [move.uci() for move in self.board.move_stack]
