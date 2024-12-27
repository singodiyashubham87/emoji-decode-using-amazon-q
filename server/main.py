from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import boto3
import os
import random
from botocore.exceptions import ClientError
from fastapi.middleware.cors import CORSMiddleware
from decimal import Decimal


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS DynamoDB setup
dynamodb = boto3.resource('dynamodb',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION')
        )
puzzles_table = dynamodb.Table('EmojiDecodePuzzles')
scores_table = dynamodb.Table('PlayerScores')

# Request models
class GuessRequest(BaseModel):
    playerId: str
    guess: str
    
class Player(BaseModel):
    playerId: str
    score: int
    
    
def convert_decimal(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    if isinstance(obj, list):
        return [convert_decimal(i) for i in obj]
    if isinstance(obj, dict):
        return {k: convert_decimal(v) for k, v in obj.items()}
    return obj

@app.get("/")
def read_root():
    return {"message": "Welcome to the Emoji Decoder Game API"}

@app.get("/puzzle")
def get_puzzle():
    try:
        response = puzzles_table.scan()
        puzzles = response.get('Items', [])
        if not puzzles:
            raise HTTPException(status_code=404, detail="No puzzles found")
        puzzle = random.choice(puzzles)
        return {"puzzleId": puzzle['PuzzleID'], "emojis": puzzle['Emojis']}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/score/{player_id}")
def get_player_score(player_id: str):
    try:
        response = scores_table.get_item(Key={"PlayerID": player_id})
        if "Item" not in response:
            raise HTTPException(status_code=404, detail="Player not found")
        player_data = response["Item"]
        return {"score": convert_decimal(player_data.get("Score", 0))}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/player/{player_id}")
def get_player(player_id: str):
    try:
        response = scores_table.get_item(Key={"PlayerID": player_id})
        
        if "Item" not in response:
            raise HTTPException(status_code=404, detail="Player not found")

        player_data = response["Item"]
        return {"playerId": player_data["PlayerID"], "score": player_data.get("Score", 0)}

    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"DynamoDB Error: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected Error: {str(e)}")

    
@app.post("/player")
def create_player(player: Player):
    try:
        scores_table.put_item(Item={"PlayerID": player.playerId, "Score": player.score})
        return {"message": "Player created successfully"}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/guess")
def submit_guess(guess: GuessRequest):
    try:
        # Fetch the puzzle
        response = puzzles_table.scan()
        puzzles = response.get('Items', [])
        puzzle = next((p for p in puzzles if p['Phrase'].lower() == guess.guess.lower()), None)

        if not puzzle:
            return {"message": "Incorrect guess!", "correct": False}

        # Update player's score
        score_response = scores_table.get_item(Key={'PlayerID': guess.playerId})
        current_score = score_response.get('Item', {}).get('Score', 0)
        new_score = current_score + 10

        scores_table.put_item(Item={'PlayerID': guess.playerId, 'Score': new_score})
        return {"message": "Correct guess!", "newScore": new_score, "correct": True}

    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/leaderboard")
def get_leaderboard():
    try:
        response = scores_table.scan()
        scores = response.get('Items', [])
        sorted_scores = sorted(scores, key=lambda x: x['Score'], reverse=True)
        return sorted_scores
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))
