export type ProfileType = {
  firstName: string;
  lastName: string;
};

export type ProfileDetailType = {
  title: string;
  bio: string;
  content: string;
  education: string;
  identityCheck: boolean;
  crimeCheck: boolean;
  ageRange: string[];
  treatmentArea: string[];
  imageFile: string;
  review: number;
};

export type ProfileCareerType = {
  place: string;
  startDate: string;
  endDate: string;
};
