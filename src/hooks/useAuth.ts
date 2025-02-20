import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate();

  const signOut = async () => {
    await clerk.signOut();
    navigate("/");
  };

  return {
    user,
    isLoaded,
    isSignedIn,
    signOut,
  };
}
