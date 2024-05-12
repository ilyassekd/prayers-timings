
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


// eslint-disable-next-line react/prop-types
export default function ImgMediaCard({salat, time , image}) {
  return (
    <Card sx={{ Width: "14vw"}} >
    <CardMedia
    
        component="img"
        height="140"
        image={image}
        />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {salat}
        </Typography>
        <Typography variant="h1" color="text.secondary">
            {time}
        </Typography>
    </CardContent>

    </Card>
);
}