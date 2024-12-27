import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { apiClient } from "../config/apiClient";

export const Home = () => {
  const [playerId, setPlayerId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!playerId.trim()) return;

    setLoading(true);

    try {
      await apiClient.get(`/player/${playerId}`);
    } catch (err) {
        try {
          await apiClient.post("/player", { playerId, score: 0 });
        } catch (err) {
          console.error("Error creating the player:", err);
          setLoading(false);
          return;
        }
    }

    navigate("/game", { state: { playerId } });
    setLoading(false);
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
