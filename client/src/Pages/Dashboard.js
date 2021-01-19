import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUser } from "../js/actions/actionUser";
import PostProfile from "../Components/Profile/PostProfile";
import { getOwnerProfile } from "../js/actions/actionprofile";
import { Spinner } from "reactstrap";
import "./Dashboard.css";
import NavbarPage from "../Components/Layout/Navbar";
import { getPrivateAnnounce } from "../js/actions/actionAnnouce";
import PrivateAnnounce from "../Components/Announce/PrivateAnnounce";
import CircularProgress from '@material-ui/core/CircularProgress';
import Search from "../Components/Search/Search";
import { UncontrolledAlert } from 'reactstrap';
import { PaginationItem } from "@material-ui/lab";
const Dashboard = () => {
  //get search element
  const [search, setSearch] = useState(null);
   
  let x = (value) => {
    setSearch(value)
  }
  // add pagination
  const [limit] = useState(8);
  const [skip, setSkip] = useState(0);
  const numberOfAnnounce = useSelector(
    (state) => state.announceReducer.announce.numberOfAnnounce
  );
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(numberOfAnnounce / limit);
    number++
  ) {
    items.push(
      <PaginationItem
        key={number}
        page={number}
        style={{ color: "white" }}
        color="primary"
        variant="outlined"
        size="medium"
        shape="rounded"
        onClick={(e) => setSkip((e.target.textContent - 1) * limit)}
      ></PaginationItem>
    );
  }


  //
  const profile = useSelector((state) => state.profileReducer.profile);
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const loadProfile = useSelector((state) => state.profileReducer.loadProfile);
  const dispatch = useDispatch();
  const announce = useSelector((state) => state.announceReducer.announce.announces);
  
  const loadAnnounce = useSelector(
    (state) => state.announceReducer.loadAnnounce
  );
  
  useEffect(() => {
    dispatch(getOwnerProfile());
    dispatch(getUser());
    dispatch(getPrivateAnnounce(search, limit,skip));
  }, [search,skip, limit]);
  
  if (loadProfile && loadUser) {
    return (
      <>
        <NavbarPage />
        <Spinner
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
          color="primary"
        />
      </>
    );
  } else if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <NavbarPage />
        {!profile ? (
          <div className="design-postProfile">
            <PostProfile />
          </div>
        ) : (loadAnnounce) ? (
          <CircularProgress disableShrink />
          ) : (
              <div>
                <div style={{ display: "flex", justifyContent:"center",marginTop:"6%"  }} >
                  <Search x={x} />
                  
                 </div>
                <div className="design-privAnnounce">
                
                  {
                    announce&&announce.length == 0 ? (
                      <UncontrolledAlert  color="danger">
                      <strong>Oops ? Not Found</strong>.
                     </UncontrolledAlert>
                    ):
                  (announce&&announce.map((el, i) =>
                    <PrivateAnnounce announce={el} key={i} />))}
                  
                </div>
                <div  className="pagination-pubAnnounce">{items}</div>
              </div>
     
            )
        
        }
      </div>)
  }
};

export default Dashboard;
