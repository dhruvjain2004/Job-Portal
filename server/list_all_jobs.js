import mongoose from 'mongoose';
import Job from './models/Job.js';
import Company from './models/Company.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://<username>:<password>@jobportal-cluster.kihmw28.mongodb.net';

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
        description: `<p>Join ${company.name} as a Frontend Developer and build modern, responsive web applications that millions of users interact with daily. You'll work with cutting-edge technologies and collaborate with cross-functional teams to deliver exceptional user experiences.</p>`,
        keyResponsibilities: [
          'Develop responsive web applications using React.js and modern JavaScript',
          'Collaborate with UI/UX designers to implement pixel-perfect designs',
          'Optimize applications for maximum speed and scalability',
          'Write clean, maintainable code and participate in code reviews',
          'Work closely with backend developers to integrate APIs'
        ],
        skillsRequired: [
          'React.js',
          'JavaScript/TypeScript',
          'HTML5/CSS3',
          'Git',
          'RESTful APIs'
        ],
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
        description: `<p>As a Backend Developer at ${company.name}, you'll architect and build robust server-side applications that power our platform. You'll work on scalable solutions and contribute to the technical decisions that shape our infrastructure.</p>`,
        keyResponsibilities: [
          'Design and develop RESTful APIs and microservices',
          'Implement database schemas and optimize database performance',
          'Ensure code quality through testing and documentation',
          'Collaborate with DevOps team for deployment and monitoring',
          'Participate in architectural discussions and technical planning'
        ],
        skillsRequired: [
          'Node.js',
          'MongoDB/PostgreSQL',
          'Express.js',
          'Docker',
          'AWS/Azure'
        ],
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
        description: `<p>Create beautiful and intuitive user experiences at ${company.name}. You'll work on designing interfaces that delight users while meeting business objectives. Your designs will impact millions of users worldwide.</p>`,
        keyResponsibilities: [
          'Create user-centered designs by understanding business requirements',
          'Create user flows, wireframes, prototypes and mockups',
          'Translate requirements into style guides, design systems, design patterns and attractive user interfaces',
          'Create original graphic designs (e.g. images, sketches and tables)',
          'Identify and troubleshoot UX problems (e.g. responsiveness)'
        ],
        skillsRequired: [
          'Figma',
          'Adobe Creative Suite',
          'User Research',
          'Prototyping',
          'Design Systems'
        ],
        location: 'Mumbai',
        category: 'Designing',
        level: 'Beginner level',
        salary: 700000,
        date: Date.now(),
        visible: true,
        companyId: dbCompany._id,
      },
      {
        title: 'Data Scientist',
        description: `<p>Join ${company.name}'s data science team to extract insights from large datasets and build machine learning models that drive business decisions. You'll work on cutting-edge AI/ML projects that have real-world impact.</p>`,
        keyResponsibilities: [
          'Analyze large datasets to identify trends and patterns',
          'Develop and implement machine learning models',
          'Create data visualizations and reports for stakeholders',
          'Collaborate with engineering teams to deploy models',
          'Stay updated with latest developments in AI/ML field'
        ],
        skillsRequired: [
          'Python',
          'Machine Learning',
          'SQL',
          'TensorFlow/PyTorch',
          'Data Visualization'
        ],
        location: 'Bangalore',
        category: 'Programming',
        level: 'Senior level',
        salary: 1500000,
        date: Date.now(),
        visible: true,
        companyId: dbCompany._id,
      },
      {
        title: 'DevOps Engineer',
        description: `<p>As a DevOps Engineer at ${company.name}, you'll build and maintain the infrastructure that powers our applications. You'll work on automation, monitoring, and ensuring high availability of our systems.</p>`,
        keyResponsibilities: [
          'Design and implement CI/CD pipelines',
          'Manage cloud infrastructure and container orchestration',
          'Monitor system performance and troubleshoot issues',
          'Implement security best practices and compliance',
          'Automate deployment and configuration management'
        ],
        skillsRequired: [
          'Docker',
          'Kubernetes',
          'AWS/GCP/Azure',
          'Jenkins/GitLab CI',
          'Linux Administration'
        ],
        location: 'Hyderabad',
        category: 'Programming',
        level: 'Intermediate level',
        salary: 1100000,
        date: Date.now(),
        visible: true,
        companyId: dbCompany._id,
      }
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
