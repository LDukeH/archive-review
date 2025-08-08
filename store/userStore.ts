import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    data: any;
    type: string;
  };
  setUser: (user: any) => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: {
    data: null,
    type: "",
  },
  setUser: (user: any) => set({ user: { data: user.data, type: user.type } }),
}));

export default useUserStore;
