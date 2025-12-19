import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import QuizCard from '../components/QuizCard';
import Button from '../components/Button';
import Card from '../components/Card';

function Profile() {
  const auth = useAuth();
  const [editName, setEditName] = useState(auth.user?.name || '');
  const navigate = useNavigate();

  if (!auth.user) {
    return <div>Please log in to view profile</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, {auth.user.name}</p>
      <p>Email: {auth.user.email}</p>

      <div>
        <h3>Edit Profile</h3>
        <input 
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Your name"
        />
        <button onClick={() => auth.updateProfile({ name: editName })}>
          Update Name
        </button>
      </div>

      <div>
        <h3>My Quizzes</h3>
        {auth.user.quizzes.length === 0 ? (
          <p>No quizzes yet</p>
        ) : (
          <ul>
            {auth.user.quizzes.map(quiz => (
              <li key={quiz.id}>
                {quiz.title} - {quiz.date}
                <button onClick={() => auth.deleteQuiz(quiz.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '32px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '20px' }}>My Created Quizzes</h3>
          <Button onClick={() => navigate('/create-quiz')}>
            Create New Quiz
          </Button>
        </div>
        
        {auth.user?.createdQuizzes?.length === 0 ? (
          <Card>
            <p style={{ 
              color: '#888', 
              textAlign: 'center',
              padding: '24px 0'
            }}>
              You haven't created any quizzes yet. Click "Create New Quiz" to start!
            </p>
          </Card>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '16px'
          }}>
            {auth.user?.createdQuizzes?.map(quiz => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onDelete={auth.deleteCreatedQuiz}
                onTakeQuiz={(id) => navigate(`/take-quiz/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;