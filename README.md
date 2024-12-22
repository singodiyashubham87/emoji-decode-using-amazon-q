# 🎮 Emoji Decoder Game

Welcome to **Emoji Decoder**, a fun and engaging game where you decode emoji sequences into words or phrases! 
Ex. 🐍📜 → "Python Script" 🎉

## 🚀 Features

- Randomly selected emoji puzzles to keep the game exciting!
- Score tracking for each player stored in a DynamoDB table.
- Sleek and modern front-end built with React, Vite, and Tailwind CSS.
- Backend powered by FastAPI for seamless API handling.
- Deployed globally for fast and reliable access.

---

## 🛠️ How It Works

1. **Enter Your Player ID**: Each player is identified by a unique ID.
2. **Decode the Emoji Sequence**: Guess the correct word or phrase that matches the emoji shown.
3. **Earn Points**: Each correct answer adds **+10 points** to your score.
4. **Save Progress**: Your score is stored in the database, so you can pick up where you left off! 💾

---

## 🧩 System Architecture

The game consists of the following components:

1. **Frontend**:
   - Built using **React**, **Vite**, and **Tailwind CSS**.
   - Deployed on **Vercel**.

2. **Backend**:
   - Built using **FastAPI**.
   - Hosted on **AWS EC2** with **Nginx** for SSL termination.
   - SSL certificate provided for free by [Let's Encrypt](https://letsencrypt.org/). 🌐🔒


3. **Database**:
   - Uses **AWS DynamoDB** to manage emoji puzzles and player scores.

4. **Domain**:
   - Custom domain registered with **.tech** and DNS managed for deployment.

---

## 📋 Prerequisites

Before running the project locally, ensure the following:

1. **Frontend**:
   - Node.js (version 14+).

2. **Backend**:
   - Python 3.8+ installed.
   - AWS credentials with DynamoDB access.

3. **Database**:
   - Two DynamoDB tables created:
     - **EmojiPuzzles**
     - **PlayerScores**

4. **Domain**:
   - Pointed to the EC2 instance.
   - Configured SSL using Certbot.

---

## 🌐 How to Deploy

### 1. Backend (FastAPI)

#### Steps:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/singodiyashubham87/emoji-decode-using-amazon-q
   cd server
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate # For Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   Create a `.env` file with:
   ```env
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   ```

5. **Run Locally**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

6. **Deploy to EC2**:
   - SSH into the EC2 instance.
   - Install Python, Gunicorn, and Nginx.
   - Set up a Gunicorn service for FastAPI.
   - Configure Nginx for reverse proxy and SSL.

### 2. Frontend (React + Vite + Tailwind)

#### Steps:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/singodiyashubham87/emoji-decode-using-amazon-q
   cd client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Add the backend API URL to `.env`:
   ```env
   VITE_BASE_URL=https://www.your-domain.tech
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel**:
   - Connect the repository to Vercel.
   - Set the environment variables in Vercel settings.

---

## 🖥️ Database Schema

1. **EmojiPuzzles Table**:
   - Stores emoji sequences and their corresponding answers.
   - Schema:
     - `PuzzleID` (Number): Unique ID for each puzzle.
     - `Emojis` (String): Emoji sequence.
     - `Phrase` (String): Correct answer.

   Example:
   | PuzzleID | Emojis | Phrase          |
   |----------|--------|-----------------|
   | 1        | 🐍📜   | Python Script   |
   | 2        | 🎸🌟   | Rockstar        |
   | 3        | 🌍📖   | World Book      |

2. **PlayerScores Table**:
   - Tracks scores for each player.
   - Schema:
     - `PlayerID` (Number): Unique ID for each player.
     - `Score` (Number): Current score of the player.

   Example:
   | PlayerID | Score |
   |----------|-------|
   | 1        | 10    |
   | 2        | 20    |

---

## 📚 Game Flow

1. **Start the Game**:
   - Enter your player ID (e.g., "mastermickey").
   - The app fetches your current score from DynamoDB.

2. **Solve the Puzzle**:
   - A random emoji sequence is displayed.
   - Enter your guess for the word or phrase.

3. **Scoring**:
   - Correct answers add **10 points** to your score.
   - Scores are updated dynamically in the database.

4. **Replay**:
   - Solve another puzzle or exit the game.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, improvements, or additional emoji puzzles, feel free to open an issue or submit a pull request. Let's make this game even more fun together! 🎉

---

## 🧑‍💻 Author

Developed by **[Shubham Singodiya](https://shubham-s-socials.vercel.app/)**.  
Feel free to reach out for any questions, feedback, or collaboration opportunities.  

Radhe-Radhe! 🌟
