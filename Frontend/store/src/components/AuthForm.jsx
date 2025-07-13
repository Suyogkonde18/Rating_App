import React, { useState } from 'react';
import { login, register } from '../api';
import { useNavigate } from 'react-router-dom';

function AuthForm({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin ? await login(form) : await register(form);
      if (res.token) {
        setUser({ ...res.user, token: res.token });
        navigate('/dashboard'); // ✅ Go to dashboard after login or register
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              required
              minLength={3}
              maxLength={60}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            required
            minLength={8}
            maxLength={16}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Address"
              value={form.address}
              maxLength={400}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-sm text-blue-500 hover:underline"
        >
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
