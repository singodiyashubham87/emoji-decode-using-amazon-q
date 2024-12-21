import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCorrect, playerId, score, nextPuzzleIndex } = location.state || {};

  const handleNextPuzzle = () => {
    navigate('/game', {
      state: { playerId, currentPuzzleIndex: nextPuzzleIndex, score },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        {isCorrect ? (
          <>
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Correct!
            </h2>
          </>
        ) : (
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Try Again!
          </h2>
        )}

        <p className="text-gray-600 mb-2">Score: {score}</p>

        <div className="space-y-4 mt-8">
          <Button onClick={handleNextPuzzle} className="w-full">
            Next Puzzle
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </motion.div>
  );
};