import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Container,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import Link from 'next/link';

// const useStyles = makeStyles({
//   navDisplayFlex: {
//     display: `flex`,
//     justifyContent: `space-between`,
//   },
//   linkText: {
//     textDecoration: `none`,
//     textTransform: `uppercase`,
//     color: `white`,
//   },
//   navbarDisplayFlex: {
//     display: `flex`,
//     justifyContent: `space-between`,
//   },
// });

const homeLink = [{ title: `HOME`, path: `/` }];

const navLinks = [
  { title: `ABOUT`, path: `/about` },
  { title: `PRODUCT`, path: `/product` },
  { title: `LOGIN`, path: `/login` },
  { title: `REGISTER`, path: `/register` },
  { title: `LOGOUT`, path: `/logout` },
];

const Header = () => {
  // const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          maxWidth="xl"
          sx={{ display: `flex`, justifyContent: `space-between` }}
        >
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large">
              <Link component="nav" href={homeLink.path} />
            </Home>
          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            sx={{ display: `flex`, justifyContent: `space-between` }}
          >
            {navLinks.map(({ title, path }) => (
              <Link
                href={path}
                key={title}
                sx={{
                  textDecoration: `none`,
                  textTransform: `uppercase`,
                  color: `white`,
                }}
              >
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
