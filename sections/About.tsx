import { useEffect } from "react";
import { profilePlaceholder } from "../utils/constants";

const placeholderImage = profilePlaceholder;

// Types
type Name = string | undefined;
type Role = string | undefined;
type Image = string | undefined;
type Link = string | undefined;

interface teamMembersInterface {
  name: Name;
  role: Role;
  image: Image;
  link: Link;
}

const teamMembers: teamMembersInterface[] = [
  {
    name: 'Zac',
    role: 'Lead Developer',
    image: placeholderImage,
    link: 'https://github.com',
  },
  {
    name: 'Thomas',
    role: 'Developer',
    image: placeholderImage,
    link: 'https://thomasfolio.netlify.app',
  },
  {
    name: 'Mark',
    role: 'Developer',
    image: placeholderImage,
    link: 'https://mark.co',
  },
];

const About = () => {
  // Set the page title for the About page
  useEffect(() => {
    document.title = "Hellavor | About"
  }, []);

  const handleCardClick = (link: string | undefined) => {
    window.open(link, '_blank');
  };

  return (
    <section className="relative p-6 bg-gray-100 dark:bg-gray-900">
      <div className="absolute inset-0 primary-bg"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-8">Our Team</h1>
        <p className="mb-4 text-xl text-gray-200 drop-shadow-md">Hellavor is an independent Roblox game development studio and here is our team.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg border border-white border-opacity-40 dark:bg-gray-800 dark:bg-opacity-30 dark:border-opacity-20 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 hover:cursor-pointer transition-transform duration-300"
              onClick={() => handleCardClick(member.link)}
            >
              <div className="tooltip">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="tooltip-text">{member.name}</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">{member.role}</p>
            </div>      
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
