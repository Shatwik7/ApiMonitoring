import React, { useState } from 'react';
import { isAuthenticated, storeToken } from '../utils/auth';
import {useNavigate }from 'react-router-dom';

export const SignIn = () => {
  // State for form inputs
  const BACKEND_URL='http://localhost:3000';
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
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
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true); // Show loader

    try {
      // API call
      const response = await fetch(BACKEND_URL+'/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      } else {
        const data = await response.json();
        storeToken(data.token);
        alert('Logged in successfully!');
        navigator('/dash');
        console.log(data);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Hide loader
    }
  };


  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="flex w-[30rem] flex-col space-y-10"
      >
        <div className="text-center text-4xl font-medium">Log In</div>

        {/* Username or Email Field */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        {/* Log In Button */}
        <button
          type="submit"
          className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Logging In...' : 'LOG IN'}
        </button>

        {/* Forgot Password Link */}
        <a
          href="#"
          className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
        >
          FORGOT PASSWORD?
        </a>

        {/* Sign Up Link */}
        <p className="text-center text-lg">
          No account?{' '}
          <a
            href="/signup"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Create One
          </a>
        </p>
      </form>
    </main>
  );
};
