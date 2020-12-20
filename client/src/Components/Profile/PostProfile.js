import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { postProfile } from "../../js/actions/actionprofile";
import FlashMessage from "react-flash-message";
import "./PostProfile.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },

  input: {
    display: "none",
  },
}));
const PostProfile = () => {
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState();
  const [adresse, setAdresse] = useState();
  const [farmerDomaine, setFarmerDomaine] = useState();
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const data = new FormData();
  data.append("location", location);
  data.append("adresse", adresse);
  data.append("farmerDomaine", farmerDomaine);
  data.append("image", image);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const userName = useSelector(state => state.userReducer.user.name);
  const profile = useSelector((state) => state.profileReducer.profile);
  const loadProfile = useSelector((state) => state.profileReducer.loadProfile);
  const errors = useSelector((state) => state.profileReducer.errors);
  return (
    <>
      {loadProfile ? (
        <Alert variant="filled" severity="info"
        style={{
          position: "fixed",
          bottom: "2%",
          right: "0%",
       
      }}
        >
        Please Wait
      </Alert>
            
      ) : errors ? (
          <div  style={{
            position: "fixed",
            bottom: "2%",
            right: "0%",
         
        }}>
          <FlashMessage duration={1000}
            
          >
            <Alert variant="filled" severity="error" >
             {errors.message}
           </Alert>
            </FlashMessage>
            </div>
          ):null
      }
    <div className="design_post registration-form"  >
      <h4 className="design_title">BUILD YOUR PROFILE</h4>
      <p className="design_info">
        This information will let us know more about you <i>{userName}</i> .
      </p>

      <div className="design-coordonation" style={{position:"relative"}} >
        <div className="design-input-image">
          <div className="form-icon">
            {image ? (
              <img src={URL.createObjectURL(image)} className="form-icon" />
            ) : (
              <span>
                <i className="icon icon-user" />
              </span>
            )}
          </div>

          <div
            className="file-upload"
            style={{ position:"relative", display: "flex", justifyContent: "center" }}
          >
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
             
              onChange={(event) => {
                const file = event.target.files[0];

                setImage(file);
              }}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </div>

        <div className="design-other-input"  >
          <FormControl className={classes.formControl}>
            <InputLabel  id="demo-controlled-open-select-label">
              Location
            </InputLabel>
            <Select
              required
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
             
              onClose={handleClose}
              onOpen={handleOpen}
              value={country}
              onChange={(e) => {
                handleChange(e);setLocation(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Ariana"}>Ariana</MenuItem>
              <MenuItem value={"Béja"}>Béja</MenuItem>
              <MenuItem value={"Bizerte"}>Bizerte</MenuItem>
              <MenuItem value={"Gabès"}>Gabès</MenuItem>
              <MenuItem value={"Gafsa"}>Gafsa</MenuItem>
              <MenuItem value={"Jendouba"}>Jendouba</MenuItem>
              <MenuItem value={"Kairouan"}>Kairouan</MenuItem>
              <MenuItem value={"Kasserine"}>Kasserine</MenuItem>
              <MenuItem value={"Kebili"}>Kebili</MenuItem>
              <MenuItem value={"Manouba"}>Manouba</MenuItem>
              <MenuItem value={"Medenine"}>Medenine</MenuItem>
              <MenuItem value={"Monastir"}>Monastir</MenuItem>
              <MenuItem value={"Nabeul"}>Nabeul</MenuItem>
              <MenuItem value={"Sfax"}>Sfax</MenuItem>
              <MenuItem value={"Sidi Bouzid"}>Sidi Bouzid</MenuItem>
              <MenuItem value={"Siliana"}>Siliana</MenuItem>
              <MenuItem value={"Sousse"}>Sousse</MenuItem>
              <MenuItem value={"Tataouine"}>Tataouine</MenuItem>
              <MenuItem value={"Tozeur"}>Tozeur</MenuItem>
              <MenuItem value={"Tunis"}>Tunis</MenuItem>
              <MenuItem value={"Ariana"}>Ariana</MenuItem>
              <MenuItem value={"Zaghouan"}>Zaghouan</MenuItem>
            </Select>
          </FormControl>

          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              onChange={(e) => {
                setAdresse(e.target.value);
              }}
              id="standard-basic"
              label="Adresse"
            />
          </form>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              onChange={(e) => {
                setFarmerDomaine(e.target.value);
              }}
              id="standard-basic"
              label="Farmer Domaine"
            />
          </form>
        </div>
      </div>
      <div className="form-group">
        <button
          type="button"
          className="btn btn-block create-account"
          onClick={() => dispatch(postProfile(data))}
        >
          Submit Profile
        </button>
      </div>
      </div>
      </>
  );
};

export default PostProfile;
