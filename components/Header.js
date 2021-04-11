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
import Image from 'next/image';

// const homeLink = [{ title: `HOME`, path: `/` }];

const Header = (props) => {
  const homeLink = [{ title: `HOME`, path: `/` }];
  const navLinks = [
    { title: `Home`, path: `/` },
    { title: `${props.userName}`, path: `/profile/` },
    { title: `CREATOR`, path: `/creator` },
    { title: `PDFS`, path: `/documents` },
    { title: `REGISTER`, path: `/register` },
  ];

  if (props.session) {
    navLinks.push({ title: `LOGOUT`, path: `/logout` });
  } else {
    navLinks.push({ title: `LOGIN`, path: `/login` });
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          maxWidth="xl"
          sx={{ display: `flex`, justifyContent: `space-between` }}
        >
          <IconButton edge="start" color="inherit" aria-label="home">
            {/* <Home fontSize="large">
              <Link component="nav" href={homeLink.path} /> */}
            <Image
              src="/images/postify.png"
              width="50px"
              height="20px"
              alt="lol"
            />
            {/* </Home> */}
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
