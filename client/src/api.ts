// frontend/src/api.ts
import axios from "axios";

const API_URL = "http://localhost:8000";

export async function fetchBoardState() {
    const response = await axios.get(`${API_URL}/board`);
    return response.data.fen;
}

export async function makeMove(move: string) {
    const response = await axios.post(`${API_URL}/move`, { move });
    return response.data.fen;
}

export async function checkGameOver() {
    const response = await axios.get(`${API_URL}/game_over`);
    return response.data;
}

export async function fetchMoveHistory() {
    const response = await axios.get(`${API_URL}/move_history`);
    return response.data;
}