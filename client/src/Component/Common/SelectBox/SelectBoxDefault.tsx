import React, { useState } from "react";
import { Combobox, useCombobox, ScrollArea } from "@mantine/core";
import arrowDown from "../../../Assets/Image/arrowDown.svg";
import arrowUp from "../../../Assets/Image/arrowUp.svg";
import {
  StyledContainer,
  StyledArrow,
  StyledInputBase,
  SelectBoxOptions,
  CustomComboboxDropdown,
} from "./SelectBoxDefault.styles";
import SelectBoxDefaultProps from "./SelectBoxDefaultProps";
import therapistData from "../../../MockData/therapistData.json";

//치료사목업데이터
interface Therapist {
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

const addresses = therapistData.map((therapist: Therapist) => therapist.address);

function SelectBoxDefault({
  width = "fit-content",
  height = "fit-content",
  text = "Select an item",
}: SelectBoxDefaultProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const arrowIcon = isFocused ? arrowUp : arrowDown;

  const shouldFilterOptions = addresses.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? addresses.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      )
    : addresses;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val: string) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <StyledContainer width={width} isFocused={isFocused}>
          <StyledInputBase
            height={height}
            isValue={!!value}
            rightSection={
              <StyledArrow
                src={arrowIcon}
                alt="arrow"
                onClick={() => {
                  combobox.openDropdown();
                  setIsFocused(!isFocused);
                }}
              />
            }
            rightSectionPointerEvents="none"
            onClick={() => combobox.openDropdown()}
            onFocus={() => {
              combobox.openDropdown();
              setIsFocused(true);
            }}
            onBlur={() => {
              combobox.closeDropdown();
              setIsFocused(false);
              setSearch(value || "");
            }}
            placeholder={text}
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
          />
        </StyledContainer>
      </Combobox.Target>
      <CustomComboboxDropdown>
        <SelectBoxOptions>
          <ScrollArea.Autosize type="scroll" mah={200}>
            {options.length > 0 ? (
                options
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
        </SelectBoxOptions>
      </CustomComboboxDropdown>
    </Combobox>
  );
}

export default SelectBoxDefault;
