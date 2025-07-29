import LoginForm from '@/components/LoginForm';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4'>
      <LoginForm />
    </div>
  );
}
