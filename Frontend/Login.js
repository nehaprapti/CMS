import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // 🛣️ Added for navigation

const Login = () => {
  const [role, setRole] = useState('Student');
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // 🛣️ Initialize navigation

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Role:', role);
    console.log('Register Number:', registerNumber);
    console.log('Password:', password);
    
    // 🌟 Navigate based on role
    if (role === 'Admin') {
      navigate('/admin');
    } else if (role === 'Faculty') {
      navigate('/faculty');
    } else if (role === 'Student') {
      navigate('/student');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <label style={styles.label}>Select Role:</label>
          <select
            style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Admin">Admin</option>
          </select>

          <input
          style={styles.input}
          type="text"
          placeholder={ role === 'Admin' ? 'Admin ID' : role === 'Faculty' ? 'Faculty ID' : 'Student ID'}
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
          required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    fontFamily: 'Times New Roman',
    height: '100vh',
    backgroundColor: '#130178',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    fontFamily: 'Times New Roman',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Times New Roman',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  label: {
    fontFamily: 'Times New Roman',
    display: 'block',
    marginBottom: '8px',
    textAlign: 'left',
    fontWeight: '500',
  },
  input: {
    fontFamily: 'Times New Roman',
    width: '90%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  button: {
    fontFamily: 'Times New Roman',
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgb(13, 121, 237)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },

};

export default Login;
