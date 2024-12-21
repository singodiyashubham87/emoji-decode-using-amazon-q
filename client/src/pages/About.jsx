import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <HelpCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">How to Play</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <MessageCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Game Rules</h3>
                <p className="text-gray-600">
                  Decode the emoji combinations into words or phrases. Each correct
                  answer earns you points!
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Example:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-2xl mb-2">🌍🏃‍♂️</p>
                <p className="text-gray-600">Answer: "world running"</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Scoring:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Correct answer: +10 points</li>
                <li>Try to get the highest score possible!</li>
                <li>Compete with other players on the leaderboard</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button onClick={() => navigate('/')}>
              Start Playing
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};