import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type SignUpProfileDraft = {
  firstName: string;
  lastName: string;
  email: string;
};

type SignUpDraftContextValue = {
  profile: SignUpProfileDraft | null;
  setProfile: (draft: SignUpProfileDraft | null) => void;
};

const SignUpDraftContext = createContext<SignUpDraftContextValue | null>(null);

export function SignUpDraftProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<SignUpProfileDraft | null>(null);

  const setProfile = useCallback((draft: SignUpProfileDraft | null) => {
    setProfileState(draft);
  }, []);

  const value = useMemo(
    () => ({ profile, setProfile }),
    [profile, setProfile],
  );

  return (
    <SignUpDraftContext.Provider value={value}>
      {children}
    </SignUpDraftContext.Provider>
  );
}

export function useSignUpDraft(): SignUpDraftContextValue {
  const ctx = useContext(SignUpDraftContext);
  if (!ctx) {
    return {
      profile: null,
      setProfile: () => {},
    };
  }
  return ctx;
}
