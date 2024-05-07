import React, { useState } from 'react';
import { LoginMutation } from '../../types';
import { Alert } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { googleLogin, loginUser } from './usersThunk';
import { selectLoginError, selectLoginLoading } from './usersSlice.ts';
import { openErrorMessage } from '../WarningMessage/warningMessageSlice.ts';
import { GoogleLogin } from '@react-oauth/google';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import './Login.css';

const Login = () => {
  const dispatch = useAppDispatch();
  const logining = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: ''
  });
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(loginUser(state)).unwrap();
    navigate('/');
  };
  const googleLoginHandler = async (credential: string) => {
    try {
      await dispatch(googleLogin(credential)).unwrap();
      navigate('/');
    } catch (e) {
      dispatch(openErrorMessage());
    }
  };
  return (
      <div id="container">
        <div
          id="main"
          style={{
            paddingTop: "0px",
            marginTop: "5px",
          }}
        >
        </div>
        {error && (
          <Alert severity="error" sx={{mt:3, width:'100%'}}>
            {error.error}
          </Alert>
        )}
        <div id="body">
          <div id="bigdiv">
            <form onSubmit={submitFormHandler}>
              <div>
                <p id="cus1">Existing Customers</p>
                <div>
                  <p id="ep">*Email address</p>
                  <input
                    type="text"
                    name="email"
                    onChange={inputChangeHandler}
                    className="inputss"
                  />
                </div>
              </div>
              <div>
                <div>
                  <p id="ep">*Password</p>
                  <input
                    type="password"
                    name="password"
                    onChange={inputChangeHandler}
                    className="inputss"
                  />
                </div>
              </div>
              <LoadingButton
                loading={logining}
                type="submit"
                fullWidth
                className="inputss"
                variant="contained"
                sx={{mt: 3, m: 2}}
              >
                Login to your account
              </LoadingButton>
              <p id="ep1">Or, Continue with</p>
            </form>
            <Box>
              <GoogleLogin onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
               onError={() => {
                 console.log('Login failed!');
               }}
              />
            </Box>
          </div>
          <div id="smldiv">
            <p id="cus">New Customers</p>
            <button className="continue_2">
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/register"
              >
                {" "}
                CONTINUE{" "}
              </NavLink>
            </button>
          </div>
        </div>
      </div>
  );
};

export default Login;