export type ProjectCategory = 'open-source' | 'personal';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  impact?: string;
  role?: string;
  challenges?: string[];
  achievements?: string[];
  startDate?: string;
  endDate?: string;
  status: 'active' | 'building' | 'completed' | 'archived';
  collaborators?: {
    name: string;
    role: string;
    githubUrl?: string;
  }[];
  metrics?: {
    stars?: number;
    forks?: number;
    downloads?: number;
    users?: number;
    [key: string]: number | undefined;
  };
  highlights?: string[];
  lessons?: string[];
} 