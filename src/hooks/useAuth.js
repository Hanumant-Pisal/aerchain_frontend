import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  console.log("useAuth check - auth state:", auth);
  return !!auth.token;
}

export function useUserRole() {
  const auth = useSelector((state) => state.auth);
  return auth.user?.role || null;
}
