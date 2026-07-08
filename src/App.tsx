import { useEffect } from 'react';
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Layout } from '@/components/layout/Layout';
import Login from '@/pages/Auth/Login';
import { FlashcardGamePage } from '@/modules/flashcard/game/FlashcardGamePage';
import { FlashcardAdminPage } from '@/modules/flashcard/admin/FlashcardAdminPage';
import ROUTES from '@/routes';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Defined outside App to avoid re-creation on every render.
const ProtectedRoute = ({ isAuth }: { isAuth: boolean }) =>
  isAuth ? <Outlet /> : <Navigate to={ROUTES.login.path} replace />;

const AdminRoute = ({ isAuth, isAdmin }: { isAuth: boolean; isAdmin: boolean }) => {
  if (!isAuth) return <Navigate to={ROUTES.login.path} replace />;
  if (!isAdmin) return <Navigate to={ROUTES.flashcards.path} replace />;
  return <Outlet />;
};

const LoginRoute = ({ isAuth }: { isAuth: boolean }) =>
  isAuth ? <Navigate to={ROUTES.flashcards.path} replace /> : <Login />;

function App() {
  const { isAuth, isAdmin, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.home.path} element={<Layout />}>
          {/* Redirect / to /flash-cards */}
          <Route index element={<Navigate to={ROUTES.flashcards.path} replace />} />

          {/* Redirect authenticated users away from /login */}
          <Route path={ROUTES.login.path} element={<LoginRoute isAuth={isAuth} />} />

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path={ROUTES.flashcards.path} element={<FlashcardGamePage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute isAuth={isAuth} isAdmin={isAdmin} />}>
            <Route path={ROUTES.admin.flashcards.path} element={<FlashcardAdminPage />} />
          </Route>

          <Route path="*" element={<Navigate to={ROUTES.home.path} replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
