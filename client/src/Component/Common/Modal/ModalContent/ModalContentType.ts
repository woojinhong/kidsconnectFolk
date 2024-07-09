export type PreferenceTextType = {
  messages: {
    intro: string;
    gender: string;
    career: string;
    loading: string;
  };
  selectGender: string[];
  selectCareer: string[];
  loadingLottie: React.ReactNode;
};

export type ApplicationTextType = {
  messages: {
    childSelect: string;
    careLocation: string;
    done: string;
  };
  selectChild: string[];
  selectLocation: string[];
  selectParams: string[];
  toMypage: string;
  toHistory: string;
};

export type AddChildTextType = {
  messages: {
    name: string;
    birthDate: string;
    gender: string;
    treatmentNeeded: string;
    characteristic: string;
  };
  selectGender: string[];
  placeholder: string;
};

export type GatheredChildDataType = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  symptomName: string[];
  personality: string;
};

export interface AddChildSurveyProps {
  onClose?: () => void;
  chatInputValue?: string;
  currentStep?: number;
  onClearChatInput?: () => void;
  handleButtonSendOnClick?: () => void;
  setCurrentStep?: (value: number) => void;
}
