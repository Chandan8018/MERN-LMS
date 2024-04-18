import {
  Alert,
  Avatar,
  Button,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import icon from "../assets/logo2.png";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: errorMessage } = userState || {
    loading: false,
    error: null,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        //setErrorMessage(data.message)
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashboard?tab=profile");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-12'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left div */}
        <div className='flex-1'>
          <Link to='/'>
            <img src={icon} alt='LMS' className=' h-36' />
          </Link>

          <p className='text-sm mt-5 dark:text-white text-black'>
            You can sign in with your email and password or with Google.
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

            <Label value='Your email' />
            <TextInput
              type='email'
              placeholder='name@Company.com'
              required
              id='email'
              autoComplete='email'
              addon=<MdEmail size='20' />
              onChange={handleChange}
            />

            <Label value='Your password' />
            <TextInput
              type='password'
              placeholder='********'
              id='password'
              addon=<RiLockPasswordFill size='20' />
              onChange={handleChange}
            />

            <Button
              type='submit'
              className='bg-gradient-to-r from-[#00A6AA] via-slate-400 to-[#00A6AA] border-solid border-x border-y border-black'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex justify-between text-sm mt-5'>
            <span className='dark:text-white text-black'>
              Don't have an account?
            </span>
            <Link
              to='/sign-up'
              className='text-blue-700 font-semibold hover:underline cursor-pointer pr-4'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
