# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chess_logic import ChessGame

app = FastAPI()
game = ChessGame()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow requests from the Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MoveRequest(BaseModel):
    move: str  # Move in UCI format, e.g., "e2e4"

@app.get("/board")
def get_board():
    return {"fen": game.get_board_state()}

@app.post("/move")
def make_move(request: MoveRequest):
    if game.make_move(request.move):
        return {"fen": game.get_board_state()}
    raise HTTPException(status_code=400, detail="Invalid move")

@app.get("/game_over")
def game_over():
    return game.is_game_over()

@app.get("/move_history")
def move_history():
    return game.get_move_history()