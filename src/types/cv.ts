/** Subset of src/data/cv.json used by the site (the CV generator reads the full file). */
export interface CvData {
  header: {
    fullName: string;
    jobTitle: string;
    email: string;
  };
  keyAchievements: string[];
  technicalSkills: {
    languages: { name: string; startDate: string }[];
    backend: string;
    frontend: string;
    databases: string;
    cloud: string;
    other: string;
  };
  education: {
    degree: string;
    graduationDate: string;
    institution: string;
  };
  languages: {
    language: string;
    level: string;
    certLabel?: string;
    certLink?: string;
  }[];
}
