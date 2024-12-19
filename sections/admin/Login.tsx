import { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        document.title = "Hellavor Admin | Login";
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();  // Prevent form submission reload

        try {
            const response = await axios.post('http://localhost:4000/api/admin/login', {
                username,
                password,
            });

            const { success, message, token } = response.data;

            if (success) {
                // Store JWT token in localStorage
                localStorage.setItem('token', token);
                // Redirect to the admin dashboard
                window.location.href = '/admin/dashboard';
            } else {
                // Display error message
                setErrorMessage(message);
            }
        } catch (error) {
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <section className="relative p-6 bg-gray-100 dark:bg-gray-900">
            <div className="absolute inset-0 primary-bg"></div>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Admin Login</h1>
                <p className="mt-4 text-xl text-gray-200 drop-shadow-md">Manage your Hellavor platform from here.</p>

                {errorMessage && (
                    <p className="mt-4 text-red-500">{errorMessage}</p>
                )}

                <form className="mt-8 space-y-6 max-w-sm w-full" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="block w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-lg font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-400 transition duration-300 shadow-lg"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="mt-4">
                        <a href="forgot-password" className="text-sm text-gray-300 underline hover:text-yellow-500 transition duration-300">
                            Forgot your password?
                        </a>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
