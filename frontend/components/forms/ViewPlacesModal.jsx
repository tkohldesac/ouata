import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { IconButton, Grid, Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditPlaceModal from "./EditPlaceModal";

const useStyles = makeStyles((theme) => ({
    input: {
        border: 'rgba(0,0,0,.2)'
    },
    iconButtonsContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '1rem',
    },
    iconButton: {
        bottom: '0',
        right: '0',
    },
}));

export default function createPlaceModal() {
    const [places, setPlaces] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axiosConfig.get('/get-places');

                setPlaces(response.data);

            } catch (error) {
                console.error('Failed to fetch places:', error);
            }
        };

        fetchPlaces();
    }, []);

    const classes = useStyles();

    const handleDelete = async (id) => {
        try {
            const deletePlace = await axiosConfig.delete('/delete-place', { data: { id } },

            );
            if (deletePlace.status >= 200 && deletePlace.status < 300) {
                console.log('Place Deleted!');
                const response = await axiosConfig.get('/get-places');
                setPlaces(response.data);
            }
        } catch (error) {
            console.error('Error deleting place:', error);
        }
    };
    
    const handleEdit = (id) => {
        setSelectedPlaceId(id);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setSelectedPlaceId(null);
        setEditModalOpen(false);
    };

    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>VIEW PLACES</Typography>
                {places.map((place) => (
                    <Grid key={place.id}>
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >
                            <Typography variant="h5" component="h2">{place.place_name}</Typography>
                            <Typography variant="body1" component="p" >Description: {place.physical_description}</Typography>
                            <Typography variant="body1" component="p" >Sovereign: {place.sovereign}</Typography>
                            <div className={classes.iconButtonsContainer}>
                                <IconButton aria-label="delete" className={classes.iconButton} onClick={() => handleEdit(place.id)}>
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                                <IconButton aria-label="delete" className={classes.iconButton} onClick={() => handleDelete(place.id)}>
                                    <DeleteForeverIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </div>
                        </Container>
                    </Grid>
                ))}
                <Modal
                    open={editModalOpen && selectedPlaceId !== null}
                    onClose={closeEditModal}
                    className={classes.modal}
                    disableEnforceFocus
                >
                    {selectedPlaceId !== null && <EditPlaceModal placeId={selectedPlaceId} />}
                </Modal>
            </Container>
        </ >
    )
}