import { create } from "zustand";

type Store = {
  cart: number;
  setCart: (count: number) => void;
};

const useStore = create<Store>()((set) => ({
  cart: 0,
  setCart: (count) => set({ cart: count }),
}));
export default useStore;
