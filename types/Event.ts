export interface Event {
  id: number;
  title: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  frequency?: string;
  year?: string;
  location?: string;
  startDate?: string;
  thumbnail: string;
  gallery?: string[];
  videos?: string[];
  highlights?: string[];
  links?: { label: string; url: string }[];
  status: "ongoing" | "completed" | "upcoming";
}
