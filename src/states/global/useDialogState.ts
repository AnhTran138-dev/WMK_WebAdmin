import create from "zustand";

interface DialogState {
  dialogs: { [key: string]: boolean };
  openDialog: (key: string) => void;
  closeDialog: (key: string) => void;
  toggleDialog: (key: string) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialogs: {},
  openDialog: (key: string) =>
    set((state) => ({
      dialogs: { ...state.dialogs, [key]: true },
    })),
  closeDialog: (key: string) =>
    set((state) => ({
      dialogs: { ...state.dialogs, [key]: false },
    })),
  toggleDialog: (key: string) =>
    set((state) => ({
      dialogs: { ...state.dialogs, [key]: !state.dialogs[key] },
    })),
}));
