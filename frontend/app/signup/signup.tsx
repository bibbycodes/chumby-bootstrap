import { useState } from 'react';
import axios from 'axios';

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');  // clear out any previous errors

    try {
      const response = await axios.post('http://localhost:4000/auth/signup', { email, password });
      // handle successful signup, e.g., redirect to a different page
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.response.data.message);  // show error message from server
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      {error && <div className="error">{error}</div>}

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
