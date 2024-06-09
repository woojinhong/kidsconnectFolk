export interface SelectBoxDefaultProps {
  category: string;
  width?: string;
  height?: string;
  text?: string;
  region?: string | null;
  getData?: (value: string | null) => void;
  onClear?: boolean;
}

export interface SelectboxOptionTherapist {
  id: number;
  firstName: string;
  email: string;
  pwd: string;
  dateOfBirth: string;
  phoneNum: string;
  postalCode: string;
  addressDetail: string;
  address: string;
  status: boolean;
  inDate: string;
  upDate: string;
}
