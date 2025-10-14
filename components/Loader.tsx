import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <p className="text-lg text-slate-400">A IA está trabalhando na sua ideia...</p>
    </div>
  );
};

export default Loader;