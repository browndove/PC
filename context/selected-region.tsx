import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type SelectedRegionContextValue = {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
};

const SelectedRegionContext = createContext<SelectedRegionContextValue | null>(
  null,
);

export function SelectedRegionProvider({ children }: { children: ReactNode }) {
  const [selectedRegion, setSelectedRegionState] = useState<string | null>(null);

  const setSelectedRegion = useCallback((region: string | null) => {
    setSelectedRegionState(region);
  }, []);

  const value = useMemo(
    () => ({ selectedRegion, setSelectedRegion }),
    [selectedRegion, setSelectedRegion],
  );

  return (
    <SelectedRegionContext.Provider value={value}>
      {children}
    </SelectedRegionContext.Provider>
  );
}

export function useSelectedRegion(): SelectedRegionContextValue {
  const ctx = useContext(SelectedRegionContext);
  if (!ctx) {
    return {
      selectedRegion: null,
      setSelectedRegion: () => {},
    };
  }
  return ctx;
}
