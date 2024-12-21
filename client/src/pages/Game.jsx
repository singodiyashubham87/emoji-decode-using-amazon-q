import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BASE_URL } from "../BASE_URL";
import Loader from "../components/Loader";

export const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerId } = location.state || {};
  const [puzzle, setPuzzle] = useState(null);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const [puzzleRes, scoreRes] = await Promise.all([
          fetch(`${BASE_URL}/puzzle`).then((res) => res.json()),
          fetch(`${BASE_URL}/score/${playerId}`).then((res) => res.json()),
        ]);

        setPuzzle(puzzleRes);
        setScore(scoreRes.score || 0);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching game data:", err);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [playerId]);

  const handleSubmit = () => {
    fetch(`${BASE_URL}/guess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId, guess }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/result", {
          state: {
            isCorrect: data.correct,
            playerId,
            score: data.correct ? score + 10 : score,
          },
        });
      })
      .catch((err) => console.error("Error submitting guess:", err));
  };

  if (loading) {
    return <Loader />;
  }

  if (!puzzle) {
    return <p className="text-center text-gray-500">No puzzles available.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Player: {playerId}</p>
            <p className="text-2xl font-bold text-indigo-600 mb-4">
              Score: {score}
            </p>
            <div className="text-6xl mb-6">{puzzle.emojis}</div>
          </div>

          <Input
            label="Your Guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your answer..."
          />

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!guess.trim()}
          >
            Submit Guess
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
