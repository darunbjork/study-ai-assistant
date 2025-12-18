import { useState } from 'react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

function Study() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    
    try {
      const requestBody = {
        contents: [
          {
            parts: [
              { text: `You are a helpful study assistant. Answer this question clearly and concisely: ${question}` }
            ]
          }
        ]
      };

          console.log('GEMINI_API_KEY:', GEMINI_API_KEY ? 'Present' : 'Missing');
          console.log('GEMINI_API_URL:', GEMINI_API_URL);
          console.log('Request Body:', requestBody);
          const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
      
          console.log('Raw API Response:', response); // Log the raw response object
      
          const data = await response.json();
          console.log('Parsed API Data:', data); // Log the parsed JSON data      const aiResponse = data.candidates[0].content.parts[0].text;
      setAnswer(aiResponse);
    } catch (error) {
      console.error('AI Error:', error);
      setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Study with AI</h2>
      <div>
        <textarea 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything about programming, math, or any subject..."
          rows={4}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>
      {answer && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Answer:</h3>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '0.5rem'
          }}>
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default Study;