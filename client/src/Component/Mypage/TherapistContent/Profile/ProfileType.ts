export type ProfileType = {
  firstName: string;
  lastName: string;
  freelancer: boolean;
  phoneNum: string;
  address: string;
  addressDetail: string;
  centerName?: string;
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
