// components/CustomSelect.tsx
"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { Image } from "@nextui-org/react";
interface IDropdownOption {
  value: string;
  label: string;
}

const CustomSelect = () => {
  const [selected, setSelected] = useState<string>("new");

  const options: IDropdownOption[] = [
    { value: "new", label: "New file" },
    { value: "copy", label: "Copy link" },
    { value: "edit", label: "Edit file" },
    { value: "delete", label: "Delete file" },
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant={"light"} className="h-6 w-6 min-w-0 p-0">
          <Image
            src="/images/global-localization.svg"
            alt="NextUI Album Cover"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        variant="light"
        defaultSelectedKeys={"new"}
        onAction={() => {}}
      >
        {options.map((option) => (
          <DropdownItem key={option.value}>
            {option.label}
            {selected === option.value && " Ｖ"}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomSelect;
