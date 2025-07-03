
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubscriptionRecord {
  subscriberId: string;
  planId: string;
  status: "active" | "expired" | "canceled" | "pending";
}

interface SubscriptionState {
  subscription: SubscriptionRecord | null;
  setSubscription: (sub: SubscriptionRecord) => void;
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
