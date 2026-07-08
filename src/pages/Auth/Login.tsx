import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '@/utils/database';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Section } from '@/components/Section';
import { Mail, Lock, User, Chrome, Loader2, ArrowRight } from 'lucide-react';
import ROUTES from '@/routes';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth!, googleProvider!);
      navigate(ROUTES.flashcards.path);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth!, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth!, email, password);
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      }
      navigate(ROUTES.flashcards.path);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-md px-6 animate-fade-in">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {isLogin ? 'Welcome Back' : 'Join the Lab'}
          </h1>
          <p className="text-neutral-foreground">
            {isLogin
              ? 'Log in to access your technical cards.'
              : 'Create an account to start your learning journey.'}
          </p>
        </div>

        <div className="card p-8 space-y-8">
          {/* Social Sign-in */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full button button-secondary gap-3"
          >
            <Chrome size={20} className="text-primary" />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-neutral-foreground font-bold tracking-widest">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {error && (
              <div className="p-3 badge badge-danger w-full text-center justify-center rounded-lg">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-foreground" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="form-input pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-foreground" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full button button-primary button-lg gap-2"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="button button-link text-sm"
            >
              {isLogin ? (
                <>Don&apos;t have an account? <span className="text-primary font-bold">Sign up</span></>
              ) : (
                <>Already have an account? <span className="text-primary font-bold">Log in</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AuthPage;
