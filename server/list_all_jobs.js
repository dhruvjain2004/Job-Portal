import mongoose from 'mongoose';
import Job from './models/Job.js';
import Company from './models/Company.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://dhruvjain527:dhruvjain2004@jobportal-cluster.kihmw28.mongodb.net';

const demoCompanies = [
  {
    name: 'Google',
    email: 'press@google.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    password: 'demopassword',
  },
  {
    name: 'Microsoft',
    email: 'msindhr@microsoft.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    password: 'demopassword',
  },
  {
    name: 'Amazon',
    email: 'indcampco@amazon.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    password: 'demopassword',
  },
  {
    name: 'Apple',
    email: 'media.help@apple.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    password: 'demopassword',
  },
  // Meta and Adobe are skipped for job creation due to logo issues
];

async function insertDemoCompanies() {
  for (const company of demoCompanies) {
    const exists = await Company.findOne({ email: company.email });
    if (!exists) {
      await Company.create(company);
      console.log('Inserted company:', company.name);
    } else {
      console.log('Company already exists:', company.name);
    }
  }
}

async function addSampleJobsForAllDemoCompanies() {
  for (const company of demoCompanies) {
    const dbCompany = await Company.findOne({ email: company.email });
    if (!dbCompany) {
      console.log('No company found with email:', company.email);
      continue;
    }
    const jobsToInsert = [
      {
        title: 'Frontend Developer',
        description: `<p>Build modern web UIs for ${company.name} using React and Tailwind.</p>`,
        location: 'Bangalore',
        category: 'Programming',
        level: 'Beginner level',
        salary: 600000,
        date: Date.now(),
        visible: true,
        companyId: dbCompany._id,
      },
      {
        title: 'Backend Developer',
        description: `<p>Work on Node.js APIs and MongoDB databases at ${company.name}.</p>`,
        location: 'Hyderabad',
        category: 'Programming',
        level: 'Intermediate level',
        salary: 900000,
        date: Date.now(),
        visible: true,
        companyId: dbCompany._id,
      },
      {
        title: 'UI/UX Designer',
        description: `<p>Design user-friendly interfaces and experiences for ${company.name}.</p>`,
        location: 'Mumbai',
        category: 'Designing',
        level: 'Beginner level',
        salary: 700000,
        date: Date.now(),
        visible: true,
        companyId: dbCompany._id,
      },
    ];
    await Job.insertMany(jobsToInsert);
    console.log(`Sample jobs added for company: ${company.name}`);
  }
}

async function deleteBadJobs() {
  const result = await Job.deleteMany({ $or: [ { companyId: { $exists: false } }, { companyId: null }, { companyId: undefined } ] });
  console.log('Deleted jobs with missing/invalid companyId:', result.deletedCount);
}

async function listJobs() {
  const jobs = await Job.find({});
  if (jobs.length === 0) {
    console.log('No jobs found in the database.');
  } else {
    console.log(jobs.map(j => ({ id: j._id, title: j.title, companyId: j.companyId, visible: j.visible })));
  }
}

async function makeAllJobsVisible() {
  await Job.updateMany({}, { visible: true });
  console.log('All jobs set to visible');
}

async function listAllCompanies() {
  const companies = await Company.find({});
  if (companies.length === 0) {
    console.log('No companies found in the database.');
  } else {
    console.log('Companies in database:');
    companies.forEach(c => console.log(`- ${c.email} | ${c.name}`));
  }
}

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    await deleteBadJobs();
    await insertDemoCompanies();
    await addSampleJobsForAllDemoCompanies();
    await makeAllJobsVisible();
    await listAllCompanies();
    await listJobs();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

main();