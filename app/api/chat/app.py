# app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from langchain_community.llms import HuggingFaceHub
from langchain_community.tools import TavilySearchResults
import asyncio
from functools import partial

app = FastAPI()
load_dotenv(dotenv_path=".env.local")

class QueryRequest(BaseModel):
    query: str

# Initialize your tools
flight_search_tool = TavilySearchResults(
    api_key=os.getenv("TAVILY_API_KEY"),
    max_results=5,
    k=5,
    include_domains=["kayak.com", "skyscanner.com", "expedia.com"],
)

hotel_search_tool = TavilySearchResults(
    api_key=os.getenv("TAVILY_API_KEY"),
    max_results=5,
    k=5,
    include_domains=["booking.com", "hotels.com", "expedia.com"],
)

trip_planning_tool = TavilySearchResults(
    api_key=os.getenv("TAVILY_API_KEY"),
    max_results=8,
    k=8,
    include_domains=["tripadvisor.com", "lonelyplanet.com"],
)

# Initialize HuggingFace with Mistral-7B-Instruct
llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.1",
    huggingfacehub_api_token=os.getenv("HUGGINGFACE_API_KEY"),
    model_kwargs={
        "temperature": 0.7,
        "max_length": 1000,
        "max_new_tokens": 1000,
    }
)

# Define your endpoint
@app.post("/query")
async def query_agent(request: QueryRequest):
    try:
        if "flights" in request.query.lower():
            results = await asyncio.to_thread(flight_search_tool.invoke, request.query)
            return {"type": "flights", "results": results}

        elif "hotels" in request.query.lower():
            results = await asyncio.to_thread(hotel_search_tool.invoke, request.query)
            return {"type": "hotels", "results": results}

        elif "plan" in request.query.lower() or "itinerary" in request.query.lower():
            results = await asyncio.to_thread(trip_planning_tool.invoke, request.query)
            return {"type": "trip_planning", "results": results}

        else:
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None, 
                partial(llm.invoke, request.query)
            )
            response_text = str(response)
            return {"type": "llm_response", "results": response_text}

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))