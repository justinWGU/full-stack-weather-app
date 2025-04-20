import React, { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

// Ingests login info and authenticates with a backend.
const LogIn = ({
  setIsRegistered,
  setToken,
  setUsername,
  setPassword,
  handleChange,
  username,
  password,
}) => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  // submits login information to backend for authentication.
  const login = async (any, formData) => {
    const name = formData.get('username');
    const pw = formData.get('password');

    if (!name || !pw) {
      return {
        status: 'error',
        message: 'Username and password must both be entered.',
      };
    }

    // send api request to django server to authenticate sign in info
    try {
      const url = 'http://localhost:8000/api/signin/';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, password: pw }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        navigate('/weather');
      } else if (response.status === 400) {
        return {
          status: 'error',
          message: 'No account with those credentials found.',
        };
      }
    } catch (err) {
      console.log(err);
      showBoundary(err);
    } finally {
      setUsername(null);
      setPassword(null);
    }
  };

  const [errMessage, loginAction] = useActionState(login, null);

  return (
    <div className='bg-gray-100 max-h-full'>
      <div className='max-w-sm mx-auto p-4 bg-white rounded-xl shadow-lg'>
        <h1>Login</h1>
        <form action={loginAction}>
          <div className='mb-3'>
            <label htmlFor='username' className='block text-sm font-medium'>
              Username
            </label>
            <input
              className='block border-2 border-gray-400 rounded'
              type='text'
              value={username || ''}
              id='username'
              name='username'
              onChange={handleChange}
            ></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              className='block border-2 border-gray-400 rounded'
              type='password'
              id='password'
              value={password || ''}
              name='password'
              onChange={handleChange}
            ></input>
          </div>
          <div className='mt-4'>
            <button
              className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
              type='submit'
            >
              submit
            </button>
            <div className='mt-4 text-red-600 text-sm font-bold'>
              {errMessage?.status === 'error' && <p>{errMessage.message}</p>}
            </div>
          </div>
        </form>
        <div className='mt-4'>
          <p className='text-sm font-medium'>
            Need to create an account?{' '}
            <a href='' onMouseDown={() => setIsRegistered(false)}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
