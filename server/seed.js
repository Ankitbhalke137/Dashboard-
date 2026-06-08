require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectDB } = require('./db');
const User = require('./models/User');
const Student = require('./models/Student');
const Faculty = require('./models/Faculty');
const Event = require('./models/Event');
const AcademicTopper = require('./models/AcademicTopper');
const ClubLeader = require('./models/ClubLeader');
const Club = require('./models/Club');
const Title = require('./models/Title');
const StudentTitle = require('./models/StudentTitle');
const Book = require('./models/Book');
const Suggestion = require('./models/Suggestion');
const LeaderboardEntry = require('./models/LeaderboardEntry');
const ChatRoom = require('./models/ChatRoom');


const studentsData = [
  {
    name: 'Ankit Bhalke',
    location: 'Pune',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ankit',
    batch: '2024-2028',
    campus: 'Main Campus',
    about: 'Full-stack developer passionate about building scalable web applications. Lead organizer for multiple hackathons.',
    github: 'https://github.com/Ankitbhalke137',
    linkedin: 'https://linkedin.com/in/ankitbhalke',
    portfolio: 'https://ankitbhalke.dev',
    isLeapxIntern: true,
    techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Python'],
    resumeData: {
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Python', 'Docker'],
      projects: [
        { title: 'College Portal', description: 'Full-stack student platform', techStack: ['React', 'Node.js', 'MongoDB'], link: 'https://github.com/Ankitbhalke137' },
        { title: 'AI Chat Assistant', description: 'Real-time chat with NLP', techStack: ['Python', 'Flask', 'TensorFlow'], link: '' },
      ],
      achievements: ['Won Hackathon 2024', 'Leapx Intern'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2028' },
    },
  },
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    batch: '2023-2027',
    campus: 'Main Campus',
    about: 'AI/ML enthusiast with expertise in deep learning and computer vision. Published 2 research papers.',
    github: 'https://github.com/priyasharma',
    linkedin: 'https://linkedin.com/in/priyasharma',
    portfolio: 'https://priyasharma.dev',
    isLeapxIntern: true,
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'React'],
    resumeData: {
      skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'MLOps'],
      projects: [
        { title: 'Vision AI', description: 'Real-time object detection', techStack: ['Python', 'TensorFlow'], link: '' },
      ],
      achievements: ['Published 2 papers', 'AI Hackathon Winner'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2027' },
    },
  },
  {
    name: 'Rahul Verma',
    location: 'Delhi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    batch: '2024-2028',
    campus: 'Main Campus',
    about: 'Competitive programmer and blockchain developer. CodeChef 5-star rating, ETHGlobal finalist.',
    github: 'https://github.com/rahulverma',
    linkedin: 'https://linkedin.com/in/rahulverma',
    portfolio: 'https://rahulverma.tech',
    isLeapxIntern: true,
    techStack: ['Solidity', 'React', 'Node.js', 'C++', 'Rust'],
    resumeData: {
      skills: ['Solidity', 'C++', 'Rust', 'Web3', 'React'],
      projects: [
        { title: 'DeFi Dashboard', description: 'Decentralized finance tracker', techStack: ['Solidity', 'React'], link: '' },
      ],
      achievements: ['ETHGlobal Finalist', 'CodeChef 5-star'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2028' },
    },
  },
  {
    name: 'Sneha Patel',
    location: 'Ahmedabad',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
    batch: '2023-2027',
    campus: 'Main Campus',
    about: 'UI/UX designer turned frontend developer. Creates beautiful, accessible web experiences.',
    github: 'https://github.com/snehapatel',
    linkedin: 'https://linkedin.com/in/snehapatel',
    portfolio: 'https://snehapatel.design',
    isLeapxIntern: false,
    techStack: ['React', 'Figma', 'Tailwind CSS', 'Framer Motion', 'Next.js'],
    resumeData: {
      skills: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion', 'Next.js'],
      projects: [
        { title: 'Design System', description: 'Component library for rapid prototyping', techStack: ['React', 'Storybook'], link: '' },
      ],
      achievements: ['Best Design Award 2024'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2027' },
    },
  },
  {
    name: 'Arjun Singh',
    location: 'Lucknow',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    batch: '2022-2026',
    campus: 'Main Campus',
    about: 'Backend architect specializing in microservices and cloud infrastructure. AWS Certified.',
    github: 'https://github.com/arjunsingh',
    linkedin: 'https://linkedin.com/in/arjunsingh',
    portfolio: 'https://arjunsingh.cloud',
    isLeapxIntern: false,
    techStack: ['Go', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
    resumeData: {
      skills: ['Go', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      projects: [
        { title: 'Cloud Monitor', description: 'Infrastructure monitoring tool', techStack: ['Go', 'AWS'], link: '' },
      ],
      achievements: ['AWS Certified Solutions Architect'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2026' },
    },
  },
  {
    name: 'Kavita Reddy',
    location: 'Hyderabad',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavita',
    batch: '2024-2028',
    campus: 'Main Campus',
    about: 'Mobile app developer building cross-platform solutions with Flutter and React Native.',
    github: 'https://github.com/kavitareddy',
    linkedin: 'https://linkedin.com/in/kavitareddy',
    portfolio: 'https://kavitareddy.app',
    isLeapxIntern: false,
    techStack: ['Flutter', 'React Native', 'Firebase', 'Dart', 'Kotlin'],
    resumeData: {
      skills: ['Flutter', 'React Native', 'Firebase', 'Dart', 'Kotlin'],
      projects: [
        { title: 'Fitness Tracker App', description: 'Cross-platform fitness application', techStack: ['Flutter', 'Firebase'], link: '' },
      ],
      achievements: ['Google Summer of Code 2024'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2028' },
    },
  },
  {
    name: 'Vikram Joshi',
    location: 'Jaipur',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',
    batch: '2023-2027',
    campus: 'Main Campus',
    about: 'DevOps engineer automating everything. CI/CD pipelines, IaC, and monitoring expert.',
    github: 'https://github.com/vikramjoshi',
    linkedin: 'https://linkedin.com/in/vikramjoshi',
    portfolio: 'https://vikramjoshi.devops',
    isLeapxIntern: false,
    techStack: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Ansible'],
    resumeData: {
      skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Ansible', 'Prometheus'],
      projects: [
        { title: 'AutoDeploy', description: 'Automated CI/CD pipeline manager', techStack: ['Jenkins', 'Docker'], link: '' },
      ],
      achievements: ['CKA Certified'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2027' },
    },
  },
  {
    name: 'Neha Gupta',
    location: 'Indore',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha',
    batch: '2024-2028',
    campus: 'Main Campus',
    about: 'Data scientist turning complex data into actionable insights. Kaggle Competition Master.',
    github: 'https://github.com/nehagupta',
    linkedin: 'https://linkedin.com/in/nehagupta',
    portfolio: 'https://nehagupta.data',
    isLeapxIntern: true,
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Tableau', 'SQL'],
    resumeData: {
      skills: ['Python', 'Pandas', 'Scikit-learn', 'Tableau', 'SQL', 'Spark'],
      projects: [
        { title: 'Predictive Analytics', description: 'Sales forecasting model', techStack: ['Python', 'Scikit-learn'], link: '' },
      ],
      achievements: ['Kaggle Competition Master', 'Leapx Intern'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2028' },
    },
  },
  {
    name: 'Rohit Malhotra',
    location: 'Chandigarh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit',
    batch: '2022-2026',
    campus: 'Main Campus',
    about: 'Cybersecurity researcher and ethical hacker. CTF player, bug bounty hunter.',
    github: 'https://github.com/rohitmalhotra',
    linkedin: 'https://linkedin.com/in/rohitmalhotra',
    portfolio: 'https://rohitmalhotra.sec',
    isLeapxIntern: false,
    techStack: ['Python', 'Bash', 'Wireshark', 'Metasploit', 'Burp Suite'],
    resumeData: {
      skills: ['Python', 'Bash', 'Network Security', 'Penetration Testing', 'Cryptography'],
      projects: [
        { title: 'VulnScanner', description: 'Automated vulnerability scanner', techStack: ['Python', 'Bash'], link: '' },
      ],
      achievements: ['Bug Bounty Hall of Fame'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2026' },
    },
  },
  {
    name: 'Aisha Khan',
    location: 'Bhopal',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aisha',
    batch: '2023-2027',
    campus: 'Main Campus',
    about: 'Cloud-native developer building serverless applications. AWS Community Builder.',
    github: 'https://github.com/aishakhan',
    linkedin: 'https://linkedin.com/in/aishakhan',
    portfolio: 'https://aishakhan.serverless',
    isLeapxIntern: false,
    techStack: ['AWS Lambda', 'Serverless', 'TypeScript', 'GraphQL', 'DynamoDB'],
    resumeData: {
      skills: ['AWS Lambda', 'Serverless', 'TypeScript', 'GraphQL', 'DynamoDB'],
      projects: [
        { title: 'Serverless API', description: 'GraphQL API on AWS Lambda', techStack: ['TypeScript', 'GraphQL'], link: '' },
      ],
      achievements: ['AWS Community Builder'],
      education: { degree: 'B.Tech CSE', institution: 'MIT-WPU', year: '2027' },
    },
  },
];

const facultyData = [
  {
    name: 'Dr. Rajesh Kumar',
    designation: 'Professor & Head of Department',
    department: 'Computer Science & Engineering',
    email: 'rajesh.kumar@mitwpu.edu.in',
    officeHours: 'Mon-Fri 10:00 AM - 12:00 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
  },
  {
    name: 'Dr. Sunita Patel',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'sunita.patel@mitwpu.edu.in',
    officeHours: 'Mon-Wed 2:00 PM - 4:00 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunita',
  },
  {
    name: 'Prof. Amit Singh',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: 'amit.singh@mitwpu.edu.in',
    officeHours: 'Tue-Thu 11:00 AM - 1:00 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit',
  },
  {
    name: 'Dr. Priya Deshmukh',
    designation: 'Professor',
    department: 'Artificial Intelligence & ML',
    email: 'priya.deshmukh@mitwpu.edu.in',
    officeHours: 'Fri 9:00 AM - 3:00 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya-d',
  },
  {
    name: 'Prof. Vikram Mehta',
    designation: 'Tech Lead - Innovation Lab',
    department: 'Computer Science & Engineering',
    email: 'vikram.mehta@mitwpu.edu.in',
    officeHours: 'Mon-Fri 3:00 PM - 5:00 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram-f',
  },
  {
    name: 'Dr. Ananya Reddy',
    designation: 'Associate Professor',
    department: 'Data Science',
    email: 'ananya.reddy@mitwpu.edu.in',
    officeHours: 'Wed-Fri 10:00 AM - 12:00 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya',
  },
];

const eventsData = [
  {
    title: 'Hackathon 2025: Code for Impact',
    description: '48-hour hackathon focused on building solutions for social impact. Open to all B.Tech students.',
    date: new Date('2025-12-15'),
    type: 'upcoming',
    registrationLink: 'https://forms.google.com/hackathon2025',
    images: [],
  },
  {
    title: 'Tech Talk: Future of AI',
    description: 'Guest lecture by industry experts on the future of artificial intelligence and its applications.',
    date: new Date('2025-11-20'),
    type: 'upcoming',
    registrationLink: 'https://forms.google.com/techtalk-ai',
    images: [],
  },
  {
    title: 'Alumni Meet 2025',
    description: 'Annual alumni meet and networking event. Connect with successful alumni from our college.',
    date: new Date('2025-10-30'),
    type: 'upcoming',
    registrationLink: 'https://forms.google.com/alumni2025',
    images: [],
  },
  {
    title: 'CodeFest 2024',
    description: 'Annual coding competition with participants from across the country.',
    date: new Date('2024-03-15'),
    type: 'past',
    registrationLink: '',
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhMjAyYyIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMDBmZjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Db2RlRmVzdCAyMDI0PC90ZXh0Pjwvc3ZnPg==',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzBhMjgyYSIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMDBmZjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UZWFtcyBDb2Rpbmc8L3RleHQ+PC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhMjUyYyIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMDBmZjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5XaW5uZXJzIFBvZGl1bTwvdGV4dD48L3N2Zz4=',
    ],
  },
  {
    title: 'Cultural Night 2024',
    description: 'Annual cultural festival featuring music, dance, and drama performances by students.',
    date: new Date('2024-04-20'),
    type: 'past',
    registrationLink: '',
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzJhMWEyYyIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmYwMGZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DdWx0dXJhbCBOaWdodCAyMDI0PC90ZXh0Pjwvc3ZnPg==',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzJhMjIxYyIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmYwMGZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QZXJmb3JtYW5jZSBTdGFnZTwvdGV4dD48L3N2Zz4=',
    ],
  },
  {
    title: 'Robotics Workshop',
    description: 'Hands-on workshop on building and programming autonomous robots.',
    date: new Date('2024-02-10'),
    type: 'past',
    registrationLink: '',
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFjMmEyYSIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMDBmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Sb2JvdGljcyBXb3Jrc2hvcDwvdGV4dD48L3N2Zz4=',
    ],
  },
];

const clubData = [
  {
    name: 'Tech Club',
    description: 'Exploring cutting-edge technologies and building innovative projects. Organizes hackathons, workshops, and tech talks.',
    category: 'Tech',
  },
  {
    name: 'Cultural Club',
    description: 'Celebrating arts, music, dance, and drama. Organizes cultural festivals and creative workshops.',
    category: 'Cultural',
  },
  {
    name: 'Sports Club',
    description: 'Promoting sports and fitness among students. Organizes tournaments and training sessions.',
    category: 'Sports',
  },
  {
    name: 'Social Welfare Club',
    description: 'Making a difference through community service, social awareness campaigns, and volunteer work.',
    category: 'Social Welfare',
  },
  {
    name: 'Business Club',
    description: 'Fostering entrepreneurship and business acumen. Hosts startup pitches, networking events, and mentorship programs.',
    category: 'Business',
  },
  {
    name: 'Robotics Club',
    description: 'Building robots and exploring automation. Participates in national and international robotics competitions.',
    category: 'Robotics',
  },
  {
    name: 'Content Club',
    description: 'Creating compelling content across media. Manages college social media, blogs, and publications.',
    category: 'Content',
  },
];

const titleData = [
  { name: 'Coding Dojo Samurai', icon: '⚔️', description: 'Mastered the art of competitive programming', criteria: 'Solve 500+ DSA problems', category: 'coding', rarity: 'legendary' },
  { name: 'Hackathon Champion', icon: '🏆', description: 'Won first place in a major hackathon', criteria: 'Win a college-level hackathon', category: 'coding', rarity: 'epic' },
  { name: 'Open Source Contributor', icon: '🌟', description: 'Made significant contributions to open source', criteria: '5+ merged PRs in open source', category: 'coding', rarity: 'rare' },
  { name: 'Sports Captain', icon: '🏅', description: 'Led the college sports team to victory', criteria: 'Captain of a college sports team', category: 'sports', rarity: 'epic' },
  { name: 'Academic All-Star', icon: '📚', description: 'Achieved top academic performance', criteria: 'CGPA 9.5+ for 2 consecutive semesters', category: 'academic', rarity: 'rare' },
  { name: 'Club President', icon: '👑', description: 'Led a college club as president', criteria: 'Elected as club president', category: 'leadership', rarity: 'epic' },
  { name: 'AI Innovator', icon: '🤖', description: 'Developed innovative AI/ML solutions', criteria: 'Build and deploy an AI project', category: 'coding', rarity: 'rare' },
  { name: 'Design Guru', icon: '🎨', description: 'Excellence in UI/UX design', criteria: 'Win a design competition', category: 'cultural', rarity: 'rare' },
  { name: 'Public Speaker', icon: '🎤', description: 'Outstanding oratory and presentation skills', criteria: 'Win a debate or public speaking event', category: 'cultural', rarity: 'common' },
  { name: 'Research Scholar', icon: '🔬', description: 'Published research in peer-reviewed journals', criteria: 'Publish a research paper', category: 'academic', rarity: 'legendary' },
  { name: 'Leapx Elite', icon: '💎', description: 'Selected for the prestigious Leapx internship program', criteria: 'Clear Leapx intern selection', category: 'special', rarity: 'legendary' },
  { name: 'Community Builder', icon: '🌐', description: 'Built and nurtured a thriving tech community', criteria: 'Organize 5+ community events', category: 'leadership', rarity: 'epic' },
];

const leaderboardData = [
  { category: 'coding', score: 9850 },
  { category: 'coding', score: 9200 },
  { category: 'coding', score: 8800 },
  { category: 'coding', score: 8100 },
  { category: 'coding', score: 7900 },
  { category: 'problem_solving', score: 9500 },
  { category: 'problem_solving', score: 8900 },
  { category: 'problem_solving', score: 8500 },
  { category: 'problem_solving', score: 7800 },
  { category: 'problem_solving', score: 7400 },
  { category: 'sports', score: 9200 },
  { category: 'sports', score: 8800 },
  { category: 'sports', score: 8300 },
  { category: 'sports', score: 7900 },
  { category: 'sports', score: 7500 },
];

const bookData = [
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', description: 'Comprehensive guide to algorithms and data structures', category: 'dsa', link: 'https://mitpress.mit.edu/books/introduction-algorithms' },
  { title: 'Clean Code', author: 'Robert C. Martin', description: 'Principles of writing clean, maintainable code', category: 'programming', link: 'https://www.oreilly.com/library/view/clean-code/' },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', description: 'Timeless tips for software engineers', category: 'programming', link: 'https://pragprog.com/titles/tpp20/' },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', description: 'Building reliable, scalable, and maintainable systems', category: 'programming', link: 'https://dataintensive.net/' },
  { title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell', description: '189 programming questions and solutions', category: 'career', link: 'https://www.crackingthecodinginterview.com/' },
  { title: 'Deep Learning', author: 'Ian Goodfellow', description: 'Comprehensive textbook on deep learning', category: 'ml', link: 'https://www.deeplearningbook.org/' },
  { title: 'Atomic Habits', author: 'James Clear', description: 'Building good habits and breaking bad ones', category: 'soft-skills', link: 'https://jamesclear.com/atomic-habits' },
];

const suggestionData = [
  { category: 'project', title: 'Build a Personal Portfolio', description: 'Create a modern portfolio website showcasing your projects, skills, and experience using React and Tailwind CSS.', tags: ['react', 'web', 'beginner'] },
  { category: 'project', title: 'E-Commerce Platform', description: 'Build a full-stack e-commerce application with payment gateway integration, cart management, and admin dashboard.', tags: ['fullstack', 'node', 'advanced'] },
  { category: 'project', title: 'AI Chat Application', description: 'Develop a real-time chat application with AI-powered responses using OpenAI API and WebSockets.', tags: ['ai', 'realtime', 'intermediate'] },
  { category: 'career', title: 'Build Your GitHub Profile', description: 'Contribute to open source projects, maintain a clean commit history, and showcase your best work in pinned repositories.', tags: ['github', 'portfolio'] },
  { category: 'career', title: 'Prepare for Technical Interviews', description: 'Practice DSA problems daily, participate in mock interviews, and study system design concepts.', tags: ['interviews', 'dsa'] },
  { category: 'internship', title: 'Apply Early & Often', description: 'Start applying for internships from your 2nd year. Use LinkedIn, Internshala, and company career portals.', tags: ['internship', 'apply'] },
  { category: 'internship', title: 'Build Your Resume', description: 'Tailor your resume for each application, highlight relevant projects, and quantify your achievements.', tags: ['resume', 'applications'] },
  { category: 'skill', title: 'Learn Version Control', description: 'Master Git and GitHub for collaboration. Understand branching strategies, PR reviews, and CI/CD pipelines.', tags: ['git', 'devops'] },
  { category: 'skill', title: 'Master One Language Deeply', description: 'Pick one language (Python/JavaScript/Java) and master its ecosystem before learning others.', tags: ['programming', 'fundamentals'] },
];

async function seed() {
  try {
    if (mongoose.connection.readyState === 0) {
      const uri = await connectDB();
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    }

    await Promise.all([
      User.deleteMany({}),
      Student.deleteMany({}),
      Faculty.deleteMany({}),
      Event.deleteMany({}),
      AcademicTopper.deleteMany({}),
      ClubLeader.deleteMany({}),
      Club.deleteMany({}),
      Title.deleteMany({}),
      StudentTitle.deleteMany({}),
      Book.deleteMany({}),
      Suggestion.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      ChatRoom.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    const adminUser = await User.create({
      email: 'admin@college.edu',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created');

    const students = await Student.insertMany(studentsData);
    console.log(`${students.length} students created`);

    const faculty = await Faculty.insertMany(facultyData);
    console.log(`${faculty.length} faculty created`);

    const clubs = [];
    for (let i = 0; i < clubData.length; i++) {
      let president;
      if (i === 5) {
        president = students[0];
      } else {
        president = students[i % students.length];
      }
      const club = await Club.create({
        ...clubData[i],
        logo: `https://api.dicebear.com/7.x/avataaars/svg?seed=club${i}`,
        coverImage: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMWEyMDJjIi8+PHRleHQgeD0iNjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiMwMGZmMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPn5+ICR7Y2x1YkRhdGFbaV0ubmFtZX0gfn48L3RleHQ+PC9zdmc+`,
        presidentId: president._id,
        members: [president._id],
        images: [
          `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzFhMjAyYyIvPjx0ZXh0IHg9IjQwMCIgeT0iMjUwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMDBmZjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4ke2NsdWJEYXRhW2ldLm5hbWV9IEV2ZW50IDE8L3RleHQ+PC9zdmc+`,
          `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzBhMjgyYSIvPjx0ZXh0IHg9IjQwMCIgeT0iMjUwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMDBmZjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4ke2NsdWJEYXRhW2ldLm5hbWV9IEV2ZW50IDI8L3RleHQ+PC9zdmc+`,
        ],
      });
      clubs.push(club);

      await User.create({
        email: `${clubData[i].name.toLowerCase().replace(/\s+/g, '.')}.president@college.edu`,
        password: 'president123',
        role: 'club_president',
        clubAssignments: [{ clubId: club._id, role: 'president' }],
        studentId: president._id,
      });

      await ClubLeader.create({
        studentId: president._id,
        clubName: clubData[i].name,
        role: 'President',
        tier: 'Core',
      });
    }
    console.log(`${clubs.length} clubs created with presidents`);

    const events = await Event.insertMany(eventsData);
    console.log(`${events.length} events created`);

    const toppersInsert = [];
    for (let i = 0; i < 5; i++) {
      toppersInsert.push({
        studentId: students[i]._id,
        semester: 3 + (i % 3),
        cgpa: 9.0 + (i * 0.15),
        department: 'Computer Science & Engineering',
      });
    }
    await AcademicTopper.insertMany(toppersInsert);
    console.log(`${toppersInsert.length} academic toppers created`);

    for (let i = 3; i < students.length; i++) {
      await ClubLeader.create({
        studentId: students[i]._id,
        clubName: clubData[i % clubData.length].name,
        role: i % 2 === 0 ? 'Core Member' : 'CR',
        tier: i % 2 === 0 ? 'Core' : 'CR',
      });
    }
    console.log('Additional club leaders created');

    const titles = await Title.insertMany(titleData);
    console.log(`${titles.length} titles created`);

    const leapxTitle = titles.find(t => t.name === 'Leapx Elite');
    for (const student of students) {
      if (student.isLeapxIntern && leapxTitle) {
        await StudentTitle.create({
          studentId: student._id,
          titleId: leapxTitle._id,
        });
        student.titles.push(leapxTitle._id);
      }
      const codingTitle = titles.find(t => t.name === 'Coding Dojo Samurai');
      if (codingTitle && Math.random() > 0.6) {
        await StudentTitle.create({
          studentId: student._id,
          titleId: codingTitle._id,
        });
        student.titles.push(codingTitle._id);
      }
      await student.save();
    }
    console.log('Student titles assigned');

    for (let i = 0; i < leaderboardData.length; i++) {
      const studentIdx = i % students.length;
      await LeaderboardEntry.create({
        studentId: students[studentIdx]._id,
        category: leaderboardData[i].category,
        score: leaderboardData[i].score,
      });
    }
    console.log('Leaderboard entries created');

    await Book.insertMany(bookData);
    console.log(`${bookData.length} books added`);

    await Suggestion.insertMany(suggestionData);
    console.log(`${suggestionData.length} suggestions added`);

    await ChatRoom.create([
      { name: 'General', type: 'public', description: 'General discussion for all students' },
      { name: 'Placements & Internships', type: 'public', description: 'Discuss placement prep and internship opportunities' },
      { name: 'Tech Talk', type: 'public', description: 'Technical discussions, doubts, and knowledge sharing' },
      { name: 'Fun & Random', type: 'public', description: 'Casual conversations, memes, and fun' },
      { name: 'Project Collaborations', type: 'public', description: 'Find teammates for your next project' },
    ]);
    console.log('Chat rooms created');

    console.log('\n✅ Seed completed successfully!');
    console.log('\n--- Login Credentials ---');
    console.log('Admin: admin@college.edu / admin123');
    console.log('Club Presidents: <clubname>.president@college.edu / president123');
  } catch (error) {
    console.error('Seed error:', error);
    throw error;
  }
}

if (require.main === module) {
  seed().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = seed;
