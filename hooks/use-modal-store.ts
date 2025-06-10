import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '@/lib/generated/prisma'; // If you generated Prisma types
// If you don't have prisma types generated, define your own interface for Profile!

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'profile-storage', // key in localStorage
    }
  )
);
