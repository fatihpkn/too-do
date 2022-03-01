import { User } from "@supabase/supabase-js";
import React, { createContext, useContext } from "react";
import { API } from "SupabaseAPI";

interface AuthContextData {
  user?: User | null;
}

interface AuthContextActions {
  setUser: (user?: User | null) => void;
}

const AuthContext = createContext<AuthContextData & AuthContextActions>({} as AuthContextData & AuthContextActions);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ initialValue: Partial<AuthContextData> }> = ({ children, initialValue }) => {
  console.log("initial value -> ", initialValue);

  const [user, setUser] = React.useState<User | null | undefined>(initialValue?.user || null);

  React.useEffect(() => {
    const { data: AuthData } = API.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user);
    });

    return () => {
      AuthData?.unsubscribe();
    };
  }, []);

  const handleSetUser = (us: User | null | undefined) => {
    setUser(us);
  };

  return <AuthContext.Provider value={{ user, setUser: handleSetUser }}>{children}</AuthContext.Provider>;
};
