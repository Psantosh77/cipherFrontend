import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SignIn from "../pages/signIn/signin";
import Register from "../pages/registration/registration";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const isLogin = localStorage.getItem("isLogin");



  const [auth, setAuth] = React.useState("false");
  const [apistatus, setStatus] = React.useState("false");

  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    setAuth(isLogin);
  }, [apistatus]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpenSignModal = () => {
    setOpen(true);
  };
  const [toggleSigninSignUp, settoggleSigninSignUp] = React.useState(false);
  const handleClosesSignModal = () => {
    setOpen(false);
    settoggleSigninSignUp(false);
  };

  const toggle = () => {
    settoggleSigninSignUp(!toggleSigninSignUp);
  };

  const handleLogOut = () => {
    setAuth("false");
    history.push("/")
    localStorage.setItem("isLogin", "false");
    window.location.reload();
    localStorage.clear();
  };

  const onClickProfile =()=>{
    history.push("/profile")
    window.location.reload();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
     
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png"
            alt="icon"
            width="20px"
          />
          &nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cipher
          </Typography>
          {auth == "true" ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>(handleClose() , onClickProfile())}>Profile</MenuItem>
                <MenuItem onClick={() => (handleClose(), handleLogOut())}>
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Typography onClick={handleOpenSignModal}>signin</Typography>
            </>
          )}
        </Toolbar>
      </AppBar>

      {open && !toggleSigninSignUp && (
        <SignIn
          setStatus={setStatus}
          toggle={toggle}
          setAuth={setAuth}
          open={open}
          handleOpenSignModal={handleOpenSignModal}
          handleClosesSignModal={handleClosesSignModal}
        />
      )}

      {open && toggleSigninSignUp && (
        <Register
          setStatus={setStatus}
          toggle={toggle}
          setAuth={setAuth}
          open={open}
          handleOpenSignModal={handleOpenSignModal}
          handleClosesSignModal={handleClosesSignModal}
        />
      )}
    </Box>
  );
};

export default Header;
