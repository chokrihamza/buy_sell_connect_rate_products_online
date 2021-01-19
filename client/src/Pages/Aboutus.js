import React from "react";
import Footer from "../Components/Layout/footer/Footer";
import NavbarPage from "../Components/Layout/Navbar";
import "./Aboutus.css";
const Aboutus = () => {
  return (
    <div className="aboutus">
      <NavbarPage />
      <div className="aboutus-design">
            <img src="work-with-us.jpg" alt="about us" />
        <h1>Our Story</h1>
        <p>
          Welcome to Farmers Trading, your number one source for all
          agricultural commodities (vegetables, fruits, meats ....). We are
          committed to providing you with the best online sales platform.
          Founded in 2021 by <span>Hamza Chokri</span> and <span>Omar Tebessi</span>. When they started
          out, their passion for helping citizens to have a direct contact with
          farmers in order to be able to buy their products directly without
          having to have an intermediary pushed him to develop this shop, and
          gave him the impetus to transform hard work and inspiration into a
          thriving online store. We serve clients all over Tunisia, and we are
          delighted to be part of the environmentally friendly, fair trade wing
          of agriculture We hope you enjoy our services as much as we enjoy
          providing them to you. If you have any questions or comments, please
          do not hesitate to contact us.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
