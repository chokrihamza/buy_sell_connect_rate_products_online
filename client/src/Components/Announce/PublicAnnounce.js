import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./PublicAnnounce.css";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    height: 280,
    marginTop: 55,
  },
  
});
function PublicAnnounce({ announce }) {
  const history = useHistory();
  const classes = useStyles();
  const {
    productImages,
    productCategory,
    productName,
    quantity,
    price,
    updatedAt,
  } = announce;

  return (
    <div
      className="positon-design ribbon-bookmark-v text-vertical"
      data-position="left bottom"
    >
      <Card className={classes.root}>
        <CardActionArea onClick={() => history.push("/register")}>
          <CardMedia
            component="img"
            alt="productImage"
            height="140"
            image={productImages[0]}
            title="productImage"
          />
          <CardContent>
            <Typography
              className="design-titleAnnounce"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {productName}
              <Typography
                className="mt-1"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                |{productCategory}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {price}/{quantity}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {updatedAt}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default PublicAnnounce;
