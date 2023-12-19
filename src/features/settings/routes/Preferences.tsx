import Detail from "../components/Detail";

import { useState } from "react";

import {
  getPreferences,
  toggleDarkMode,
  updatePreferences,
} from "../utils/preferences";

const Preferences = () => {
  const [preferences, setPreferences] = useState(getPreferences());

  const handlePreferenceChange = (
    key: keyof typeof preferences,
    value: string
  ) => {
    const newPreferences = { ...preferences, [key]: value };
    if (key === "theme") toggleDarkMode();
    setPreferences(newPreferences);
    updatePreferences(newPreferences);
  };

  return (
    <>
      <Detail field="Theme">
        <RadioInput
          value="light"
          checked={preferences.theme === ""}
          onChange={() => handlePreferenceChange("theme", "")}
          label="Light"
        />
        <RadioInput
          value="dark"
          checked={preferences.theme === "dark"}
          onChange={() => handlePreferenceChange("theme", "dark")}
          label="Dark"
        />
      </Detail>

      <Detail field="Default Screen">
        <RadioInput
          value="/recipes"
          checked={preferences.defaultScreen === "/recipes"}
          onChange={() => handlePreferenceChange("defaultScreen", "/recipes")}
          label="Recipes"
        />
        <RadioInput
          value="/grocery-lists"
          checked={preferences.defaultScreen === "/grocery-lists"}
          onChange={() =>
            handlePreferenceChange("defaultScreen", "/grocery-lists")
          }
          label="Grocery Lists"
        />
      </Detail>
    </>
  );
};

export default Preferences;

const RadioInput = ({
  value,
  checked,
  onChange,
  label,
}: {
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <label className="mb-2 inline-flex cursor-pointer items-center gap-2">
    <div
      onClick={onChange}
      className={`h-6 w-6 border-2 border-dashed border-black ${
        checked ? "bg-black" : "bg-transparent"
      }`}
    />
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <span className="text-sm">{label}</span>
  </label>
);
