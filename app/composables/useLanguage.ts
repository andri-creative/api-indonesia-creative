export const useLanguage = () => {
  const language = useState<"en" | "id">("language", () => "en");

  const setLanguage = (lang: "en" | "id") => {
    language.value = lang;
  };

  return {
    language,
    setLanguage,
  };
};
