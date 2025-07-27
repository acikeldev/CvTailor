export interface HarvardCvModel {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
  volunteer: Volunteer[];
  publications: Publication[];
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  website?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  graduationDate?: string;
  gpa?: string;
  relevantCourses: string[];
  honors?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  achievements: string[];
  technologies: string[];
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

export interface Project {
  name: string;
  description?: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  date?: string;
  expiryDate?: string;
  url?: string;
}

export interface Volunteer {
  organization: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Publication {
  title: string;
  authors?: string;
  journal?: string;
  date?: string;
  url?: string;
}

export interface CvChange {
  section: string;
  field: string;
  oldValue: string;
  newValue: string;
  changeType: string;
  description: string;
}

export interface CvEnhancementResponse {
  enhancedCv: HarvardCvModel;
  changes: CvChange[];
}

// Sample CV data for initial state
export const getSampleHarvardCv = (): HarvardCvModel => ({
  personalInfo: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev"
  },
  education: [
    {
      institution: "Harvard University",
      degree: "Master of Science",
      field: "Computer Science",
      graduationDate: "2022",
      gpa: "3.8/4.0",
      relevantCourses: ["Advanced Algorithms", "Machine Learning", "Software Engineering", "Database Systems"],
      honors: "Dean's List, Academic Excellence Award"
    },
    {
      institution: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationDate: "2020",
      gpa: "3.9/4.0",
      relevantCourses: ["Data Structures", "Computer Architecture", "Operating Systems", "Web Development"],
      honors: "Summa Cum Laude, Phi Beta Kappa"
    }
  ],
  experience: [
    {
      company: "Google",
      position: "Senior Software Engineer",
      startDate: "2022",
      endDate: "Present",
      location: "Mountain View, CA",
      description: "Leading development of scalable web applications and microservices architecture.",
      achievements: [
        "Led a team of 5 engineers to develop a new feature that increased user engagement by 25%",
        "Optimized database queries resulting in 40% faster page load times",
        "Mentored 3 junior developers and conducted technical interviews"
      ],
      technologies: ["React", "Node.js", "Python", "PostgreSQL", "Docker", "Kubernetes"]
    },
    {
      company: "Microsoft",
      position: "Software Engineer",
      startDate: "2020",
      endDate: "2022",
      location: "Seattle, WA",
      description: "Developed and maintained cloud-based applications using Azure services.",
      achievements: [
        "Built a real-time analytics dashboard used by 10,000+ users",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Collaborated with cross-functional teams to deliver features on schedule"
      ],
      technologies: ["C#", ".NET", "Azure", "SQL Server", "JavaScript", "TypeScript"]
    }
  ],
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "C#", "Java", "SQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Azure"],
    soft: ["Leadership", "Problem Solving", "Team Collaboration", "Communication", "Project Management", "Agile Methodologies"],
    languages: ["English (Native)", "Spanish (Fluent)", "French (Intermediate)"]
  },
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with payment integration and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      url: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/johndoe/ecommerce-platform",
      startDate: "2023",
      endDate: "2023"
    },
    {
      name: "Machine Learning Chatbot",
      description: "Developed an AI-powered chatbot using natural language processing for customer service.",
      technologies: ["Python", "TensorFlow", "NLTK", "Flask", "Redis"],
      url: "https://chatbot-demo.com",
      githubUrl: "https://github.com/johndoe/ml-chatbot",
      startDate: "2022",
      endDate: "2022"
    },
    {
      name: "Task Management App",
      description: "Created a collaborative task management application with real-time updates.",
      technologies: ["React", "Socket.io", "Express.js", "PostgreSQL"],
      url: "https://taskmanager-demo.com",
      githubUrl: "https://github.com/johndoe/task-manager",
      startDate: "2021",
      endDate: "2021"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      expiryDate: "2026",
      url: "https://aws.amazon.com/certification/"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
      expiryDate: "2025",
      url: "https://cloud.google.com/certification/"
    },
    {
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      date: "2021",
      expiryDate: "2024",
      url: "https://www.scrumalliance.org/"
    }
  ],
  volunteer: [
    {
      organization: "Code for America",
      role: "Volunteer Developer",
      startDate: "2021",
      endDate: "Present",
      description: "Developed open-source software solutions for local government organizations."
    },
    {
      organization: "Tech Mentorship Program",
      role: "Mentor",
      startDate: "2020",
      endDate: "Present",
      description: "Mentored high school students in computer science and programming."
    }
  ],
  publications: [
    {
      title: "Scalable Microservices Architecture: Best Practices",
      authors: "John Doe, Jane Smith",
      journal: "IEEE Software Engineering",
      date: "2023",
      url: "https://ieee.org/paper123"
    },
    {
      title: "Machine Learning in Web Applications: A Practical Guide",
      authors: "John Doe",
      journal: "ACM Computing Surveys",
      date: "2022",
      url: "https://acm.org/paper456"
    }
  ]
}); 