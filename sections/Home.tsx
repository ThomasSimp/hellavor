import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = "Hellavor | Home";
    }, []); // Empty dependency array to run only once on mount

    return (
        <section className="relative p-6 bg-gray-100 dark:bg-gray-900">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7130475/pexels-photo-7130475.jpeg?cs=srgb&dl=pexels-codioful-7130475.jpg&fm=jpg')] bg-cover bg-center opacity-70"></div>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Welcome to Hellavor</h1>
                <p className="mt-4 text-xl text-gray-200 drop-shadow-md">An epic adventure awaits you!</p>
                <p className="mt-2 text-md text-gray-300">Join thousands of players in an immersive world filled with excitement and challenges.</p>
                <a 
                    href="#explore" 
                    className="mt-6 inline-block px-8 py-4 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-400 transition duration-300 shadow-lg"
                >
                    Explore Now
                </a>
                <div className="mt-6">
                    <a 
                        href="/about" 
                        className="text-sm text-gray-300 underline hover:text-yellow-500 transition duration-300"
                    >
                        Learn More About Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Home;
