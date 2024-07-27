export type TherapistCardProps = {
  variants: "default" | "summary" | "pending" | "confirmed";
  therapistId?: number | undefined;
  onClose?: () => void;
  isOpen?: boolean;
  onOpen?: () => void;
};

export type TherapistProfileType = {
  firstName: string;
  lastName: string;
  phoneNum: string;
  address: string;
  addressDetail: string;
  freelancer: boolean;
  status: boolean;
  centerName: string;
};

export type TherapistDetailedInfoType = {
  title: string;
  bio: string;
  content: string;
  imageFile?: string;
  certificate: string[];
  ageRange: string[];
  symptom: string[];
  experience: experienceType[];
  education: educationType[];
};

export type educationType = {
  id: number;
  education: string;
  major: string;
  degree: string;
  status: boolean;
};

export type experienceType = {
  id: number;
  place: string;
  years: number;
  months: number;
};
export type TherapistCareerType = {
  place: string;
  startDate: string;
  endDate: string;
};
