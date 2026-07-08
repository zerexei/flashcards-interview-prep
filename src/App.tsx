import { useEffect } from 'react';
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import Login from '@/pages/Auth/Login';
import { FlashcardGamePage } from '@/pages/Game/FlashcardGamePage';
import { FlashcardAdminPage } from '@/pages/Admin/FlashcardAdminPage';
import ROUTES from '@/routes';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AdminRoute = ({ isFirebaseEnabled, isAdmin }: { isFirebaseEnabled: boolean; isAdmin: boolean }) => {
  // If Firebase is not configured, admin is unauthorized.
  if (!isFirebaseEnabled || !isAdmin) {
    return <Navigate to={ROUTES.flashcards.path} replace />;
  }
  return <Outlet />;
};

const LoginRoute = ({ isFirebaseEnabled, isAuth }: { isFirebaseEnabled: boolean; isAuth: boolean }) => {
  // If Firebase is disabled or user is already logged in, redirect to flashcards.
  if (!isFirebaseEnabled || isAuth) {
    return <Navigate to={ROUTES.flashcards.path} replace />;
  }
  return <Login />;
};

function App() {
  const { isAuth, isAdmin, isFirebaseEnabled, loading } = useAuthContext();

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

          {/* Login Route (Guest usage redirects to flashcards if Firebase is disabled) */}
          <Route
            path={ROUTES.login.path}
            element={<LoginRoute isFirebaseEnabled={isFirebaseEnabled} isAuth={isAuth} />}
          />

          {/* Guest Route: Flashcard game page is open to everyone */}
          <Route path={ROUTES.flashcards.path} element={<FlashcardGamePage />} />

          {/* Admin routes: Lock if no config or not admin */}
          <Route
            element={<AdminRoute isFirebaseEnabled={isFirebaseEnabled} isAdmin={isAdmin} />}
          >
            <Route path={ROUTES.admin.flashcards.path} element={<FlashcardAdminPage />} />
          </Route>

          <Route path="*" element={<Navigate to={ROUTES.home.path} replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
