require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { Client } = require('pg');

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

  type Mutation {
    applyForJob(input: JobApplicationInput!): JobApplicationResponse!
  }

  type JobApplicationResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    applications: [JobApplication]
  }
`);

// Root resolver
const root = {
  applyForJob: async ({ input }) => {
    try {
      // Insert the job application into the database
      const query = `
        INSERT INTO job_applications (job_id, name, email, cover_letter)
        VALUES ($1, $2, $3, $4)
        RETURNING job_id, name, email, cover_letter
      `;
      const values = [input.jobId, input.name, input.email, input.coverLetter];

      const res = await client.query(query, values);
      
      // Return success response
      return { success: true, message: 'Application submitted successfully!' };
    } catch (error) {
      return { success: false, message: 'Failed to submit application.' };
    }
  },
  applications: async () => {
    try {
      const result = await client.query('SELECT * FROM job_applications');
      return result.rows; // Return all job applications
    } catch (error) {
      console.error('Error fetching applications:', error);
      return [];
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
