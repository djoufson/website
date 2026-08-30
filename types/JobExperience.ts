export interface JobRole {
  jobTitle: string,
  start: Date,
  end?: Date,
  responsibilities: string[]
};

export interface JobExperience {
  id: Number,
  company: string,
  website: string,
  logo: string,
  jobDescription: string,
  // Ordered from most recent to oldest. Multiple entries represent a
  // progression within the same company (e.g. a promotion).
  roles: JobRole[]
};
