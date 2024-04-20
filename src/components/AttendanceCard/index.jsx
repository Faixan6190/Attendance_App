import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            <Typography variant='h5' sx={{ mb: "20px" }}>
                ID : 12344
            </Typography>
            <Typography variant="h5" component="div" sx={{ mb: "20px" }}>
                Course : SABC
            </Typography>
            <Typography variant="h5" component="div" sx={{ mb: "20px" }}>
                CheckIn : 00.00.00
            </Typography>
            <Typography variant="h5" component="div" sx={{ mb: "20px" }}>
                CheckOut : 00.00.00
            </Typography>

        </CardContent>
        <CardActions>
            <Button variant='contained'>Check In</Button>
        </CardActions>
    </React.Fragment>
);

export default function OutlinedCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}
