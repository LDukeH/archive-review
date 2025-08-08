import { create } from "zustand";

interface UserState {
  user: {
    data: any;
    type: string;
  };
  setUser: (user: any) => void;

  addToFavoritesStore: (item: any) => void;
  removeFromFavoritesStore: (item: any) => void;
}

const useUserStore = create<UserState>()((set, get) => ({
  user: {
    data: null,
    type: "",
  },
  setUser: (user: any) => set({ user: { data: user.data, type: user.type } }),

  addToFavoritesStore: (item: any) => {
    const currentUser = get().user;
    if (!currentUser?.data) return;

    set((state) => ({
      user: {
        ...state.user,
        data: {
          ...state.user.data,
          favoriteReviews: [...state.user.data.favoriteReviews, item],
        },
      },
    }));
  },
  removeFromFavoritesStore: (item: any) => {
    const currentUser = get().user;
    if (!currentUser.data) return;

    set((state) => ({
      user: {
        ...state.user,
        data: {
          ...state.user.data,
          favoriteReviews: state.user.data.favoriteReviews.filter(
            (fav: any) => fav.id !== item.id
          ),
        },
      },
    }));
  },
}));

export default useUserStore;
