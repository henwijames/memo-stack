import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicRoute;
