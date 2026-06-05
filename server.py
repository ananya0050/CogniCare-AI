# from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from dotenv import load_dotenv
# from starlette.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient
# import os
# import logging
# from pathlib import Path
# from pydantic import BaseModel, Field, ConfigDict, EmailStr
# from typing import List, Optional, Dict
# import uuid
# from datetime import datetime, timezone, timedelta
# from passlib.context import CryptContext
# import jwt
# import asyncio
# import time
# from contextlib import asynccontextmanager
# from motor.motor_asyncio import AsyncIOMotorClient
# # Load environment variables
# ROOT_DIR = Path(__file__).parent
# load_dotenv(ROOT_DIR / '.env')

# # MongoDB connection
# mongo_url = os.environ['MONGO_URL']
# #client = AsyncIOMotorClient(mongo_url)
# #db = client[os.environ['DB_NAME']]

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # JWT settings
# JWT_SECRET = os.environ.get('JWT_SECRET') # 'your-secret-key')
# JWT_ALGORITHM = "HS256"
# JWT_EXPIRATION_HOURS = 24

# # Security
# security = HTTPBearer()

# # Define the lifespan handler
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Runs on startup
#     print("Connecting to MongoDB...")
#     global client
#     global db
#     client = AsyncIOMotorClient(mongo_url)
#     db = client[os.environ['DB_NAME']]
#     print("Connected to MongoDB!")
#     yield  # Application can now receive requests
#     # Runs on shutdown
#     print("Disconnecting from MongoDB...")
#     client.close()
#     print("Disconnected from MongoDB!") 
# # Create the main app without a prefix
# app = FastAPI(lifespan=lifespan)

# # Create a router with the /api prefix
# api_router = APIRouter(prefix="/api")

# # ============= Models =============

# class UserCreate(BaseModel):
#     email: EmailStr
#     password: str
#     name: str
#     role: str  # "patient" or "clinician"

# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str

# class User(BaseModel):
#     model_config = ConfigDict(extra="ignore")
#     id: str
#     email: str
#     name: str
#     role: str

# class ChatMessageCreate(BaseModel):
#     message: str

# class ChatMessageResponse(BaseModel):
#     message_id: str
#     user_message: str
#     ai_response: str
#     response_time: float
#     sentiment: str
#     cognitive_load_score: float
#     timestamp: str
#     adapted_response: bool = False

# class DailyMetrics(BaseModel):
#     date: str
#     avg_response_time: float
#     interaction_efficiency_score: float
#     avg_sentiment_score: float
#     message_count: int

# class HeatmapData(BaseModel):
#     date: str
#     hour: int
#     cognitive_load: float
#     interaction_count: int

# class CorrelationData(BaseModel):
#     date: str
#     avg_sentiment: float
#     avg_response_time: float

# class MockLlmChat:
#     #A local class to simulate an AI chat response without using external APIs.
#     def __init__(self, system_message: str,  history: list = None):
#         self.system_message = system_message
#         self.history = history if history is not None else []
#     async def send_message(self, user_message: str) -> str:
        
#         #Simulates an asynchronous AI response with a short delay.
#         await asyncio.sleep(0.5)
#         # Check if the user has repeatedly expressed negative sentiment recently
#         recent_messages = [msg.lower() for msg in self.history[-3:]] # Look at last 3 messages
#         recent_stress = any("stress" in m or "anxious" in m for m in recent_messages)
#         if recent_stress and ("stress" in user_message.lower() or "anxious" in user_message.lower()):
#             # Specific response for repeated negative input
#             response = "It sounds like you are really going through a tough time right now. I'm here to listen, please tell me more about how you're feeling." 
#         # Determine a mock response based on the user's input or system prompt
#         elif "stress" in user_message.lower() or "anxious" in user_message.lower():
#             response = "I hear you. Taking a few deep breaths can sometimes help when you're feeling stressed. Remember, you're not alone in this."
#         elif "happy" in user_message.lower():
#             response = "That's wonderful to hear! I'm glad things are going well."
#         elif "simple" in self.system_message.lower():
#             # If the system prompt was adapted for cognitive load
#             response = "Okay. Remember to breathe. Focus on simple things. You are doing great."
#         else:
#             response = "Thank you for sharing that with me. I'm here to support you with any thoughts or feelings you'd like to discuss."
   
#         return response

# # ============= Helper Functions =============

# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)
# # Package user info in a JWT ,sets expiry and returns a signed token
# def create_access_token(data: dict) -> str:
#     to_encode = data.copy()
#     expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
# # Decodes JWT to find the user's id and fetches user info from DB
# async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     try:
#         token = credentials.credentials
#         payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
#         user_id = payload.get("user_id")
#         if user_id is None:
#             raise HTTPException(status_code=401, detail="Invalid token")
        
#         user = await db.users.find_one({"id": user_id}, {"_id": 0})
#         if user is None:
#             raise HTTPException(status_code=401, detail="User not found")
#         return User(**user)
#     except jwt.ExpiredSignatureError:
#         raise HTTPException(status_code=401, detail="Token expired")
#     except jwt.InvalidTokenError:
#         raise HTTPException(status_code=401, detail="Invalid token")

# async def analyze_sentiment_and_cognitive_load(message: str, response_time: float) -> tuple:
#     """
#     Analyze sentiment and calculate cognitive load score using local simulation.
#     """
#     # Use simple local simulation
#     if any(word in message.lower() for word in ["happy", "good", "great", "well","awesome"]):
#         sentiment = "positive"
#     elif any(word in message.lower() for word in ["bad", "sad", "worry", "anxious", "stress","sick"]):
#         sentiment = "negative"
#     else:
#         sentiment = "neutral"
    
#     # Calculate simulated cognitive load score
#     time_factor = min(response_time / 10, 1.0)
#     length_factor = 1.0 - min(len(message) / 200, 1.0) 
#     sentiment_factor = 0.7 if sentiment == "negative" else (0.3 if sentiment == "neutral" else 0.1)
    
#     cognitive_load_score = (time_factor * 0.4 + length_factor * 0.3 + sentiment_factor * 0.3) * 10
    
#     return sentiment, round(cognitive_load_score, 2)

# # ============= Routes =============

# @api_router.get("/")
# async def root():
#     return {"message": "CogniCare AI API"}

# # Authentication Routes
# @api_router.post("/auth/register")
# async def register(user_data: UserCreate):
#     # Check if user exists
#     existing_user = await db.users.find_one({"email": user_data.email})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
    
#     # Create user
#     user_id = str(uuid.uuid4())
#     hashed_pw = hash_password(user_data.password)
    
#     user_doc = {
#         "id": user_id,
#         "email": user_data.email,
#         "password": hashed_pw,
#         "name": user_data.name,
#         "role": user_data.role,
#         "created_at": datetime.now(timezone.utc).isoformat()
#     }
    
#     await db.users.insert_one(user_doc)
    
#     token = create_access_token({"user_id": user_id})
    
#     return {
#         "token": token,
#         "user": {
#             "id": user_id,
#             "email": user_data.email,
#             "name": user_data.name,
#             "role": user_data.role
#         }
#     }

# @api_router.post("/auth/login")
# async def login(credentials: UserLogin):
#     user = await db.users.find_one({"email": credentials.email})
#     if not user or not verify_password(credentials.password, user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     token = create_access_token({"user_id": user["id"]})
    
#     return {
#         "token": token,
#         "user": {
#             "id": user["id"],
#             "email": user["email"],
#             "name": user["name"],
#             "role": user["role"]
#         }
#     }

# # Chat Routes
# @api_router.post("/chat/send")
# async def send_message(
#     msg_data: ChatMessageCreate,
#     current_user: User = Depends(get_current_user)
# ):
#     start_time = time.time()

#     # Retrieve previous user messages from the database
#     previous_messages_docs = await db.chat_messages.find(
#         {"user_id": current_user.id}
#     ).sort("timestamp", 1).to_list(10) # Fetch last 10 messages
    
#     # Extract just the user messages into a list for the mock AI
#     user_history = [doc["user_message"] for doc in previous_messages_docs]
    
#     # Analyze sentiment and cognitive load
#     sentiment, cognitive_load_score = await analyze_sentiment_and_cognitive_load(
#         msg_data.message, 0  #Initial call with 0 response
#     )
    
#     # Determine if we need to adapt response (high cognitive load)
#     adapted_response = cognitive_load_score > 6.5
    
#     # Configure chatbot based on cognitive load
#     if adapted_response:
#         system_message = "You are a supportive mental health assistant. The user is experiencing high cognitive load. Provide simple, clear, and compassionate responses. Use short sentences and offer reassurance."
#     else:
#         system_message = "You are CogniCare AI, a helpful mental health support assistant. Provide thoughtful and empathetic responses to help users with their cognitive well-being."
#     # Get AI response using MOCK AI class    
#     try:
#         # Use local Mock class instead of an external library
#         chat = MockLlmChat(system_message=system_message)
#         ai_response = await chat.send_message(msg_data.message)
#         end_time = time.time()
#         response_time = round(end_time - start_time, 2)
#         # Recalculate cognitive load with actual response time
#         sentiment, cognitive_load_score = await analyze_sentiment_and_cognitive_load(
#             msg_data.message, response_time
#         )
        
#         # Save to database
#         message_id = str(uuid.uuid4())
#         chat_doc = {
#             "id": message_id,
#             "user_id": current_user.id,
#             "user_message": msg_data.message,
#             "ai_response": ai_response,
#             "response_time": response_time,
#             "sentiment": sentiment,
#             "cognitive_load_score": cognitive_load_score,
#             "timestamp": datetime.now(timezone.utc).isoformat(),
#             "adapted_response": adapted_response
#         }
        
#         await db.chat_messages.insert_one(chat_doc)
        
#         return ChatMessageResponse(
#             message_id=message_id,
#             user_message=msg_data.message,
#             ai_response=ai_response,
#             response_time=response_time,
#             sentiment=sentiment,
#             cognitive_load_score=cognitive_load_score,
#             timestamp=chat_doc["timestamp"],
#             adapted_response=adapted_response
#         )
#     except Exception as e:
#         logging.error(f"Error sending message: {e}")
#         raise HTTPException(status_code=500, detail=f"Error processing message: {str(e)}")

# @api_router.get("/chat/history")
# async def get_chat_history(
#     current_user: User = Depends(get_current_user),
#     limit: int = 50
# ):
#     messages = await db.chat_messages.find(
#         {"user_id": current_user.id},
#         {"_id": 0}
#     ).sort("timestamp", -1).limit(limit).to_list(limit)
    
#     return messages

# # Metrics Routes
# @api_router.get("/metrics/daily")
# async def get_daily_metrics(
#     days: int = 30,
#     current_user: User = Depends(get_current_user),
#     patient_id: Optional[str] = None
# ):
#     # If clinician and patient_id provided, get that patient's data
#     target_user_id = patient_id if (current_user.role == "clinician" and patient_id) else current_user.id
    
#     # Get messages from last N days
#     start_date = datetime.now(timezone.utc) - timedelta(days=days)
    
#     messages = await db.chat_messages.find(
#         {"user_id": target_user_id},
#         {"_id": 0}
#     ).to_list(10000)
    
#     # Group by date
#     daily_data = {}
#     for msg in messages:
#         msg_date = datetime.fromisoformat(msg["timestamp"]).date()
#         date_str = msg_date.isoformat()
        
#         if date_str not in daily_data:
#             daily_data[date_str] = {
#                 "response_times": [],
#                 "cognitive_loads": [],
#                 "sentiments": [],
#                 "message_count": 0
#             }
        
#         daily_data[date_str]["response_times"].append(msg["response_time"])
#         daily_data[date_str]["cognitive_loads"].append(msg["cognitive_load_score"])
        
#         # Convert sentiment to score
#         sentiment_score = 1.0 if msg["sentiment"] == "positive" else (-1.0 if msg["sentiment"] == "negative" else 0.0)
#         daily_data[date_str]["sentiments"].append(sentiment_score)
#         daily_data[date_str]["message_count"] += 1
    
#     # Calculate metrics
#     metrics = []
#     for date_str, data in daily_data.items():
#         avg_response_time = sum(data["response_times"]) / len(data["response_times"])
#         avg_cognitive_load = sum(data["cognitive_loads"]) / len(data["cognitive_loads"])
#         avg_sentiment = sum(data["sentiments"]) / len(data["sentiments"])
        
#         # Calculate interaction efficiency score
#         # Higher is better: fast responses, low cognitive load, positive sentiment
#         efficiency_score = max(0, 100 - (avg_response_time * 5) - (avg_cognitive_load * 5) + (avg_sentiment * 10))
        
#         metrics.append(DailyMetrics(
#             date=date_str,
#             avg_response_time=round(avg_response_time, 2),
#             interaction_efficiency_score=round(efficiency_score, 2),
#             avg_sentiment_score=round(avg_sentiment, 2),
#             message_count=data["message_count"]
#         ))
    
#     return sorted(metrics, key=lambda x: x.date)

# @api_router.get("/metrics/heatmap")
# async def get_heatmap_data(
#     days: int = 30,
#     current_user: User = Depends(get_current_user),
#     patient_id: Optional[str] = None
# ):
#     target_user_id = patient_id if (current_user.role == "clinician" and patient_id) else current_user.id
    
#     start_date = datetime.now(timezone.utc) - timedelta(days=days)
    
#     messages = await db.chat_messages.find(
#         {"user_id": target_user_id},
#         {"_id": 0}
#     ).to_list(10000)
    
#     # Group by date and hour
#     heatmap_data = {}
#     for msg in messages:
#         msg_dt = datetime.fromisoformat(msg["timestamp"])
#         date_str = msg_dt.date().isoformat()
#         hour = msg_dt.hour
        
#         key = f"{date_str}_{hour}"
#         if key not in heatmap_data:
#             heatmap_data[key] = {
#                 "date": date_str,
#                 "hour": hour,
#                 "cognitive_loads": [],
#                 "count": 0
#             }
        
#         heatmap_data[key]["cognitive_loads"].append(msg["cognitive_load_score"])
#         heatmap_data[key]["count"] += 1
    
#     result = []
#     for key, data in heatmap_data.items():
#         avg_load = sum(data["cognitive_loads"]) / len(data["cognitive_loads"])
#         result.append(HeatmapData(
#             date=data["date"],
#             hour=data["hour"],
#             cognitive_load=round(avg_load, 2),
#             interaction_count=data["count"]
#         ))
    
#     return result

# @api_router.get("/metrics/correlation")
# async def get_correlation_data(
#     days: int = 30,
#     current_user: User = Depends(get_current_user),
#     patient_id: Optional[str] = None
# ):
#     target_user_id = patient_id if (current_user.role == "clinician" and patient_id) else current_user.id
    
#     start_date = datetime.now(timezone.utc) - timedelta(days=days)
    
#     messages = await db.chat_messages.find(
#         {"user_id": target_user_id},
#         {"_id": 0}
#     ).to_list(10000)
    
#     # Group by date
#     daily_data = {}
#     for msg in messages:
#         date_str = datetime.fromisoformat(msg["timestamp"]).date().isoformat()
        
#         if date_str not in daily_data:
#             daily_data[date_str] = {
#                 "response_times": [],
#                 "sentiments": []
#             }
        
#         daily_data[date_str]["response_times"].append(msg["response_time"])
        
#         sentiment_score = 1.0 if msg["sentiment"] == "positive" else (-1.0 if msg["sentiment"] == "negative" else 0.0)
#         daily_data[date_str]["sentiments"].append(sentiment_score)
    
#     result = []
#     for date_str, data in daily_data.items():
#         avg_sentiment = sum(data["sentiments"]) / len(data["sentiments"])
#         avg_response_time = sum(data["response_times"]) / len(data["response_times"])
        
#         result.append(CorrelationData(
#             date=date_str,
#             avg_sentiment=round(avg_sentiment, 2),
#             avg_response_time=round(avg_response_time, 2)
#         ))
    
#     return sorted(result, key=lambda x: x.date)

# # Clinician Routes
# @api_router.get("/clinician/patients")
# async def get_patients(current_user: User = Depends(get_current_user)):
#     if current_user.role != "clinician":
#         raise HTTPException(status_code=403, detail="Only clinicians can access this endpoint")
    
#     patients = await db.users.find(
#         {"role": "patient"},
#         {"_id": 0, "password": 0}
#     ).to_list(1000)
    
#     return patients

# # Include the router in the main app
# app.include_router(api_router)

# app.add_middleware(
#     CORSMiddleware,
#     allow_credentials=True,
#     allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Configure logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
# )
# logger = logging.getLogger(__name__)

# #@app.on_event("shutdown")
# #async def shutdown_db_client():
#  #   client.close()
# @asynccontextmanager
# async def lifespan(app):
#     yield
#     client.close()

from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid
import asyncio
import time
import jwt
from datetime import datetime, timezone, timedelta
from pathlib import Path
from pydantic import BaseModel, ConfigDict, EmailStr
from passlib.context import CryptContext
from contextlib import asynccontextmanager
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB Config
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'cognicare_db')

# Password hashing & JWT
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = os.environ.get('JWT_SECRET', 'fallback-secret-key')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24
security = HTTPBearer()

# --- Global Database Variables ---
client: AsyncIOMotorClient = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    print("Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    print(f"Connected to Database: {DB_NAME}")
    yield
    print("Disconnecting from MongoDB...")
    client.close()

# --- Models ---

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str  # "patient" or "clinician"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    name: str
    role: str

class ChatMessageCreate(BaseModel):
    message: str

class ChatMessageResponse(BaseModel):
    message_id: str
    user_message: str
    ai_response: str
    response_time: float
    sentiment: str
    cognitive_load_score: float
    timestamp: str
    adapted_response: bool = False

# --- Mock AI Chat Logic ---

class MockLlmChat:
    def __init__(self, system_message: str, history: list = None):
        self.system_message = system_message
        self.history = history if history is not None else []

    async def send_message(self, user_message: str) -> str:
        await asyncio.sleep(0.6)  # Simulate thinking
        msg = user_message.lower()

        if any(w in msg for w in ["tired", "exhausted", "sleepy","die" ,"no friends","depression","no energy"]):
            return "It sounds like you're really drained today. Resting a bit might help you feel better."
        elif any(w in msg for w in ["stress", "anxious", "worry","alone" ,"panic"]):
            return "I hear you. It's okay to feel this way — let's take it one step at a time."
        elif "not" in msg and any(w in msg for w in ["good", "great", "happy", "well"]):
            return "Ohh, it's fine — sometimes we don't feel our best. You will feel better soon."
        elif any(w in msg for w in ["happy", "good", "great", "well"]):
            return "That's nice to hear. I'm here to share this moment with you."
        elif "simple" in self.system_message.lower():
            return "I understand. Let's keep it simple. Take a deep breath. You are doing okay."
        else:
            return "Thank you for sharing. It's okay to feel this way — I'm here with you."

# --- Helpers ---

def hash_password(password: str): 
    return pwd_context.hash(password)

def verify_password(plain, hashed): 
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return User(**user)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# --- Sentiment & Cognitive Load ---

analyzer = SentimentIntensityAnalyzer()

async def analyze_metrics(message: str, response_time: float):
    scores = analyzer.polarity_scores(message)
    compound = scores['compound']

    if compound >= 0.05:
        sentiment = "positive"
    elif compound <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    time_factor = min(response_time / 10, 1.0)
    length_factor = 1.0 - min(len(message) / 200, 1.0)
    sentiment_factor = 0.7 if sentiment == "negative" else 0.3
    score = (time_factor * 0.4 + length_factor * 0.3 + sentiment_factor * 0.3) * 10

    return sentiment, round(score, 2)

# --- Routes ---

app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

# --- NEW Welcome Endpoint ---
@api_router.get("/chat/welcome")
async def welcome_message():
    return {
        "message_id": str(uuid.uuid4()),
        "user_message": "",
        "ai_response": "Hi, it’s good to see you — let’s talk about how you’re feeling today.",
        "response_time": 0.0,
        "sentiment": "neutral",
        "cognitive_load_score": 0.0,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "adapted_response": False
    }

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    if await db.users.find_one({"email": user_data.email}):
        raise HTTPException(status_code=400, detail="Email exists")
    
    user_id = str(uuid.uuid4())
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "name": user_data.name,
        "role": user_data.role,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user_doc)
    return {"token": create_access_token({"user_id": user_id}), "user": {"id": user_id, "name": user_data.name}}

@api_router.post("/auth/login")
async def login(creds: UserLogin):
    user = await db.users.find_one({"email": creds.email})
    if not user or not verify_password(creds.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_access_token({"user_id": user["id"]}), "user": {"id": user["id"], "name": user["name"]}}

@api_router.post("/chat/send")
async def send_message(msg_data: ChatMessageCreate, current_user: User = Depends(get_current_user)):
    start_time = time.time()
    sentiment, load_score = await analyze_metrics(msg_data.message, 0)
    adapted = load_score > 6.5
    sys_msg = "Simple, short, clear responses." if adapted else "Thoughtful, empathetic mental health assistant."
    chat = MockLlmChat(system_message=sys_msg)
    ai_response = await chat.send_message(msg_data.message)
    response_time = round(time.time() - start_time, 2)
    sentiment, load_score = await analyze_metrics(msg_data.message, response_time)

    # Save user message
    await db.chat_messages.insert_one({
        "message_id": str(uuid.uuid4()),
        "user_message": msg_data.message,
        "sender": "user",
        "sentiment": sentiment,
        "cognitive_load_score": load_score,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "user_id": current_user.id
    })

    # Save AI response
    await db.chat_messages.insert_one({
        "message_id": str(uuid.uuid4()),
        "ai_response": ai_response,
        "sender": "ai",
        "sentiment": sentiment,
        "cognitive_load_score": load_score,
        "response_time": response_time,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "adapted_response": adapted,
        "user_id": current_user.id
    })

    return {
        "user_message": msg_data.message,
        "ai_response": ai_response,
        "response_time": response_time,
        "sentiment": sentiment,
        "cognitive_load_score": load_score,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "adapted_response": adapted
    }

@api_router.get("/chat/history")
async def get_history(current_user: User = Depends(get_current_user)):
    messages = await db.chat_messages.find({"user_id": current_user.id}, {"_id": 0}).sort("timestamp", -1).to_list(50)
    return messages

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr, ConfigDict
from passlib.context import CryptContext
from contextlib import asynccontextmanager
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

import os, uuid, asyncio, time, jwt, random
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ---------- ENV ----------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "cognicare_db")

JWT_SECRET = os.getenv("JWT_SECRET", "secret")
JWT_ALGO = "HS256"
JWT_EXP_HOURS = 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

client = None
db = None

# ---------- LIFESPAN ----------
@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    print("MongoDB Connected ✅")
    yield
    client.close()

# ---------- APP ----------
app = FastAPI(lifespan=lifespan)
router = APIRouter(prefix="/api")

# ---------- MODELS ----------
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    name: str
    role: str

class ChatMessageCreate(BaseModel):
    message: str

# ---------- CHAT AI ----------
class MockLlmChat:
    async def send_message(self, msg: str):
        await asyncio.sleep(0.4)
        msg = msg.lower()

        # 🚨 SELF-HARM (HIGHEST PRIORITY)
        if any(p in msg for p in [
            "i want to die","kill myself","suicide","end my life"
        ]):
            return random.choice([
                "I'm really sorry you're feeling this way. You don’t have to go through this alone. Can you reach out to someone you trust?",
                "It sounds like you're in pain. I'm here with you. Talking to someone close or a helpline can help.",
                "You matter more than you think. Please consider speaking to someone you trust. I'm here for you."
            ])

        # 😔 LONELINESS
        elif any(p in msg for p in [
            "no friends","i am alone","lonely","no one","isolated"
        ]):
            return random.choice([
                "That sounds really lonely… I’m here with you. Want to talk more?",
                "Feeling alone can be really hard. You’re not alone right now.",
                "I understand… that must feel heavy. Tell me more."
            ])

        # ❤️ GRATITUDE (FIXED)
        elif any(p in msg for p in [
            "thank you","thanks","thanks a lot","appreciate","grateful"
        ]):
            return random.choice([
                "You're always welcome 😊 I'm here for you anytime.",
                "I'm really glad I could help. You can talk to me whenever you need.",
                "That means a lot. I'm here with you anytime you want to talk.",
                "You're not alone — I'm always here to listen."
            ])

        # 👋 GREETING
        elif any(w in msg for w in ["hi","hello","hey"]):
            return random.choice([
                "Hey 😊 How are you feeling today?",
                "Hello! I'm here to listen.",
                "Hi there! Tell me how your day is going."
            ])

        # 😔 SAD / DEPRESSED
        elif any(w in msg for w in ["sad","depressed","low"]):
            return random.choice([
                "I’m really sorry you're feeling this way. Want to share?",
                "That sounds tough. I'm here with you.",
                "You don’t have to go through this alone."
            ])

        # 😰 STRESS
        elif any(w in msg for w in ["stress","anxious","panic"]):
            return random.choice([
                "That sounds stressful. Let’s take it step by step.",
                "I understand. What’s worrying you most?"
            ])

        # 😴 TIRED
        elif any(w in msg for w in ["tired","exhausted","burnt out"]):
            return random.choice([
                "You sound exhausted. Have you been resting enough?",
                "Maybe your body needs a break."
            ])

        # 📚 STUDY
        elif any(w in msg for w in ["exam","study"]):
            return random.choice([
                "Exams can be stressful. What subject are you working on?",
                "Let’s break it into small steps."
            ])

        # 💼 WORK
        elif any(w in msg for w in ["work","job","boss"]):
            return random.choice([
                "Work stress can be tough. What’s going on?",
                "That sounds frustrating. Want to talk about it?"
            ])

        # ❤️ RELATIONSHIP
        elif any(w in msg for w in ["breakup","relationship","love"]):
            return random.choice([
                "Relationships can be complicated. I'm here for you.",
                "That must hurt. Want to share what happened?"
            ])

        # 😡 ANGER
        elif any(w in msg for w in ["angry","frustrated"]):
            return random.choice([
                "It’s okay to feel angry. What happened?",
                "Let’s slow down and talk through it."
            ])

        # 😨 FEAR
        elif any(w in msg for w in ["scared","afraid"]):
            return random.choice([
                "That sounds scary. I'm here with you.",
                "Do you want to talk about what’s causing that fear?"
            ])

        # 🤔 CONFUSED
        elif any(w in msg for w in ["confused","lost"]):
            return random.choice([
                "It’s okay to feel lost sometimes. Let’s figure it out together.",
                "What’s confusing you right now?"
            ])

        # ❓ ADVICE
        elif any(p in msg for p in ["what should i do","help me","advice"]):
            return random.choice([
                "Let’s take it step by step. What’s bothering you most?",
                "I’m here to help. Tell me more."
            ])

        # 😊 HAPPY
        elif any(w in msg for w in ["happy","good","great"]):
            return random.choice([
                "That’s great 😊 What made you feel that way?",
                "I’m glad to hear that!"
            ])

        # DEFAULT
        else:
            return random.choice([
                "I’m listening. Tell me more.",
                "I’m here with you. Go on.",
                "How did that make you feel?"
            ])

# ---------- HELPERS ----------
def hash_password(p): return pwd_context.hash(p)
def verify_password(p,h): return pwd_context.verify(p,h)

def create_token(data):
    data["exp"] = datetime.now(timezone.utc) + timedelta(hours=JWT_EXP_HOURS)
    return jwt.encode(data, JWT_SECRET, algorithm=JWT_ALGO)

async def get_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGO])
        user = await db.users.find_one({"id": payload["user_id"]}, {"_id":0})
        return User(**user)
    except:
        raise HTTPException(401, "Invalid token")

# ---------- SENTIMENT ----------
analyzer = SentimentIntensityAnalyzer()

async def analyze(msg, t):
    score = analyzer.polarity_scores(msg)["compound"]
    sentiment = "positive" if score > 0.05 else "negative" if score < -0.05 else "neutral"

    load = (
        min(t/10,1)*0.4 +
        (1 - min(len(msg)/200,1))*0.3 +
        (0.7 if sentiment=="negative" else 0.3)*0.3
    ) * 10

    return sentiment, round(load,2)

# ---------- ROUTES ----------
@router.get("/")
async def root():
    return {"msg":"CogniCare Running 🚀"}

@router.get("/chat/welcome")
async def welcome():
    return {
        "ai_response":"Hi, it’s good to see you — let’s talk about how you’re feeling today."
    }

@router.post("/auth/register")
async def register(u: UserCreate):
    if await db.users.find_one({"email":u.email}):
        raise HTTPException(400,"Email exists")
    uid = str(uuid.uuid4())
    await db.users.insert_one({
        "id":uid,
        "email":u.email,
        "password":hash_password(u.password),
        "name":u.name,
        "role":u.role
    })
    return {"token":create_token({"user_id":uid})}

@router.post("/auth/login")
async def login(u: UserLogin):
    user = await db.users.find_one({"email":u.email})
    if not user or not verify_password(u.password,user["password"]):
        raise HTTPException(401,"Invalid credentials")
    return {"token":create_token({"user_id":user["id"]})}

@router.post("/chat/send")
async def chat(msg: ChatMessageCreate, user: User = Depends(get_user)):
    start = time.time()

    bot = MockLlmChat()
    reply = await bot.send_message(msg.message)

    t = round(time.time()-start,2)
    sentiment, load = await analyze(msg.message,t)

    await db.chat_messages.insert_one({
        "user_id":user.id,
        "user_message":msg.message,
        "ai_response":reply,
        "sentiment":sentiment,
        "cognitive_load_score":load,
        "response_time":t,
        "timestamp":datetime.now(timezone.utc).isoformat()
    })

    return {
        "user_message":msg.message,
        "ai_response":reply,
        "sentiment":sentiment,
        "cognitive_load_score":load,
        "response_time":t
    }

@router.get("/chat/history")
async def history(user: User = Depends(get_user)):
    return await db.chat_messages.find(
        {"user_id":user.id},{"_id":0}
    ).sort("timestamp",-1).to_list(50)

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
