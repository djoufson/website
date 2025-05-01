export interface JobExperience {
  id: Number,
  company: string,
  website: string,
  logo: string,
  jobTitle: string,
  jobDescription: string,
  start: Date,
  end?: Date,
  responsibilities: string[]
};
