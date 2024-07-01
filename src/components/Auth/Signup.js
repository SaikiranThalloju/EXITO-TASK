
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = { firstName, lastName, email, password };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
      if (response.status === 201) { // Status code for created resource
        history.push('/template/my-task/react/sign-in'); // Redirect to sign-in page after successful signup
      }
    } catch (err) {
      setError(err.response.data.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "32rem" }}>
        <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit}>
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Create your account</h1>
            <span>Free access to our dashboard.</span>
          </div>
          {error && <div className="col-12 text-center text-danger mb-3">{error}</div>}
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">First name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">Last name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Parker"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="8+ characters required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Confirm password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="8+ characters required"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I accept the <a href="#!" title="Terms and Conditions" className="text-secondary">Terms and Conditions</a>
              </label>
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase">SIGN UP</button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="text-muted">Already have an account? <Link to="/template/my-task/react/sign-in" title="Sign in" className="text-secondary">Sign in here</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
