import React, { useState, useCallback } from 'react';
import { generatePitchScript, generateLogoImage } from './services/geminiService';
import Header from './components/Header';
import IdeaInputForm from './components/IdeaInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [businessIdea, setBusinessIdea] = useState<string>('');
  const [pitchScript, setPitchScript] = useState<string | null>(null);
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogoLoading, setIsLogoLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (idea: string) => {
    if (!idea.trim()) {
      setError('Por favor, insira uma ideia de negócio.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPitchScript(null);
    setLogoImageUrl(null);

    try {
      const [script, imageUrl] = await Promise.all([
        generatePitchScript(idea),
        generateLogoImage(idea),
      ]);
      
      setPitchScript(script);
      setLogoImageUrl(imageUrl);

    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao gerar o conteúdo. Por favor, verifique sua chave de API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRegenerateLogo = useCallback(async () => {
    if (!businessIdea.trim()) return;

    setIsLogoLoading(true);
    setError(null);

    try {
      const imageUrl = await generateLogoImage(businessIdea);
      setLogoImageUrl(imageUrl);
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao gerar um novo logo. Tente novamente.');
    } finally {
      setIsLogoLoading(false);
    }
  }, [businessIdea]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <IdeaInputForm 
            businessIdea={businessIdea} 
            setBusinessIdea={setBusinessIdea}
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
          />

          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          {isLoading && <Loader />}

          {!isLoading && (pitchScript || logoImageUrl) && (
            <ResultsDisplay 
              pitchScript={pitchScript} 
              logoImageUrl={logoImageUrl}
              businessIdea={businessIdea}
              onRegenerateLogo={handleRegenerateLogo}
              isLogoLoading={isLogoLoading}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;