import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

import IconNext from "../../../Assets/Image/Icon/arrowRight.svg";
import IconBefore from "../../../Assets/Image/Icon/arrowLeft.svg";

function InputDatePicker({ text }: { text: string }) {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePickerInput
      radius="md"
      value={value}
      onChange={setValue}
      placeholder={text}
      nextIcon={<img src={IconNext} />}
      previousIcon={<img src={IconBefore} />}
    />
  );
}

export default InputDatePicker;
