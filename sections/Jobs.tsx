import { useState, useEffect } from 'react';
import { Types } from '../types';
import Swal from 'sweetalert2';

const Jobs = () => {
    const [selectedJob, setSelectedJob] = useState<Types.JobListingType | null>(null);
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    useEffect(() => {
        document.title = "Hellavor | Jobs";
    }, []);

    const jobListings: Types.JobListingType[] = [
        {
            id: 1,
            title: 'Frontend Developer',
            description: 'Build beautiful and responsive UIs using React.',
            location: 'Remote',
            type: 'Full-time',
        },
        {
            id: 2,
            title: 'Backend Developer',
            description: 'Develop scalable backend systems using Node.js.',
            location: 'Remote',
            type: 'Full-time',
        },
        {
            id: 3,
            title: 'UI/UX Designer',
            description: 'Design engaging user interfaces with a focus on user experience.',
            location: 'Remote',
            type: 'Contract',
        },
    ];

    const handleApplyClick = (job: Types.JobListingType) => {
        setSelectedJob(job);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name: string) => {
        return name.length >= 2;
    };

    const validateCoverLetter = (letter: string) => {
        return letter.length >= 10;
    };

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateName(applicantName)) {
            Swal.fire({
                title: 'Invalid Name',
                text: 'Name must be at least 2 characters long.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        if (!validateEmail(applicantEmail)) {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        if (!validateCoverLetter(coverLetter)) {
            Swal.fire({
                title: 'Invalid Cover Letter',
                text: 'Cover letter must be at least 10 characters long.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        const applicationData = {
            jobId: selectedJob?.id,
            name: applicantName,
            email: applicantEmail,
            coverLetter,
        };

        try {
            const response = await fetch('https://hellavor-backend.onrender.com/api/graphql/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    mutation ApplyForJob($input: JobApplicationInput!) {
                        applyForJob(input: $input) {
                            success
                            message
                        }
                    }
                    `,
                    variables: {
                        input: applicationData,
                    },
                }),
            });

            const result = await response.json();
            const { success, message } = result.data.applyForJob;

            if (success) {
                Swal.fire({
                    title: 'Application Submitted!',
                    text: 'Your application has been submitted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                setApplicantName('');
                setApplicantEmail('');
                setCoverLetter('');
                setSelectedJob(null);
            } else {
                Swal.fire({
                    title: 'Submission Failed',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while submitting your application. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <section className="relative p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="absolute inset-0 primary-bg"></div>
            <div className="text-center relative z-10 flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-5xl font-extrabold text-white mb-6">Join the Hellavor Team</h1>
                <p className="text-xl text-gray-200">We're looking for talented and passionate individuals!</p>
                <p className="text-md text-gray-300 mt-2 mb-12">Explore open positions and become part of something great.</p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {jobListings.map((job) => (
                        <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-left flex flex-col justify-between h-full">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">{job.description}</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <strong>Location:</strong> {job.location}
                            </p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <strong>Type:</strong> {job.type}
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => handleApplyClick(job)}
                                    className="mt-5 inline-block px-6 py-3 text-white bg-yellow-500 rounded-full hover:bg-yellow-400 transition duration-300"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>                    
                    ))}
                </div>

                {selectedJob && (
                    <div className="mt-12 max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                            Apply for {selectedJob.title}
                        </h2>
                        <form onSubmit={handleSubmitApplication}>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={applicantName}
                                        onChange={(e) => setApplicantName(e.target.value)}
                                        className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={applicantEmail}
                                        onChange={(e) => setApplicantEmail(e.target.value)}
                                        className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                        rows={4}
                                        placeholder="Link to your cover letter"
                                        required
                                    />
                                </div>

                                <div className="text-right">
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="inline-block px-6 py-3 text-white bg-yellow-500 rounded-full hover:bg-yellow-400 transition duration-300"
                                        >
                                            Submit Application
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Jobs;
