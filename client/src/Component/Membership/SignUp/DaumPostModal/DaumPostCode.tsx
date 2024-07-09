import { useState, useEffect } from "react";
import InputButton from "../../../Common/Input/InputButton";

import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import { useDaumPostcodePopup } from "react-daum-postcode";

const DaumPostCode = ({
  label,
  placeholder,
  dispatch,
  dispatchPostalCode,
  disabled,
}: dispatchType) => {
  const [value, setValue] = useState<string>("");
  const props = { label, placeholder, disabled, value };
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  useEffect(() => {
    if (disabled) {
      setValue("");
      dispatch(switchLabelToType(label as string), "");
    }
  }, [disabled]);

  const handleComplete = (data: DaumPostCodeType) => {
    const fullAddress = data.address;
    dispatch(switchLabelToType(label as string), fullAddress);
    const postalCode = data.zonecode;
    dispatch(switchLabelToType(label as string), fullAddress);
    dispatchPostalCode && dispatchPostalCode(postalCode);
    setValue(fullAddress);
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  return <InputButton onClick={handleClick} apiIcon="search" {...props} />;
};

export default DaumPostCode;

const switchLabelToType = (label: string) => {
  switch (label) {
    case "주소":
      return "address";
    case "근무지 찾기":
      return "centerName";
    default:
      return "address";
  }
};

interface DaumPropsType {
  label?: string;
  placeholder: string;
  disabled?: boolean;
}

export interface dispatchType extends DaumPropsType {
  dispatch: (category: string, inputValue: string) => void;
  dispatchPostalCode?: (inputValue: string) => void;
}

type DaumPostCodeType = {
  address: string;
  zonecode: string;
};
