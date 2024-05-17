import { Alert, Box, Grid } from '@mui/material';
import { RegisterMutation } from '../../types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { googleLogin, registerUser } from './usersThunk';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import { GoogleLogin } from '@react-oauth/google';
import { openErrorMessage } from '../WarningMessage/warningMessageSlice.ts';
import ErrorMessage from '../WarningMessage/ErrorMessage.tsx';
import './Register.css';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const registering = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  console.log( error);
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    displayName: '',
    mobile: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.email || !state.password || !state.displayName) {
      (dispatch(openErrorMessage()));
      return (
        <ErrorMessage errorMessage={'Необходимые поля не заполнены!'}/>
      );
    }
    try {
      await dispatch(registerUser(state)).unwrap();
      navigate('/');
    } catch (e) {
      dispatch(openErrorMessage());
    }
  };
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };
  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <div>
      <div id="container1">
        <h1 id="about1">About You</h1>
        <p id="with">Sign Up With</p>
        <div id="signupwith">
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
          <Box>

          </Box>
        </div>
        <hr/>
        <div>
          {error && (
            <Alert severity="error" sx={{mt: 3, width: '100%'}}>
              {error.message}
            </Alert>
          )}
          <form onSubmit={submitFormHandler}>
            <p id="with2">Or create an email account</p>
            <div>
              <p className="formptg">*Full Name</p>
              <input
                type="text"
                onChange={inputChangeHandler}
                name="displayName"
                required
              />
            </div>
            <div>
              <p className="formptg"> *Email address</p>
              <input
                type="email"
                onChange={inputChangeHandler}
                name="email"
                required
              />
            </div>
            <div>
              <p className="formptg">*Password</p>
              <input
                type="password"
                onChange={inputChangeHandler}
                name="password"
                required
              />
            </div>
            <div>
              <p className="formptg">*Mobile</p>
              <input
                type="tel"
                onChange={inputChangeHandler}
                name="mobile"
                required
              />
            </div>
            <Grid item xs sx={{m: 2}}>
              <FileInput
                label="Avatar"
                name="avatar"
                onChange={fileInputChangeHandler}
              />
            </Grid>
            <div>
              <div id="check1">
                <input
                  onChange={inputChangeHandler}
                  type="checkbox"
                  name="reward"
                  id="check"
                  required
                />
                <span>
                  <p id="paracheck">
                    Include me in the PMU Altysha Read our terms
                    of use.
                  </p>
                </span>
              </div>
            </div>
            <LoadingButton
              loading={registering}
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            > Continued
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;