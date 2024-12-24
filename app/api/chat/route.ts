import axios from 'axios'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content;

    const response = await axios.post('http://localhost:8000/query', { query });
    
    console.log('API Response:', response.data);

    return new Response(JSON.stringify({
      id: Date.now().toString(),
      role: "assistant",
      content: typeof response.data.results === 'string' 
        ? response.data.results 
        : JSON.stringify(response.data.results)
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      id: Date.now().toString(),
      role: "assistant",
      content: "I apologize, but I encountered an error processing your request. Please try again."
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

