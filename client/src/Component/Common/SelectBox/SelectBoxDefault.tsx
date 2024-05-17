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

const groceries = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
  "🍇 Grapes",
  "🍋 Lemon",
  "🥬 Lettuce",
  "🍄 Mushrooms",
  "🍊 Oranges",
  "🥔 Potatoes",
  "🍅 Tomatoes",
  "🥚 Eggs",
  "🥛 Milk",
  "🍞 Bread",
  "🍗 Chicken",
  "🍔 Hamburger",
  "🧀 Cheese",
  "🥩 Steak",
  "🍟 French Fries",
  "🍕 Pizza",
  "🥦 Cauliflower",
  "🥜 Peanuts",
  "🍦 Ice Cream",
  "🍯 Honey",
  "🥖 Baguette",
  "🍣 Sushi",
  "🥝 Kiwi",
  "🍓 Strawberries",
];

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

  const arrowIcon = isFocused || !!value ? arrowUp : arrowDown;

  const shouldFilterOptions = groceries.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      )
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
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
