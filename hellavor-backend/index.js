require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: bcrypt.hashSync('password', 10),
};

// In-memory storage for job applications
const jobApplications = [];

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username !== ADMIN_CREDENTIALS.username) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Failed to log in' });
  }
});

// Submit job application endpoint
app.post('/api/jobs/apply', (req, res) => {
  const { jobId, name, email, coverLetter } = req.body;

  if (!jobId || !name || !email || !coverLetter) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const application = { jobId, name, email, coverLetter };
    jobApplications.push(application);

    return res.status(200).json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit application' });
  }
});

// Fetch all job applications endpoint
app.get('/api/jobs/applications', (req, res) => {
  try {
    return res.status(200).json(jobApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});

//
