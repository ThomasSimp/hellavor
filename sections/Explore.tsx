import { useEffect } from 'react';

const Explore = () => {
    // Set the page title for the Explore page
    useEffect(() => {
        document.title = "Hellavor | Explore";
    }, []);

    const games = [
        {
            title: 'Hellavor',
            description: 'An exciting horror game!',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-pixabay-1640777.jpg&fm=jpg',
            link: 'https://www.roblox.com/games/hellavor',
            players: '450K',
            rating: '4.8/5',
            genre: 'Adventure',
        }
    ];

    return (
        <section className="relative p-6 bg-gray-100 dark:bg-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0 primary-bg"></div>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center animate-fadeIn">
                <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-8 animate-fadeUp">
                    Explore Our Game
                </h1>
                <p className="mb-4 text-xl text-gray-200 drop-shadow-md animate-fadeUp delay-200">
                    We have provided the details of the game that we have published.
                </p>

                <div className="w-full lg:w-3/4 xl:w-2/3">
                    {games.slice(0, 1).map((game, index) => (
                        <div key={index} className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img 
                                src={game.image}
                                alt={game.title}
                                className="w-full h-64 object-cover opacity-80 hover:opacity-100 transition duration-300"
                            />
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white animate-fadeUp delay-300">{game.title}</h2>
                                <p className="mt-4 text-gray-600 dark:text-gray-300 animate-fadeUp delay-400">{game.description}</p>

                                {/* Additional Game Details */}
                                <div className="mt-4 text-left animate-fadeUp delay-500">
                                    <p className="text-gray-700 dark:text-gray-400"><strong>Players:</strong> {game.players}</p>
                                    <p className="text-gray-700 dark:text-gray-400"><strong>Rating:</strong> {game.rating}</p>
                                    <p className="text-gray-700 dark:text-gray-400"><strong>Genre:</strong> {game.genre}</p>
                                </div>

                                {/* Play Now Button */}
                                <a
                                    href={game.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-block mt-6 px-8 py-3 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-400 hover:scale-105 transition-transform duration-300 shadow-lg"
                                >
                                    Play Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Explore;
