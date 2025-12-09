export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Problem {
  problemId: number;
  title: string;
  description: string;
  difficulty: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  username: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  username: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetail extends Post {
  author: {
    id: number;
    username: string;
  } | null;
  comments: Comment[];
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface ApiError {
  error: string;
}

