import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        document.title = "Hellavor Admin | Dashboard";

        // Check if the JWT token exists in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            // If the token is missing, redirect to the login page
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        // Clear the token from localStorage and redirect to login
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    return (
        <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-gray-800 dark:bg-gray-900 shadow-lg z-20">
                <div className="p-6">
                    <h2 className="text-2xl font-extrabold text-white drop-shadow-lg">Admin Dashboard</h2>
                </div>
                <nav className="mt-6">
                    <a
                        href="dashboard/overview"
                        className="block px-6 py-3 text-gray-300 hover:bg-yellow-500 hover:text-white transition duration-300"
                    >
                        Overview
                    </a>
                    <a
                        href="dashboard/users"
                        className="block px-6 py-3 text-gray-300 hover:bg-yellow-500 hover:text-white transition duration-300"
                    >
                        Users
                    </a>
                    <a
                        href="dashboard/settings"
                        className="block px-6 py-3 text-gray-300 hover:bg-yellow-500 hover:text-white transition duration-300"
                    >
                        Settings
                    </a>
                </nav>
            </aside>

            {/* Main content */}
            <main className="ml-64 p-6">
                <header className="flex items-center justify-between bg-gray-700 text-white p-4 rounded-md shadow-md">
                    <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
                    <button
                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </header>

                {/* Dashboard content */}
                <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Users</h2>
                        <p className="mt-4 text-xl">Manage platform users, view stats and reports.</p>
                        <a
                            href="dashboard/users"
                            className="mt-4 inline-block px-6 py-2 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-400 transition duration-300 shadow-lg"
                        >
                            Manage Users
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Settings</h2>
                        <p className="mt-4 text-xl">Configure site-wide settings and preferences.</p>
                        <a
                            href="dashboard/settings"
                            className="mt-4 inline-block px-6 py-2 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-400 transition duration-300 shadow-lg"
                        >
                            Go to Settings
                        </a>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Reports</h2>
                        <p className="mt-4 text-xl">View and generate reports to monitor site performance.</p>
                        <a
                            href="dashboard/reports"
                            className="mt-4 inline-block px-6 py-2 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-400 transition duration-300 shadow-lg"
                        >
                            View Reports
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
