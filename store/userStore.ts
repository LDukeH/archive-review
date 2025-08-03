import { create } from "zustand";

interface UserState {
  user: {
    data: any;
    type: string;
  };
  setUser: (user: any) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: { data: null, type: "" },

  setUser: (user) => set({ user: { data: user.data, type: user.type } }),
}));

export default useUserStore;
