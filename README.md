# AI Travel Agent

An interactive AI-powered travel planning assistant that helps users plan their trips by providing destination information, travel recommendations, and itinerary suggestions.

## Features

- Real-time chat interface with AI travel agent
- Destination search and recommendations
- Flight and hotel information
- Trip planning assistance
- Travel preferences customization

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python
- **AI**: Mistral-7B-Instruct via Hugging Face
- **APIs**: Tavily Search API for travel information

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- Hugging Face API key
- Tavily API key

### Environment Setup

1. Create a `.env.local` file in the root directory:
```env
HUGGINGFACE_API_KEY=your_huggingface_key_here
TAVILY_API_KEY=your_tavily_key_here
```

### Backend Setup

1. Navigate to the API directory:
```bash
cd app/api/chat
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Type your travel-related questions in the chat interface
2. Set travel preferences using the preferences dialog
3. Browse featured destinations
4. Receive personalized travel recommendations and information

## Project Structure

```
ai-travel-agent/
├── app/
│   ├── api/
│   │   └── chat/
│   │       ├── main.py
│   │       └── route.ts
│   └── page.tsx
├── components/
│   └── travel-agent-chat.tsx
├── public/
└── styles/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
