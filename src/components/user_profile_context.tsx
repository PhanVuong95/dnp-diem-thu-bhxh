import { createContext, ReactNode, useContext, useState } from "react";
import React from "react";

export type UserProfilePros = {
  Username?: string,
  fullName?: string,
  photo?: string,
  phone?: string
}

interface SpecificContextType {
  userProfile: UserProfilePros;
  setUserProfile: (user: any) => void;
}

export const ProfileContext = createContext<SpecificContextType | null>(null);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfilePros>({
    Username: undefined,
    fullName: undefined,
    photo: undefined,
    phone: undefined
  });

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useModalLogin must be used within a ModalLoginProvider");
  }
  return context;
};
