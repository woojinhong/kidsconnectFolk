export type careerType = {
  centerName: string;
  startDate: number;
  endDate: number;
  isWorking: boolean;
};

export type educationType = {
  id: string;
  education: string;
  major: string;
  degree: string | null;
  degreeCompletion: string | null;
};

export interface gatheredIntroductionDataType {
  title: string;
  imageFile: string;
  bio: string;
  content: string;
  experience: careerType[];
  education: educationType[];
  certificate: string[];
  symptom: string[];
  ageRange: string[];
  identityCheck: boolean;
  crimeCheck: boolean;
}

export type CategoryType =
  | "career"
  | "education"
  | "licenses"
  | "identityCheck"
  | "crimeCheck";

// export type licenseType = {
//   id: string;
//   licenseId: string;
// };
