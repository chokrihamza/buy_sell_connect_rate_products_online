import React, { useState } from "react";
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
import { useHistory } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import { deleteAnnounce } from "../../js/actions/actionAnnouce";
import { useDispatch, useSelector } from "react-redux";

import "./PrivateAnnounce.css";

import { addLike } from "../../js/actions/actionAnnouce";
import { Link } from "react-router-dom";

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
  const {
    Description,
    productName,
    quantity,
    price,
    productImages,
    updatedAt,
    user,
    userImage,
    likes,
    comments,
    _id,
  } = announce;

  const personid = useSelector((state) => state.userReducer.user._id);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //usehistory
  const history = useHistory();
  // toggle like unlike button
  const [likesclone, setlikesclone] = useState(likes);

  return (
    <div className="design-prAnnounce">
      <Card className={classes.root}>
        <CardActionArea onClick={() => history.push(`/announce/${_id}`)}>
          <CardHeader
            avatar={<Avatar alt="Travis Howard" src={userImage} />}
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
              Quantity:{quantity}Kg
              <br />
              Price:{price}Dt
              <br />
              Description:{Description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton
            style={
              likesclone.length - likes.length > 0
                ? { color: "black" }
                : { color: "red" }
            }
            aria-label="add to favorites"
            onClick={(e) => {
              dispatch(addLike(_id));
            }}
          >
            <FavoriteIcon />
            <sup style={{ color: "red" }}>
              <small>{likes.length}</small>
              <small>{likes.length > 1 ? "likes" : "like"}</small>
            </sup>
          </IconButton>
          <Link
            to={{
              pathname: "/comment",
              state: { comments: comments, idComment: _id },
            }}
          >
            <IconButton aria-label="add a comment">
              <i class="far fa-comment-dots"></i>
            </IconButton>
          </Link>

          {user && user._id === personid ? (
            <IconButton
              aria-label="delete announce"
              onClick={() => dispatch(deleteAnnounce(_id))}
            >
              <i class="fas fa-trash-alt"></i>
            </IconButton>
          ) : null}
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
            <Typography paragraph> Phone:{user && user.phoneNumber}</Typography>
            <Typography paragraph>email:{user && user.email}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default PrivateAnnounce;
