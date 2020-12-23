import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useHistory } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: 55,
    
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function PrivateAnnounce({ announce }) {
  const { productCategory,
    Description,
    productName,
    quantity,
    price,
    productImages,
    updatedAt,
    user,
    userImage,
    _id
  } = announce
  const { name,
    email,
    phoneNumber,
   
  } = user;
  console.log(name, email, phoneNumber)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
//usehistory
const history = useHistory();

  return (
    <div>
      <Card className={classes.root}>
      
      <CardActionArea onClick={()=>history.push(`/announce/${_id}`)}>
      
        <CardHeader
          avatar={
            <Avatar alt="Travis Howard" src={userImage} />
          }
          
          title={productName}
          subheader={updatedAt}
        />
        <CardMedia
            component="img"
            alt="productImage"
            height="140"
            image={productImages[0]}
            title="productImage"
          />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Price:{quantity}<br/>
            Price:{price}<br/>
            Description:{Description}
          </Typography>
          </CardContent>
          </CardActionArea>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="add a comment">
          <i class="far fa-comment-dots"></i>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
            </CardActions>
           
         
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Contact:</Typography>
            <Typography paragraph>
              Phone:{phoneNumber}<br/>
              email:{email}
              </Typography>
          </CardContent>
          </Collapse>
        
      </Card>
          
        
    </div>
  );
}

export default PrivateAnnounce;
