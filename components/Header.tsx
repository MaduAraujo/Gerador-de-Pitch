import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-slate-700/50 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-2">
          Gerador de Pitch
        </h1>
        <p className="text-md text-slate-400 max-w-2xl">
          Conte sua ideia e deixe a IA criar um roteiro e uma identidade visual para sua startup.
        </p>
      </div>
    </header>
  );
};

export default Header;