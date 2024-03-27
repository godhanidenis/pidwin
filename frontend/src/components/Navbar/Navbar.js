import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { styles } from "./styles";
import SavingsIcon from "@mui/icons-material/Savings";
import { LOGOUT } from "../../reducers";

const Navbar = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const {
    data: userData,
    error: userDataError,
    loading: userDataLoading,
  } = useSelector((state) => state.userProfile);

  const logout = () => {
    dispatch({ type: LOGOUT });
    history("/auth");
  };

  if (userDataLoading && !userData?.data) {
    return <></>;
  } else {
    return (
      <AppBar sx={styles.appBar} position="static" color="inherit">
        <div sx={styles.brandContainer}>
          <Typography
            component={Link}
            to="/"
            sx={styles.heading}
            variant="h5"
            align="center"
          >
            CoinToss
          </Typography>
        </div>
        <Toolbar sx={styles.toolbar}>
          {userData?.data ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
                <Avatar
                  sx={styles.purple}
                  alt={userData?.data?.name}
                  src={userData?.data?.picture}
                >
                  {userData?.data?.name.charAt(0)}
                </Avatar>
                <Typography sx={styles.userName} variant="h6">
                  {userData?.data?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chip
                  icon={<SavingsIcon sx={{ fill: "#FFD700" }} />}
                  label={
                    <Typography sx={{ fontWeight: "bold", color: "white" }}>
                      {userData?.data?.tokens} Tokens
                    </Typography>
                  }
                  sx={{ background: "black" }}
                />
                <Button
                  variant="contained"
                  sx={styles.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    history("/password");
                  }}
                >
                  Set Password
                </Button>
              </Box>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
};

export default Navbar;
