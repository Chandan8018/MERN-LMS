import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Button,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);

      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen mt-12'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left div */}
        <div className='flex-1'>
          <Link
            to='/'
            className=' font-bold dark:text-white text-4xl flex items-center'
          >
            <Avatar
              img='https://i.pinimg.com/originals/4b/83/b8/4b83b890a44d679f7e510396e09b49c5.gif'
              alt='LMS'
              size='lg'
            />
            <span className='px-2 py-1 bg-gradient-to-r from-purple-900 via-slate-400 to-blue-600 rounded-lg text-white'>
              Books'
            </span>
            Club
          </Link>
          <p className='text-sm mt-5 dark:text-white text-black'>
            You can sign up with your email and password or with Google.
          </p>
        </div>

        {/* right div */}
        <div className='flex-1'>
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}

            <Label value='Your username' />
            <TextInput
              type='text'
              placeholder='Username'
              id='username'
              required
              addon=<FaUser size='20' />
              onChange={handleChange}
            />

            <Label value='Your email' />
            <TextInput
              name='email'
              type='email'
              placeholder='name@Company.com'
              id='email'
              addon=<MdEmail size='20' />
              onChange={handleChange}
            />

            <Label value='Your password' />
            <TextInput
              type='password'
              placeholder='Password'
              id='password'
              addon=<RiLockPasswordFill size='20' />
              onChange={handleChange}
            />

            <Button
              type='submit'
              className='bg-gradient-to-r from-purple-900 via-slate-400 to-blue-600'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>

          <div className='flex justify-between text-sm mt-5'>
            <span className='dark:text-white text-black'>Have an account?</span>
            <Link
              to='/sign-in'
              className='text-blue-700 font-semibold hover:underline cursor-pointer pr-4'
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
