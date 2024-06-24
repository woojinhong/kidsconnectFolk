export type careerType = {
  id: string;
  centerName: string;
  year: number;
  month: number;
  isWorking: boolean;
};

export type educationType = {
  id: string;
  universityName: string;
  major: string;
  degree: string | null;
  degreeCompletion: string | null;
};

export type licenseType = {
  id: string;
  licenseId: string;
};

export interface gatheredIntroductionDataType {
  title: string;
  introduction: string;
  content: string;
  career: careerType[];
  education: educationType[];
  license: licenseType[];
  treatmentArea: string[];
  ageGroup: string[];
  isUploadedId: boolean;
  isUploadedCriminalRecord: boolean;
}

export type CategoryType =
  | "career"
  | "education"
  | "licenses"
  | "isUploadedId"
  | "isUploadedCriminalRecord";
