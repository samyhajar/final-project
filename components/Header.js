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

// const homeLink = [{ title: `HOME`, path: `/` }];

const Header = (props) => {
  const homeLink = [{ title: `HOME`, path: `/` }];
  const navLinks = [
    { title: `Home`, path: `/` },
    { title: `${props.userName}`, path: `/profile/` },
    { title: `PDFS`, path: `/documents` },
    { title: `LOGIN`, path: `/login` },
    { title: `REGISTER`, path: `/register` },
    { title: `LOGOUT`, path: `/logout` },
  ];
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
