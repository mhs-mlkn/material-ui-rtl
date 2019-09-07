import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    speedDial: {
        position: 'absolute',
        '&$directionUp': {
            bottom: theme.spacing(),
            right: theme.spacing(3),
            zIndex: 10000
        }
    },
    directionUp: {}
}));

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <DeleteIcon />, name: 'Delete' },
];

const Settings = () => {
    const direction = "up";
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const speedDialClassName = clsx(classes.speedDial, classes.directionUp);

    return (
        <SpeedDial
            ariaLabel="تنظیمات سایت"
            className={speedDialClassName}
            hidden={hidden}
            icon={<SpeedDialIcon />}
            onBlur={handleClose}
            onClick={handleClick}
            onClose={handleClose}
            onFocus={handleOpen}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            open={open}
            direction={direction}
        >
            {actions.map(action => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handleClick}
                />
            ))}
        </SpeedDial>
    );
}

export default Settings;