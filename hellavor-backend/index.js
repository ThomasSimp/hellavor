require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new PostgreSQL client
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// GraphQL Schema
const schema = buildSchema(`
  input JobApplicationInput {
    jobId: Int!
    name: String!
    email: String!
    coverLetter: String!
  }

  type JobApplication {
    jobId: Int!
    name: String!
    email: String!
    coverLetter: String!
  }

  type JobApplicationResponse {
    success: Boolean!
    message: String!
  }

  input AdminLoginInput {
    username: String!
    password: String!
  }

  type AdminLoginResponse {
    success: Boolean!
    message: String!
    token: String
  }

  type Mutation {
    applyForJob(input: JobApplicationInput!): JobApplicationResponse!
    adminLogin(input: AdminLoginInput!): AdminLoginResponse!
  }

  type Query {
    applications: [JobApplication]
  }
`);

// Root resolver
const root = {
  applyForJob: async ({ input }) => {
    try {
      const query = `
        INSERT INTO job_applications (job_id, name, email, cover_letter)
        VALUES ($1, $2, $3, $4)
        RETURNING job_id, name, email, cover_letter
      `;
      const values = [input.jobId, input.name, input.email, input.coverLetter];
      await client.query(query, values);
      
      return { success: true, message: 'Application submitted successfully!' };
    } catch (error) {
      return { success: false, message: 'Failed to submit application.' };
    }
  },
  applications: async () => {
    try {
      const result = await client.query('SELECT * FROM job_applications');
      return result.rows;
    } catch (error) {
      console.error('Error fetching applications:', error);
      return [];
    }
  },
  adminLogin: async ({ input }) => {
    const { username, password } = input;
    
    try {
      // Fetch the admin user from the database
      const query = 'SELECT * FROM admins WHERE username = $1';
      const result = await client.query(query, [username]);

      if (result.rows.length === 0) {
        return { success: false, message: 'Invalid username or password' };
      }

      const admin = result.rows[0];

      // Check if the password is correct
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return { success: false, message: 'Invalid username or password' };
      }

      // Generate a JWT token
      const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });

      return { success: true, message: 'Login successful', token };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Failed to log in' };
    }
  },
};

const app = express();
app.use(cors());

const route = '/api';

app.use(`${route}/graphql`, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/api/graphql');
});
