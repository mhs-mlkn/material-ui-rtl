import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'relative'
    }
}));

export default function FullScreenDialog() {
    const classes = useStyles();

    return (
        <Toolbar disableGutters variant="dense">
            <Typography variant="h6">
                Sound
                </Typography>
            <Button autoFocus color="inherit">
                save
                </Button>
        </Toolbar>
    );
}
