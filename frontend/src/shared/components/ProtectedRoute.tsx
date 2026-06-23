import { Navigate } from "react-router-dom";
import { getCurrentUserName } from "../../store/selectors";
import { useAppSelector } from "../../store/store-hooks";

type ProtectedRouteProps = {
  element: React.ReactElement;
};

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const currentUser = useAppSelector(getCurrentUserName);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
