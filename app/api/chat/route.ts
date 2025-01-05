import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content;

    // Get response from FastAPI backend
    const response = await axios.post('http://localhost:8000/query', { query });
    
    console.log('API Response:', response.data);

    // Format the response based on type
    let formattedContent = '';
    if (response.data.type === 'trip_planning' || response.data.type === 'flights' || response.data.type === 'hotels') {
      const results = response.data.results.map((result: any) => 
        `📍 ${result.content}\nSource: ${result.url}\n-------------------`
      ).join('\n\n');
      
      formattedContent = `Here's what I found about your query:\n\n${results}`;
    } else {
      formattedContent = response.data.results;
    }

    // Return formatted response
    return new Response(
      JSON.stringify({ content: formattedContent }), 
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        content: "Sorry, I encountered an error processing your request. Please try again."
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

