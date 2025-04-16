import React from 'react';
import { useErrorBoundary } from 'react-error-boundary';

export default function FallBack({ error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div>
      <p>{error.message}</p>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}
