import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./screens/HomePage";
import GamePage from "./screens/GamePage";
import NotFoundPage from "./screens/NotFoundPage";

import Loader from "./components/Loader";

import "./App.css";

// const GamePage = lazy(() => import("./screens/GamePage"));

function App() {
  const [gameId, setGameId] = useState("");

  return (
    <Routes>
      <Route
        index
        element={<HomePage gameId={gameId} setGameId={setGameId} />}
      />
      <Route path="/game/:id" element={<GamePage />} />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader delay={500} />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
