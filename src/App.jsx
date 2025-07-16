import { useEffect, useState } from 'react';
import { Header, Footer } from './index';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './Features/Auth/authSlice';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import EditPost from './components/Pages/EditPost';
import Post from './components/Pages/post';
import AddPost from './components/Pages/AddPost';
import AllPosts from './components/Pages/AllPosts';
import { AuthLayout } from './index';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <Header />
        <div className="text-center py-10">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <div className="block md:hidden flex-1 flex justify-center items-center px-4 text-center mt-50%">
        <p className="text-xl font-semibold">
          <marquee>Soon available on mobile</marquee>
          This site is only available on desktop. Please use a larger screen.
        </p>
      </div>

      <div className="hidden md:block flex-1">
        <Header />
        <div className="min-h-[53vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthLayout authentication={true}><Login /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
            <Route path="/all-posts" element={<AuthLayout authentication><AllPosts /></AuthLayout>} />
            <Route path="/add-post" element={<AuthLayout authentication><AddPost /></AuthLayout>} />
            <Route path="/edit-post/:slug" element={<AuthLayout authentication><EditPost /></AuthLayout>} />
            <Route path="/post/:slug" element={<Post />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;