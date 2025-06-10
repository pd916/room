import { create } from 'zustand';

export type ModelType = "editProfile";

 interface ModalStore {
    type: ModelType | null;
    apiUrl?: string;
    query?: Record<string, any>
    data?: Record<string, any>;
    isOpen: boolean;
    onOpen: (type: ModelType) => void;
    onClose: () => void;
}

export const useModelStore = create<ModalStore>((set) => ({
    type:null,
    data: {},
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type}),
    onClose: () => set({type: null, isOpen: false}),
}));