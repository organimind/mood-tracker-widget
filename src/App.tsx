import { useEffect, useState } from 'react';
import { MoodWidget } from './widgets/MoodWidget/MoodWidget';
import { CustomizePage } from './pages/CustomizePage';
import './App.css';

export function App() {
  const [isCustomize, setIsCustomize] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path.endsWith('/customize') || hash.includes('customize');
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsCustomize(path.endsWith('/customize') || hash.includes('customize'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isCustomize) {
      document.documentElement.classList.add('customize-mode');
      document.body.classList.add('customize-mode');
    } else {
      document.documentElement.classList.remove('customize-mode');
      document.body.classList.remove('customize-mode');
    }
  }, [isCustomize]);

  if (isCustomize) {
    return <CustomizePage />;
  }

  return (
    <main className="om-app-wrapper">
      <MoodWidget />
    </main>
  );
}

export default App;

