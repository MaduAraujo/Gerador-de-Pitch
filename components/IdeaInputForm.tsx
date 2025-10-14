import React from 'react';

interface IdeaInputFormProps {
  businessIdea: string;
  setBusinessIdea: (idea: string) => void;
  onGenerate: (idea: string) => void;
  isLoading: boolean;
}

const IdeaInputForm: React.FC<IdeaInputFormProps> = ({ businessIdea, setBusinessIdea, onGenerate, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(businessIdea);
  };

  return (
    <section className="bg-slate-800/50 p-6 md:p-8 rounded-xl border border-slate-700 shadow-lg">
      <form onSubmit={handleSubmit}>
        <label htmlFor="business-idea" className="block text-lg font-semibold mb-3 text-slate-300">
          Qual é a sua ideia de negócio?
        </label>
        <textarea
          id="business-idea"
          className="w-full h-40 p-4 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 ease-in-out text-slate-200 placeholder-slate-500 resize-none"
          placeholder="Ex: Um app que usa IA para criar planos de refeição personalizados com base nas restrições alimentares e metas de saúde do usuário."
          value={businessIdea}
          onChange={(e) => setBusinessIdea(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={isLoading}
          >
            {isLoading ? 'Gerando...' : 'Gerar'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default IdeaInputForm;