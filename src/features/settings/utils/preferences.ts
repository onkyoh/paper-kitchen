interface Preferences {
  theme: "" | "dark";
  defaultScreen: "/recipes" | "/grocery-lists";
}

const defaultPreferences: Preferences = {
  theme: "",
  defaultScreen: "/recipes",
};

export const getPreferences = (): Preferences => {
  const stored: string | null = localStorage.getItem(
    "paperkitchen_preferences"
  );
  const preferences = stored ? JSON.parse(stored) : defaultPreferences;

  return preferences;
};

export const getPreferenceByKey = (key: keyof Preferences): string => {
  if (!key) return "";
  const stored: string | null = localStorage.getItem(
    "paperkitchen_preferences"
  );
  const preferences = stored ? JSON.parse(stored) : defaultPreferences;
  return preferences[key];
};

export const toggleDarkMode = () => {
  document.body.classList.toggle("dark");
};

export const updatePreferences = (newPreferences: Preferences) => {
  localStorage.setItem(
    "paperkitchen_preferences",
    JSON.stringify(newPreferences)
  );
};
