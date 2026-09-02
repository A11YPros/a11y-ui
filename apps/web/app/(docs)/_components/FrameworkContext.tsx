'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Framework = 'react' | 'wc';

interface FrameworkContextType {
  framework: Framework;
  setFramework: (framework: Framework) => void;
}

const FrameworkContext = createContext<FrameworkContextType>({
  framework: 'react',
  setFramework: () => {},
});

const STORAGE_KEY = 'a11ypros_preferred_framework';

export function FrameworkProvider({ children }: { children: React.ReactNode }) {
  const [framework, setFrameworkState] = useState<Framework>('react');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'react' || stored === 'wc') {
        setFrameworkState(stored);
        document.documentElement.setAttribute('data-framework', stored);
      } else {
        document.documentElement.setAttribute('data-framework', 'react');
      }
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const setFramework = (next: Framework) => {
    setFrameworkState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute('data-framework', next);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <FrameworkContext.Provider value={{ framework, setFramework }}>
      {children}
    </FrameworkContext.Provider>
  );
}

export function useFramework() {
  return useContext(FrameworkContext);
}
