import { useSelector } from "react-redux";

export default function useToken() {
  const token = useSelector((state) => state.user.token);
  return token ? `Bearer ${token}` : null;
}
