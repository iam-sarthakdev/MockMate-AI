import NextAuth, { DefaultSession } from "next-auth";

interface FeedbackType {
  id: string;
  interviewId: string;
  userId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Category {
  name: "Communication Skills" | "Technical Knowledge" | "Problem Solving" | "Cultural Fit" | "Confidence and Clarity";
  score: number;
  comment: string;
}



interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

//for the interview card which is displayed at the home page
interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
  interviewMode?: string;
  isPracticeMode?: boolean;
}


//for the route of feedback page
interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

//for displaying the tech icons in InterviewCard
interface TechIconProps {
  techStack: string[];
}


declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    name: string;
  }
}

export interface Interview extends Document {
  _id: Types.ObjectId;
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  userId: Types.ObjectId | string;
  finalized: boolean;
  coverImage: string;
  amount: number,
  createdAt: Date;
  updatedAt: Date
}