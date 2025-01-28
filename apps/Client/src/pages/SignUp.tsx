import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { isAuthenticated, storeToken } from '../utils/auth';


export const SignUp = () => {

  // State for form inputs
  const BACKEND_URL='http://localhost:3000';
  const [formInputs, setFormInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigator=useNavigate();
  if(isAuthenticated()){
    navigator('/dash');
  }
  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formInputs.password !== formInputs.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true); // Show loader

    try {
      const response = await fetch(BACKEND_URL+'/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formInputs.username,
          email: formInputs.email,
          password: formInputs.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      } else {
        const data = await response.json();
        storeToken(data.token);
        alert('Account created successfully!');
        navigator('dash');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="flex w-[30rem] flex-col space-y-10"
      >
        <div className="text-center text-4xl font-medium">Create Your Account</div>

        {/* Username Field */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            name="username"
            value={formInputs.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        {/* Email Field */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="email"
            name="email"
            value={formInputs.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            name="password"
            value={formInputs.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            name="confirmPassword"
            value={formInputs.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center">
            <div className="loader border-4 border-t-4 border-gray-200 h-6 w-6 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Link to Sign In */}
        <p className="text-center text-lg">
          Already have an account?{' '}
          <a
            href="/signin"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Log In
          </a>
        </p>
      </form>
    </main>
  );
};
