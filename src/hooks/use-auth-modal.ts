import { create } from 'zustand';

interface AuthModalState {
  isOpen: boolean;
  isSignIn: boolean; // To toggle between Sign In and Sign Up views
  openModal: (signIn?: boolean) => void;
  closeModal: () => void;
  toggleView: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  isSignIn: true,
  openModal: (signIn = true) => set({ isOpen: true, isSignIn: signIn }),
  closeModal: () => set({ isOpen: false }),
  toggleView: () => set((state) => ({ isSignIn: !state.isSignIn })),
}));
