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
  toHome: string;
  toHistory: string;
};
