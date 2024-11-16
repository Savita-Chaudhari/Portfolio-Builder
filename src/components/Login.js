
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

function Login() {
  const redirect = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userid')) {
      redirect('/');
    }
  }, []);

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const getForm = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const validation = () => {
    let result = true;

    if (formValue.email === '') {
      toast.error('Email Field is required');
      result = false;
      return false;
    }
    if (formValue.password === '') {
      toast.error('Password Field is required');
      result = false;
      return false;
    }
    return result;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validation()) {
      try {
        const res = await axios.get(`http://localhost:3000/user?email=${formValue.email}`);

        if (res.data.length > 0) {
          const user = res.data[0];

          if (user.password === formValue.password) {

            localStorage.setItem('userid', user.id);
            localStorage.setItem('uname', user.name);

            toast.success('Login Success');
            redirect('/');
          }
          else {
            toast.error('Incorrect password');
          }
        } else {
          toast.error('Email does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('An error occurred. Please try again later.');
      }
    }
  };





  return (
    <div>
      {/* <Header2 /> */}
      <center>


        <div className="wrapper">
          <h2>Registration</h2>
          <form action="#" method="post" onSubmit={submitHandler}>

            <div className="input-box">
              <input type="text" placeholder="Enter your email" className="form-control" name="email" value={formValue.email} onChange={getForm} id="email" required />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Enter password" className="form-control" name="password" value={formValue.password} onChange={getForm} id="password" required />
            </div>


            <div className="input-box button">
              <input type="Submit" defaultValue="Login Now" />
            </div>
            <div className="text">
              <h3>Don't have an account?  <Link to="/signup">Signup now</Link></h3>
            </div>
          </form>
        </div>


      </center>
    </div>
  )
}

export default Login