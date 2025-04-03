import { create } from 'zustand';
import { T_UserInfo } from '@/components/UserInfo/infoType';
import UserInstance from '@/utils/UserInstance';

interface I_UserState {
  user: T_UserInfo | null;
  fetchUser: () => Promise<void>;
  resetUser: () => void;
}

const useUserStore = create<I_UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const response = await UserInstance.get('/account/me/');
      const userInfo = response.data.data;

      set({ user: userInfo });
    } catch (error) {
      console.log('유저 정보 불러오기 실패😨', error);
    }
  },
  resetUser: () => set({ user: null }),
}));

export default useUserStore;
