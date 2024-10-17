import { useEffect, useState } from 'react';

// Modal component for feedback
const Modal = ({ showModal, onClose, title, message }: any) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <button
          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition-transform duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Contact = () => {
  // Set the page title for the Contact page
  useEffect(() => {
    document.title = "Hellavor | Contact";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const webhookUrl = 'https://ptb.discord.com/api/webhooks/1293384857333927947/wXPlkWT7cOrjiyQlJRzjk5xAvy1M5KbSi4X82zIfsWuSZBWdUNu7dTxey4-w25opHJfT';

    const content = {
      username: 'Contact Form Bot',
      embeds: [
        {
          title: 'New Contact Form Submission',
          color: 0xffcc00, // Yellow color in hex
          fields: [
            { name: 'Full Name', value: formData.name, inline: true },
            { name: 'Email', value: formData.email, inline: true },
            { name: 'Subject', value: formData.subject },
            { name: 'Message', value: formData.message }
          ],
          footer: {
            text: `Form submitted on ${new Date().toLocaleString()}`
          }
        }
      ]
    };

    // Send the form data to Discord
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      });

      if (response.ok) {
        setModalContent({
          title: 'Form Submitted Successfully',
          message: 'Thank you for reaching out! We will get back to you soon.'
        });
        setShowModal(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setModalContent({
          title: 'Submission Failed',
          message: 'Failed to submit form. Please try again later.'
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setModalContent({
        title: 'Error',
        message: 'There was an error submitting your form. Please try again.'
      });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="relative p-8 bg-gray-100 dark:bg-gray-900">
      <div className="absolute inset-0 primary-bg bg-fixed bg-cover"></div>
      <div className="relative z-10 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 animate-fadeIn">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center drop-shadow-md mb-6 animate-fadeUp">
          Contact Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 drop-shadow-sm animate-fadeUp delay-200">
          Have any questions? Feel free to reach out to us by filling out the form below.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeUp delay-300">
          <div className="md:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-3 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-yellow-500 focus:scale-105 transform transition-transform duration-300"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-3 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-yellow-500 focus:scale-105 transform transition-transform duration-300"
              placeholder="Your email address"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 p-3 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-yellow-500 focus:scale-105 transform transition-transform duration-300"
              placeholder="Subject of your inquiry"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-3 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-yellow-500 focus:scale-105 transform transition-transform duration-300"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transform transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Modal for success or error feedback */}
      <Modal
        showModal={showModal}
        onClose={closeModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </section>
  );
};

export default Contact;
