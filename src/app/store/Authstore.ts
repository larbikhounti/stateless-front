import {create} from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';

type Store = {
  accessToken: string | null
  setAccessToken: (token : string) => void
  clearAccessToken : () => void
}

const useAuthStore = create<Store>()(persist((set) => ({
      accessToken : '' ,
      setAccessToken: (token : string) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage',
      
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
