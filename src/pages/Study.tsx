import { useState } from 'react';

function Study() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    console.log('Asking:', question);
    setLoading(true);
    // Mock response for now
    setTimeout(() => {
      setAnswer(`Mock response to: ${question}`);
      setLoading(false);
    }, 1000);
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