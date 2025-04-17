import React from 'react';
import { useErrorBoundary } from 'react-error-boundary';

export default function FallBack({ error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className='py-5 text-center'>
      <h1 className='text-red-600'>{error.message}</h1>
      <button
        className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
        onClick={resetBoundary}
      >
        Try again
      </button>
    </div>
  );
}
