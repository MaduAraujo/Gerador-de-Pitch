import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto py-4 border-t border-slate-700/50 bg-slate-900">
      <div className="container mx-auto px-4 text-center text-sm text-slate-500">
        <p>&copy; {currentYear} Gerador de Pitch. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
