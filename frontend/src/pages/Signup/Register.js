import React, { useActionState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

export default function Register({
  setIsRegistered,
  changeLogIn,
  setUsername,
  setConfirmPassword,
  setPassword,
  username,
  password,
  confirmPassword,
}) {
  // Represents sign up page for first time users.

  const { showBoundary } = useErrorBoundary();

  // submits form data to backend
  const register = async (any, formData) => {
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!username || !password || !confirmPassword) {
      return {
        status: 'error',
        message: 'All form fields must be entered.',
      };
    }

    if (!(password === confirmPassword)) {
      return {
        status: 'error',
        message: 'Passwords do not match',
      };
    }

    // send api request to django server to authenticate sign up info
    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setIsRegistered(true);
        console.log(
          'Registration successful. Response "ok" from Django server.',
        );
      } else if (response.status === 401) {
        return {
          status: 'error',
          message: 'Username already exists.',
        };
      }
    } catch (err) {
      console.log('Fetch resolved with errors.', err);
      showBoundary(err);
    } finally {
      setPassword(null);
      setUsername(null);
      setConfirmPassword(null);
    }
  };

  const [errMessage, registerAction] = useActionState(register, null);

  return (
    <div className='bg-gray-100 max-h-full'>
      <div className='max-w-sm mx-auto p-4 bg-white rounded-xl shadow-lg'>
        <h1>Sign Up</h1>
        <form action={registerAction}>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>Username</label>
            <input
              className='block border-2 border-gray-400 rounded'
              type='text'
              value={username || ''}
              name='username'
              onChange={changeLogIn}
            ></input>
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>Password</label>
            <input
              className='block border-2 border-gray-400 rounded'
              type='password'
              value={password || ''}
              name='password'
              onChange={changeLogIn}
            ></input>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium'>
              Confirm password
            </label>
            <input
              className='block border-2 border-gray-400 rounded'
              type='password'
              value={confirmPassword || ''}
              name='confirmPassword'
              onChange={changeLogIn}
            ></input>
          </div>
          <div className='mb-3'>
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
        <div>
          <p className='text-sm font-medium'>
            Already have an account?{' '}
            <a href='' onMouseDown={() => setIsRegistered(true)}>
              {' '}
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
