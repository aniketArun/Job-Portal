import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <ListItem button component={Link} to="/jobs">
        <ListItemText primary="Jobs" />
      </ListItem>
      <ListItem button component={Link} to="/post-job">
        <ListItemText primary="Post a Job" />
      </ListItem>
      <ListItem button component={Link} to="/applications">
        <ListItemText primary="Applications" />
      </ListItem>
      <ListItem button component={Link} to="/login">
        <ListItemText primary="Login" />
      </ListItem>
    </List>
  );
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken"); // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login"); // Redirect to login page after logout
  };
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          as={Link}
          to="/"
        >
          Job Platform
        </Typography>
        <Button color="inherit" component={Link} to="/jobs" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Jobs
        </Button>
        <Button color="inherit" component={Link} to="/post-job" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Post a Job
        </Button>
        <Button color="inherit" component={Link} to="/applications" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Applications
        </Button>
        <Box>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { sm: 'none' } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
