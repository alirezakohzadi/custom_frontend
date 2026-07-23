import React, { useState } from 'react';
import { loginuser } from '../../services/api';
import { useLoginOrIsLogin } from '../../context/LoginOrIsLogin';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // برای مدیریت حالت بارگذاری
    const { setIslogin } = useLoginOrIsLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');  // پاک کردن خطای قبلی هنگام تلاش مجدد
        setIsLoading(true);  // فعال کردن بارگذاری

        const response = await loginuser(username, password);
        
        setIsLoading(false);  // غیرفعال کردن بارگذاری

        if (response.error) {
            setLoginError(response.error);  // نمایش خطای مناسب
        } else {
            setIslogin(true);
            navigate('/');  // هدایت به صفحه اصلی در صورت ورود موفق
        }
    };

    return (
        <div className=" min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">ورود</h2>

                {/* نمایش خطا در صورت بروز */}
                {loginError && <p className="text-red-600 text-center mb-4">{loginError}</p>}

                {/* فرم ورود */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">نام کاربری</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="نام کاربری"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">رمز عبور</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="رمز عبور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* دکمه ورود */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        disabled={isLoading} // غیرفعال کردن دکمه در حالت بارگذاری
                    >
                        {isLoading ? 'در حال ورود...' : 'ورود'}
                    </button>
                </form>

                {/* دکمه برای هدایت به صفحه ثبت‌نام */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                        حساب کاربری ندارید؟ ثبت‌نام کنید
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
