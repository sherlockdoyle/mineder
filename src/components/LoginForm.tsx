'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import GitHub from './GitHub';

const LoginForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  return (
    <motion.div
      className='w-full max-w-md rounded-3xl border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg'
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='absolute top-0 right-0'>
        <GitHub />
      </div>

      <motion.div className='mb-8 text-center' initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className='mb-2 text-4xl font-bold text-white'>Mineder</h1>
        <p className='text-white/70'>Find your only match</p>
      </motion.div>

      <form
        className='space-y-6'
        onSubmit={async e => {
          e.preventDefault();
          setIsLoading(true);
          setError('');

          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) router.push('/swipe');
            else setError(data.error ?? 'Login failed. Please try again.');
          } catch (_) {
            setError('An unexpected error occurred. Please try again.');
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <input
            className='w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition-all focus:ring-2 focus:ring-pink-500 focus:outline-none'
            type='text'
            value={username}
            placeholder='Username'
            autoFocus
            onChange={e => setUsername(e.target.value)}
          />
        </motion.div>

        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <input
            className='w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition-all focus:ring-2 focus:ring-pink-500 focus:outline-none'
            type='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </motion.div>

        {error && (
          <motion.div
            className='text-center text-sm text-red-300'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <motion.button
          className='w-full cursor-pointer rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: isLoading ? 0.5 : 1 }}
          transition={{ delay: 0.5 }}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </motion.button>
      </form>
    </motion.div>
  );
};
export default LoginForm;
