import React, { useState, useCallback } from 'react';

interface ResultsDisplayProps {
  pitchScript: string | null;
  logoImageUrl: string | null;
  businessIdea: string;
  onRegenerateLogo: () => void;
  isLogoLoading: boolean;
}

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-400">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const RefreshCwIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M3 2v6h6"></path>
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
        <path d="M21 22v-6h-6"></path>
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
    </svg>
);


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ pitchScript, logoImageUrl, businessIdea, onRegenerateLogo, isLogoLoading }) => {
  const [copied, setCopied] = useState(false);

  const formatScriptForDisplay = (script: string) => {
    return script
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
      .replace(/#/g, '')
      .replace(/---/g, '')
      .replace(/\*/g, '');
  };

  const handleCopy = useCallback(() => {
    if (!pitchScript) return;

    const plainText = pitchScript
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/#/g, '')
      .replace(/---/g, '')
      .replace(/\*/g, '')
      .trim();

    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
  }, [pitchScript]);

  const generateFilename = (idea: string): string => {
    if (!idea) return 'startup-logo.png';

    const slug = idea
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 6)
      .join(' ')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    return `${slug || 'startup'}-logo.png`;
  };

  const handleDownload = useCallback(() => {
    if (!logoImageUrl) return;

    const link = document.createElement('a');
    link.href = logoImageUrl;
    link.download = generateFilename(businessIdea);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [logoImageUrl, businessIdea]);


  return (
    <div className="mt-8 md:mt-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        
        {pitchScript && (
          <div className="lg:col-span-3 bg-slate-800/50 p-6 md:p-8 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-cyan-400">Roteiro do Pitch</h2>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                        copied 
                        ? 'bg-green-800/50 text-green-300' 
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                    disabled={copied}
                >
                    {copied ? (
                        <>
                            <CheckIcon />
                            <span>Copiado!</span>
                        </>
                    ) : (
                        <>
                            <CopyIcon />
                            <span>Copiar</span>
                        </>
                    )}
                </button>
            </div>
            <div 
              className="prose prose-invert prose-p:text-slate-300 prose-strong:text-slate-100 prose-headings:text-slate-200 whitespace-pre-wrap text-slate-300" 
              dangerouslySetInnerHTML={{ __html: formatScriptForDisplay(pitchScript) }}
            />
          </div>
        )}

        {logoImageUrl && (
          <div className="lg:col-span-2 bg-slate-800/50 p-6 md:p-8 rounded-xl border border-slate-700 shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Sugestão de Logo</h2>
            <div className="relative aspect-square w-full max-w-sm bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                <img src={logoImageUrl} alt="Logo Gerado por IA" className={`object-cover w-full h-full transition-opacity duration-300 ${isLogoLoading ? 'opacity-30' : 'opacity-100'}`} />
                {isLogoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70">
                        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
                    </div>
                )}
            </div>
            <div className="mt-6 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-600/50 disabled:opacity-50"
                disabled={isLogoLoading}
              >
                <DownloadIcon />
                <span>Baixar Logo</span>
              </button>
              <button
                onClick={onRegenerateLogo}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-slate-200 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLogoLoading}
              >
                {isLogoLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <RefreshCwIcon />
                    <span>Gerar Outro</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;