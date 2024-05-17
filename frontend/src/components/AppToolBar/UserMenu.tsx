import React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../features/Users/usersThunk.ts';
import { selectUser } from '../../features/Users/usersSlice.ts';
import './AppToolbar.css';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [showLoginDrop, setShowLoginDrop] = React.useState(false);

  const logOuted = async () => {
    await dispatch(logout()).unwrap();
    navigate('/');
  };

  return (
      <div
        className="account_opt"
        onMouseEnter={() => {
          setShowLoginDrop(true);
        }}
        onMouseLeave={() => setShowLoginDrop(false)}
      >
        <NavLink
          to="/login"
          className="link"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            color: '#fff',
            gap: '15px',
            fontSize: '14px',
          }}
        >
          <div>
            <svg
              className="UserDropDowns_icon_06"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke="#2F3337"
              fill="#2F3337"
            >
              <title>User</title>
              <path
                d="M1 23c0-5.523 4.477-10 10-10h2c5.523 0 10 4.477 10 10M12 13a6 6 0 100-12 6 6 0 000 12z"
                stroke="#fff"
                fill="none"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <p style={{marginTop: '12px'}}>Account</p>
        </NavLink>
        {showLoginDrop ? (
          user ? (
            <div className="OnloginDropdown">
              <div className="logButtDiv">
                <button
                  className="loglot"
                  onClick={logOuted}
                >
                  Logout
                </button>
              </div>
              <NavLink to="/wishlist">My Favorites</NavLink>
              <NavLink to="/cart">My Orders</NavLink>
              <NavLink to="/">My Wishlist</NavLink>
              <NavLink to="/">Your Referals</NavLink>
            </div>
          ) : (
            <div className="OnlogoutDropdown">
              <div className="logButtDiv">
                <Button component={NavLink} to='/login' className="loglot">
                  Login
                </Button>
                <Button component={NavLink} to='/register' className="logreg">
                  Register
                </Button>
              </div>
              <NavLink to="/wishlist">My Favorites</NavLink>
              <NavLink to="/cart">My Orders</NavLink>
              <NavLink to="/">My Wishlist</NavLink>
              <NavLink to="/">Your Referals</NavLink>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
 );
};

export default UserMenu;