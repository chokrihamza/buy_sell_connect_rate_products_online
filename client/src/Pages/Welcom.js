import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PublicAnnounce from "../Components/Announce/PublicAnnounce";
import NavbarPage from "../Components/Layout/Navbar";
import { getPublicAnnounce } from "../js/actions/actionAnnouce";
import "./welcom.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PaginationItem } from "@material-ui/lab";
import Pagination from "react-bootstrap/Pagination";
import Footer from "../Components/Layout/footer/Footer";

// or

const Welcom = () => {
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

  const dispatch = useDispatch();
  const pubAnnounce = useSelector(
    (state) => state.announceReducer.announce.announces
  );

  const loadAnnounce = useSelector(
    (state) => state.announceReducer.loadAnnounce
  );
  const errors = useSelector((state) => state.announceReducer.errors);
  // make pagination
  useEffect(() => {
    dispatch(getPublicAnnounce(skip, limit));
  }, [skip, limit]);

  return (
    <>
      <NavbarPage />

      <h1 className="title-welcome">
        {numberOfAnnounce?numberOfAnnounce:null} Announces:
      </h1>
      <div className="design-pubAnnounce">
        {loadAnnounce ? (
          <CircularProgress disableShrink />
        ) : (
          pubAnnounce &&
          pubAnnounce.map((el, i) => <PublicAnnounce announce={el} key={i} />)
        )}
      </div>
      <div className="pagination-pubAnnounce">{items}</div>
      <Footer/>
    </>
  );
};

export default Welcom;
