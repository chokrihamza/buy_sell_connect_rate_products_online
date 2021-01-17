import React from 'react'
import NavbarPage from '../Components/Layout/Navbar'
import Homes from '../Components/Layout/homes/Homes'
import Footer from '../Components/Layout/footer/Footer'
import Section from '../Components/Layout/section/Section'
const Home = () => {
      return (
            <>
           <NavbarPage /> 
           <div data-aos="fade-up">
            <Homes />
            <Section/>
            <Footer/>
            </div>
            </>
      )
}

export default Home
