import React, { useState } from 'react';
import { registeruser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('پسورد باید حداقل ۸ رقم باشد');
      setTimeout(() => setError(''), 10000);
      return;
    }

    if (password !== password2) {
      setError('پسوردها با هم مطابقت ندارند');
      setTimeout(() => setError(''), 10000);
      return;
    }

    setLoading(true); // شروع بارگذاری

    registeruser(username, password, password2, email)
      .then(() => {
        setLoading(false); // پایان بارگذاری
        navigate('/login');
      })
      .catch((error) => {
        setLoading(false); // پایان بارگذاری در صورت بروز خطا
        setError('خطا در ثبت‌نام. دوباره تلاش کنید.');
        setTimeout(() => setError(''), 10000);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-200">
        <h2 className="text-2xl font-bold text-center mb-6">ثبت‌نام</h2>

        {error && (
          <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">نام کاربری</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="نام کاربری خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">ایمیل</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ایمیل خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">پسورد</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="پسورد خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label htmlFor="password2" className="block text-gray-700">تأیید پسورد</label>
            <input
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="پسورد خود را تأیید کنید"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
