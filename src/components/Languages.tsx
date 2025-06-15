
import { Languages as LanguagesIcon } from 'lucide-react';

const languages = [
  { name: "Telugu", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Conversational" },
  { name: "Japanese", level: "Beginner (JLPT N5)" },
];

const Languages = () => {
  return (
    <section id="languages" className="py-20 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
            <LanguagesIcon className="w-10 h-10 text-cyan-400" />
            Languages
          </h2>
          <p className="text-xl text-gray-300">My linguistic abilities</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {languages.map((lang, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-semibold text-cyan-400">{lang.name}</h3>
              <p className="text-gray-400">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
