import { create } from "zustand";

interface IPageLoadProgressBarStore {
  readonly isLoading: boolean;
  readonly start: () => void;
  readonly finish: () => void;
}

const usePageLoadProgressBarStore = create<IPageLoadProgressBarStore>((set) => ({
  isLoading: false,
  start(): void {
    set({ isLoading: true });
  },
  finish(): void {
    set({ isLoading: false });
  },
}));

export { usePageLoadProgressBarStore, type IPageLoadProgressBarStore };