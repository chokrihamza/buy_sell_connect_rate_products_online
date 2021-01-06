import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PublicAnnounce from "../Components/Announce/PublicAnnounce";
import NavbarPage from "../Components/Layout/Navbar";
import { getPublicAnnounce } from "../js/actions/actionAnnouce";
import "./welcom.css";
import CircularProgress from '@material-ui/core/CircularProgress';
const Welcom = () => {
  const dispatch = useDispatch();
  const pubAnnounce = useSelector((state) => state.announceReducer.announce);
  const loadAnnounce = useSelector(
    (state) => state.announceReducer.loadAnnounce
  );
  const errors = useSelector((state) => state.announceReducer.errors);

  useEffect(() => {
    dispatch(getPublicAnnounce());
  }, []);

  return (
  <>
  <NavbarPage />
    <div className="design-pubAnnounce">
{loadAnnounce ?<CircularProgress disableShrink />:pubAnnounce&&pubAnnounce.map((el,i)=>
      <PublicAnnounce announce={el} key={i}/>)}
    </div>
    </>
  );
};

export default Welcom;
