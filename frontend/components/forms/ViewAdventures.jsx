import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig';
import AdventuresModule from "./AdventuresModule";

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
    modal: {
        margin: 'auto',
        marginTop: '5%',
        maxWidth: 600,
        overflow: 'auto'
    },
}));

export default function ViewAdventures() {

    const [adventures, setAdventures] = useState([]);


    const handleDelete = async (id) => {
        try {
            const deleteAdventure = await axiosConfig.delete('/delete-adventure', { data: { id } },

            );
            if (deleteAdventure.status >= 200 && deleteAdventure.status < 300) {
                console.log('Adventure Deleted!');
                const response = await axiosConfig.get('/get-adventures');
                setAdventures(response.data);
            }
        } catch (error) {
            console.error('Error deleting adventure:', error);
        }

    };


    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const response = await axiosConfig.get('/get-adventures');
                console.log(response.data);
                setAdventures(response.data);
            } catch (error) {
                console.error('Failed to fetch adventures:', error);
            }
        };
        fetchAdventures();
    }, []);

    const classes = useStyles();

    return (

        <Container style={{
            marginTop: '3rem',
            maxWidth: '600px',
            backgroundColor: '#f4a2fd',
            paddingTop: '2rem',
            paddingBottom: '2rem',
        }}>
            <Typography variant="h3" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>The Story So Far</Typography>
            {adventures.map((adventure) => (

                <AdventuresModule
                    adventure={adventure}
                    classes={classes}
                    handleDelete={handleDelete}
                    
                />
            ))}
        </Container>

    );

}