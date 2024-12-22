import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const BASE_URL = import.meta.env.VITE_BASE_URL
export const Home = () => {
  const [playerId, setPlayerId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!playerId.trim()) return;

    setLoading(true);

    try {
      // Check if the user exists in the database
      const response = await fetch(`${BASE_URL}/player/${playerId}`, {
        method: "GET",
      });

      if (response.status === 404) {
        // Create the user if not found
        await fetch(`${BASE_URL}/player`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId, score: 0 }),
        });
      }

      // Navigate to the Game page
      navigate("/game", { state: { playerId } });
    } catch (err) {
      console.error("Error starting the game:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4"
    >
      <div className="text-center mb-8">
        <Gamepad2 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Emoji Decoder Game
        </h1>
        <p className="text-gray-600">Test your emoji interpretation skills!</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <Input
          label="Enter Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="e.g., EmojiMaster123"
        />
        <Button
          onClick={handleStart}
          className="w-full"
          disabled={!playerId.trim() || loading}
        >
          {loading ? "Loading..." : "Start Game"}
        </Button>
      </div>

      <div className="mt-8 space-x-4">
        <Button variant="secondary" onClick={() => navigate("/leaderboard")}>
          Leaderboard
        </Button>
        <Button variant="secondary" onClick={() => navigate("/about")}>
          About Game
        </Button>
      </div>
      <div className="mt-8 space-x-4">
      Made with ❤️ by <a href="https://shubham-s-socials.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Shubham Singodiya</a>
      </div>
    </motion.div>
  );
};
