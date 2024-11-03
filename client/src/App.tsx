// frontend/src/App.tsx
import React from "react";
import ChessboardComponent from "./components/Chessboard";
import "./index.css";

const App: React.FC = () => (
    <div className="h-screen flex items-center justify-center bg-gray-100">
        <ChessboardComponent />
    </div>
);

export default App;