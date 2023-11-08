import React, { useState } from 'react';
import supabase from './supabaseClient'; 

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async () => {
    
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'someone@email.com',
  password: 'some-secure-password'
})
    
    console.log('Signing in with email:', email, 'and password:', password);
  };

  const handleSignUp = async () => {
    
const { data, error } = await supabase.auth.signUp({
  email: 'someone@email.com',
  password: 'some-secure-password'
})
    console.log('Signing up with email:', email, 'and password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={isSignUp ? handleSignUp : handleSignIn}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
