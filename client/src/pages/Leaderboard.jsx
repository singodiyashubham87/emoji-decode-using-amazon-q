import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { apiClient } from '../config/apiClient';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await apiClient.get('/leaderboard');
        setLeaderboard(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Player</th>
                <th className="px-6 py-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr
                  key={player.PlayerID}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">#{index + 1}</td>
                  <td className="px-6 py-4">{player.PlayerID}</td>
                  <td className="px-6 py-4 text-right">{player.Score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    </motion.div>
  );
};
