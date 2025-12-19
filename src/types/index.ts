export interface NewQuiz {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Quiz extends NewQuiz {
  id: number;
  date: string;
  userId: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
}

export interface User {
  id: number;
  name: string;
  email: string;
  quizzes: Quiz[];
  createdQuizzes?: Quiz[]; // Quizzes the user has created
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  deleteQuiz: (quizId: number) => void;
  addCreatedQuiz: (quizData: NewQuiz) => void;
  updateQuiz: (quizId: number, updatedQuiz: Partial<Quiz>) => void;
  deleteCreatedQuiz: (quizId: number) => void;
}