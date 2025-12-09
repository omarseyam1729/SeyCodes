import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ProblemSet from '@/pages/problems/ProblemSet';
import ProblemDetail from '@/pages/problems/ProblemDetail';
import Editor from '@/pages/problems/Editor';
import Discussion from '@/pages/discussion/Discussion';
import NewPost from '@/pages/discussion/NewPost';
import PostDetail from '@/pages/discussion/PostDetail';
import Favorites from '@/pages/discussion/Favorites';
import Arrays from '@/pages/learn/Arrays';
import LinkedLists from '@/pages/learn/LinkedLists';
import Stacks from '@/pages/learn/Stacks';
import Queues from '@/pages/learn/Queues';
import Trees from '@/pages/learn/Trees';
import Graphs from '@/pages/learn/Graphs';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Learning pages */}
              <Route path="/learn/arrays" element={<Arrays />} />
              <Route path="/learn/linkedlists" element={<LinkedLists />} />
              <Route path="/learn/stacks" element={<Stacks />} />
              <Route path="/learn/queues" element={<Queues />} />
              <Route path="/learn/trees" element={<Trees />} />
              <Route path="/learn/graphs" element={<Graphs />} />
              
              {/* Protected routes */}
              <Route
                path="/problems"
                element={
                  <ProtectedRoute>
                    <ProblemSet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems/:problemId"
                element={
                  <ProtectedRoute>
                    <ProblemDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editor"
                element={
                  <ProtectedRoute>
                    <Editor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discussion"
                element={
                  <ProtectedRoute>
                    <Discussion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discussion/new"
                element={
                  <ProtectedRoute>
                    <NewPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discussion/posts/:postId"
                element={
                  <ProtectedRoute>
                    <PostDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discussion/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
