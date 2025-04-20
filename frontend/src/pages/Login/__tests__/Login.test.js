import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import LogIn from '../LogIn';
import { MemoryRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

describe(LogIn, () => {
  it('displays username & password inputs and a button', () => {
    // render the component
    render(
      <Router>
        <ErrorBoundary>
          <LogIn handleChange={() => {}}></LogIn>
        </ErrorBoundary>
      </Router>,
    );

    // manipulate a component or find text within it
    const userInput = screen.getByRole('textbox');
    const pwInput = screen.getByLabelText('Password');
    const button = screen.getByRole('button');

    // assertion - confidentally state that the component is doing what it should
    expect(userInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls onChange method when user types', () => {
    // mock the onChange method
    const onChangeMock = jest.fn();

    render(
      <Router>
        <ErrorBoundary>
          <LogIn handleChange={onChangeMock}></LogIn>
        </ErrorBoundary>
      </Router>,
    );

    // select both inputs
    const userInput = screen.getByRole('textbox', {
      name: /username/i,
    });
    const pwInput = screen.getByLabelText('Password');

    // simulate user typing
    user.click(userInput);
    user.keyboard('un');
    user.click(pwInput);
    user.keyboard('pw');

    // assert that onChangeMock was called for both inputs the correct number of times
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledTimes(4);
  });
});
