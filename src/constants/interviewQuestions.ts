// Comprehensive Interview Questions Database
// Organized by interview type, category, and difficulty

export interface InterviewQuestion {
    id: string;
    question: string;
    category: string;
    difficulty: 'junior' | 'mid' | 'senior';
    followUp?: string[];
}

// ============================================
// BEHAVIORAL INTERVIEW QUESTIONS (STAR Method)
// ============================================

export const behavioralQuestions: InterviewQuestion[] = [
    // Leadership & Teamwork
    {
        id: 'beh_lead_01',
        question: "Tell me about a time when you had to lead a team through a difficult project. How did you handle it?",
        category: 'Leadership & Teamwork',
        difficulty: 'mid',
        followUp: ["What was the outcome?", "What would you do differently?"]
    },
    {
        id: 'beh_lead_02',
        question: "Describe a situation where you had to collaborate with a difficult team member. How did you approach it?",
        category: 'Leadership & Teamwork',
        difficulty: 'junior',
        followUp: ["How did the relationship evolve?", "What did you learn?"]
    },
    {
        id: 'beh_lead_03',
        question: "Tell me about a time when you had to make an unpopular decision as a leader. How did you communicate it?",
        category: 'Leadership & Teamwork',
        difficulty: 'senior',
        followUp: ["How did the team respond?", "Would you make the same decision again?"]
    },

    // Problem Solving
    {
        id: 'beh_prob_01',
        question: "Describe a complex technical problem you faced and how you solved it.",
        category: 'Problem Solving',
        difficulty: 'mid',
        followUp: ["What alternatives did you consider?", "What was the impact?"]
    },
    {
        id: 'beh_prob_02',
        question: "Tell me about a time when you had to debug a critical production issue under time pressure.",
        category: 'Problem Solving',
        difficulty: 'senior',
        followUp: ["What was your debugging process?", "How did you prevent it from happening again?"]
    },
    {
        id: 'beh_prob_03',
        question: "Can you share an example of when you had to learn a new technology quickly to solve a problem?",
        category: 'Problem Solving',
        difficulty: 'junior',
        followUp: ["How did you approach the learning?", "How long did it take?"]
    },

    // Communication
    {
        id: 'beh_comm_01',
        question: "Tell me about a time when you had to explain a complex technical concept to a non-technical stakeholder.",
        category: 'Communication',
        difficulty: 'mid',
        followUp: ["How did you ensure they understood?", "What feedback did you receive?"]
    },
    {
        id: 'beh_comm_02',
        question: "Describe a situation where miscommunication led to a problem in your project.",
        category: 'Communication',
        difficulty: 'junior',
        followUp: ["How did you resolve it?", "What did you learn?"]
    },

    // Conflict Resolution
    {
        id: 'beh_conf_01',
        question: "Tell me about a time when you disagreed with your manager on a technical decision. How did you handle it?",
        category: 'Conflict Resolution',
        difficulty: 'mid',
        followUp: ["What was the outcome?", "How did it affect your working relationship?"]
    },
    {
        id: 'beh_conf_02',
        question: "Describe a conflict between team members that you had to mediate.",
        category: 'Conflict Resolution',
        difficulty: 'senior',
        followUp: ["What approach did you take?", "How did you ensure both parties felt heard?"]
    },

    // Adaptability
    {
        id: 'beh_adapt_01',
        question: "Tell me about a time when project requirements changed significantly mid-way. How did you adapt?",
        category: 'Adaptability',
        difficulty: 'mid',
        followUp: ["How did you communicate the changes to your team?", "What was the impact on the timeline?"]
    },
    {
        id: 'beh_adapt_02',
        question: "Describe a situation where you had to work with incomplete information or ambiguous requirements.",
        category: 'Adaptability',
        difficulty: 'senior',
        followUp: ["How did you handle the uncertainty?", "What was your decision-making process?"]
    },
];

// ============================================
// TECHNICAL INTERVIEW QUESTIONS
// ============================================

export const technicalQuestions: InterviewQuestion[] = [
    // Data Structures & Algorithms
    {
        id: 'tech_dsa_01',
        question: "Explain the difference between a stack and a queue. When would you use each?",
        category: 'Data Structures & Algorithms',
        difficulty: 'junior',
        followUp: ["Can you implement a stack using queues?", "What are real-world use cases?"]
    },
    {
        id: 'tech_dsa_02',
        question: "How would you design an algorithm to find the shortest path in a graph?",
        category: 'Data Structures & Algorithms',
        difficulty: 'mid',
        followUp: ["What is the time complexity?", "How would you optimize it for large graphs?"]
    },
    {
        id: 'tech_dsa_03',
        question: "Explain how a HashMap works internally, including collision handling.",
        category: 'Data Structures & Algorithms',
        difficulty: 'senior',
        followUp: ["What is the time complexity of operations?", "How does load factor affect performance?"]
    },

    // System Architecture
    {
        id: 'tech_arch_01',
        question: "What is the difference between monolithic and microservices architecture?",
        category: 'System Architecture',
        difficulty: 'junior',
        followUp: ["What are the pros and cons of each?", "When would you choose one over the other?"]
    },
    {
        id: 'tech_arch_02',
        question: "Explain the concept of RESTful APIs and key design principles.",
        category: 'System Architecture',
        difficulty: 'mid',
        followUp: ["How do you handle versioning?", "REST vs GraphQL - when to use which?"]
    },
    {
        id: 'tech_arch_03',
        question: "How would you design a highly available and fault-tolerant system?",
        category: 'System Architecture',
        difficulty: 'senior',
        followUp: ["What redundancy strategies would you use?", "How do you handle cascading failures?"]
    },

    // Database Design
    {
        id: 'tech_db_01',
        question: "Explain the difference between SQL and NoSQL databases. When would you use each?",
        category: 'Database Design',
        difficulty: 'junior',
        followUp: ["What are examples of each?", "Can you give specific use cases?"]
    },
    {
        id: 'tech_db_02',
        question: "How do you design a database schema for optimal query performance?",
        category: 'Database Design',
        difficulty: 'mid',
        followUp: ["What indexing strategies would you use?", "How do you handle data redundancy?"]
    },
    {
        id: 'tech_db_03',
        question: "Explain database sharding and when you would implement it.",
        category: 'Database Design',
        difficulty: 'senior',
        followUp: ["What are the challenges?", "How do you handle distributed transactions?"]
    },

    // Code Quality & Best Practices
    {
        id: 'tech_qual_01',
        question: "What are SOLID principles in software design?",
        category: 'Code Quality',
        difficulty: 'mid',
        followUp: ["Can you give examples of each?", "How do they improve code quality?"]
    },
    {
        id: 'tech_qual_02',
        question: "How do you ensure code quality in a fast-paced development environment?",
        category: 'Code Quality',
        difficulty: 'senior',
        followUp: ["What tools and practices do you use?", "How do you balance speed and quality?"]
    },

    // Web Development Specific
    {
        id: 'tech_web_01',
        question: "Explain the virtual DOM in React and why it's beneficial.",
        category: 'Web Development',
        difficulty: 'mid',
        followUp: ["How does reconciliation work?", "What are the performance implications?"]
    },
    {
        id: 'tech_web_02',
        question: "How would you optimize the performance of a slow-loading web application?",
        category: 'Web Development',
        difficulty: 'senior',
        followUp: ["What tools would you use to diagnose?", "What are common performance bottlenecks?"]
    },
];

// ============================================
// SYSTEM DESIGN INTERVIEW QUESTIONS
// ============================================

export const systemDesignQuestions: InterviewQuestion[] = [
    // Scalability
    {
        id: 'sys_scale_01',
        question: "Design a URL shortening service like bit.ly. How would you handle millions of requests?",
        category: 'Scalability',
        difficulty: 'mid',
        followUp: ["How would you generate unique short URLs?", "What database would you use and why?"]
    },
    {
        id: 'sys_scale_02',
        question: "How would you design a system to handle 1 million concurrent users?",
        category: 'Scalability',
        difficulty: 'senior',
        followUp: ["What are your scaling strategies?", "How do you handle hot spots?"]
    },

    // Architecture Patterns
    {
        id: 'sys_arch_01',
        question: "Design a notification system that can send emails, SMS, and push notifications.",
        category: 'Architecture Patterns',
        difficulty: 'mid',
        followUp: ["How do you handle different notification types?", "How do you ensure delivery?"]
    },
    {
        id: 'sys_arch_02',
        question: "Design a content delivery network (CDN). What are the key components?",
        category: 'Architecture Patterns',
        difficulty: 'senior',
        followUp: ["How do you handle cache invalidation?", "How do you choose edge server locations?"]
    },

    // Load Balancing & Caching
    {
        id: 'sys_load_01',
        question: "Explain different load balancing strategies and when to use each.",
        category: 'Load Balancing',
        difficulty: 'mid',
        followUp: ["How do you handle sticky sessions?", "What happens if a server goes down?"]
    },
    {
        id: 'sys_cache_01',
        question: "Design a caching strategy for an e-commerce product catalog.",
        category: 'Caching',
        difficulty: 'mid',
        followUp: ["What caching layers would you use?", "How do you handle cache consistency?"]
    },
    {
        id: 'sys_cache_02',
        question: "Explain cache eviction policies and when to use each.",
        category: 'Caching',
        difficulty: 'senior',
        followUp: ["LRU vs LFU - pros and cons?", "How do you determine optimal cache size?"]
    },

    // Data Storage & Retrieval
    {
        id: 'sys_data_01',
        question: "Design a distributed file storage system like Dropbox or Google Drive.",
        category: 'Data Storage',
        difficulty: 'senior',
        followUp: ["How do you handle file synchronization?", "How do you ensure data consistency?"]
    },
    {
        id: 'sys_data_02',
        question: "How would you design a real-time analytics dashboard that processes billions of events?",
        category: 'Data Storage',
        difficulty: 'senior',
        followUp: ["What technologies would you use?", "How do you handle data aggregation?"]
    },

    // Trade-offs & Design Decisions
    {
        id: 'sys_trade_01',
        question: "Design a rate limiter for an API. How do you balance security and user experience?",
        category: 'Trade-offs',
        difficulty: 'mid',
        followUp: ["What algorithms would you use?", "How do you handle distributed rate limiting?"]
    },
    {
        id: 'sys_trade_02',
        question: "Explain the CAP theorem and give examples of systems that prioritize different aspects.",
        category: 'Trade-offs',
        difficulty: 'senior',
        followUp: ["When would you choose AP over CP?", "How do you handle network partitions?"]
    },
];

// ============================================
// QUESTION SELECTION UTILITIES
// ============================================

export const getQuestionsByType = (type: 'behavioral' | 'technical' | 'system-design', count: number = 10): InterviewQuestion[] => {
    const questionMap = {
        'behavioral': behavioralQuestions,
        'technical': technicalQuestions,
        'system-design': systemDesignQuestions,
    };

    const questions = questionMap[type];

    // Shuffle and select
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getQuestionsByDifficulty = (
    type: 'behavioral' | 'technical' | 'system-design',
    difficulty: 'junior' | 'mid' | 'senior',
    count: number = 10
): InterviewQuestion[] => {
    const allQuestions = getQuestionsByType(type, 100);
    const filtered = allQuestions.filter(q => q.difficulty === difficulty);
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const formatQuestionsForVAPI = (questions: InterviewQuestion[]): string => {
    return questions
        .map((q, index) => `${index + 1}. ${q.question}`)
        .join('\n');
};
