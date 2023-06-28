import React from 'react';
import { AppBar, ThemeProvider, Modal } from '@mui/material';
import { Button, Typography, ButtonGroup } from '@material-ui/core';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Person2Icon from '@mui/icons-material/Person2';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreatePersonModal from './forms/CreatePersonModal';
import CreatePlaceModal from './forms/CreatePlaceModal';
import CreateThingModal from './forms/CreateThingModal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'secondary',
  },
  button: {
    color: '#f4a2fd',
  },
  modal: {

    margin: 'auto',
    marginTop: '5%',
    width: 400,

  }
}));

export default function TopBar({ theme }) {
  const [personModalOpen, setPersonModalOpen] = React.useState(false);
  const [placeModalOpen, setPlaceModalOpen] = React.useState(false);
  const [thingModalOpen, setThingModalOpen] = React.useState(false);

  const openPersonModal = () => setPersonModalOpen(true);
  const closePersonModal = () => setPersonModalOpen(false);
  const openPlaceModal = () => setPlaceModalOpen(true);
  const closePlaceModal = () => setPlaceModalOpen(false);
  const openThingModal = () => setThingModalOpen(true);
  const closeThingModal = () => setThingModalOpen(false);

  const createPerson = () => {
    console.log('Person Modal');
    openPersonModal();
  };

  const createPlace = () => {
    console.log('Place Modal');
    openPlaceModal();
  };

  const createThing = () => {
    console.log('Thing Modal');
    openThingModal();
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar display="flex"
        alignItems="center"
        justifyContent="center"
        p={1}>
        <Box>
          Hi
        </Box>
      </AppBar>
      <AppBar className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={1}
        >
          <ButtonGroup variant="text">
            <Button onClick={createPerson} className={classes.button}>
              <Person2Icon style={{ paddingRight: '.2rem' }} /> Create A Person
            </Button>
            <Modal
              keepMounted
              open={personModalOpen}
              onClose={closePersonModal}
              className={classes.modal}
            >
              <CreatePersonModal />
            </Modal>

            <Button onClick={createPlace} className={classes.button}>
              <LocationCityIcon style={{ paddingRight: '.2rem' }} /> Create A Place
            </Button>
            <Modal
              keepMounted
              open={placeModalOpen}
              onClose={closePlaceModal}
              className={classes.modal}
            >
              <CreatePlaceModal />

            </Modal >
            <Button onClick={createThing} className={classes.button}>
              <ShoppingBagIcon style={{ paddingRight: '.2rem' }} />Create A Thing
            </Button>
            <Modal
              open={thingModalOpen}
              onClose={closeThingModal}
              className={classes.modal}
            >
              <CreateThingModal />

            </Modal>
          </ButtonGroup>
        </Box>
      </AppBar>
    </ThemeProvider >
  );
}
