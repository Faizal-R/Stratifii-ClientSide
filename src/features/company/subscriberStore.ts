
import { ISubscriptionDetails } from '@/types/ISubscription';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



interface SubscriptionState {
  subscription: ISubscriptionDetails | null;
  setSubscription: (sub: ISubscriptionDetails) => void;
  clearSubscription: () => void;
}

const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscription: null,
      setSubscription: (sub) => set({ subscription: sub }),
      clearSubscription: () => set({ subscription: null }),
    }),
    {
      name: 'subscription-store', 
    }
  )
);

export default useSubscriptionStore;
