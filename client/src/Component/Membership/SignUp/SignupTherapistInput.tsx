import { useState, useEffect } from "react";
import InputText from "../../Common/Input/InputText";
import InputPassword from "../../Common/Input/InputPassword";
import SelectBoxDefault from "../../Common/SelectBox/SelectBoxDefault";
import { Checkbox } from "@mantine/core";

function SignupTherapistInput() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectboxOnClear, setSelectboxOnClear] = useState<boolean>(false);

  const getSelectBoxData = (value: string | null) => {
    setSelectedRegion(value);
    setSelectboxOnClear(true);
  };

  useEffect(() => {
    if (selectboxOnClear) {
      setSelectboxOnClear(false);
    }
  }, [selectboxOnClear]);

  return (
    <div>
      <InputText inputType="email" />
      <InputPassword />
      <div>
        <InputText label="성" />
        <InputText label="이름" />
        <Checkbox.Group>
          <Checkbox label="여성" />
          <Checkbox label="남성" />
        </Checkbox.Group>
      </div>
      <div>
        <InputText label="생년월일" />
        <InputText label="휴대폰 번호" />
      </div>
      <div>
        <InputText label="주소" />
        <InputText />
      </div>
      <div>
        <InputText label="근무지 찾기" />
        <Checkbox label="프리랜서로 일하고 있어요" />
        <div>
          <SelectBoxDefault category="region" getData={getSelectBoxData} />
          <SelectBoxDefault
            category="detailedRegion"
            region={selectedRegion}
            onClear={selectboxOnClear}
          />
        </div>
      </div>
    </div>
  );
}

export default SignupTherapistInput;
