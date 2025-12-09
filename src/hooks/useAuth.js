import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  return useMemo(() => !!auth.token, [auth.token]);
}

export function useUserRole() {
  const auth = useSelector((state) => state.auth);
  return useMemo(() => auth.user?.role || null, [auth.user?.role]);
}
