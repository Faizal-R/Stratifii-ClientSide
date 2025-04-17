"use client";
import { ComponentType, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Roles } from "@/constants/roles";

import { useAuthStore } from "@/features/auth/authStore";

// import { RiseLoader } from "react-spinners";

const withProtectedRoute = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: Roles[] = []
) => {
  return function ProtectedRoute(props: P): ReactElement | null {
    const router = useRouter();
    const { user } = useAuthStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    useEffect(() => {
      if (hydrated) {
        if (!user) {
          router.replace("/signin");
        } else if (
          allowedRoles.length > 0 &&
          !allowedRoles.includes(user.role)
        ) {
          router.replace("/unauthorized");
        }
      }
    }, [user, hydrated, router]);

    // if (!hydrated) return <RiseLoader color="white"/>;

    return user && allowedRoles.includes(user.role) ? (
      <WrappedComponent {...props} />
    ) : null;
  };
};

export default withProtectedRoute;
