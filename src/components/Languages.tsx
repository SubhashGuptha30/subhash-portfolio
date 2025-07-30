import { Languages as LanguagesIcon } from "lucide-react";

const languages = [
  { name: "Telugu", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Conversational" },
  { name: "Japanese", level: "Beginner (JLPT N5)" },
];

const Languages = () => {
  return (
    <section id="languages" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4 flex items-center justify-center gap-4 text-foreground relative glitch"
            data-text="Languages"
          >
            <LanguagesIcon className="w-10 h-10 text-primary" />
            Languages
          </h2>
          <p className="text-xl text-muted-foreground">
            My linguistic abilities
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {languages.map((lang, index) => (
            <div
              key={index}
              className="bg-card p-4 rounded-md border border-primary/30 hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-primary">
                {lang.name}
              </h3>
              <p className="text-muted-foreground">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
