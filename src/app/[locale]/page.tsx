"use client";

import "@/index.css";
import Navbar from "@/layouts/Navbar";
import Main from "@/layouts/Main";
import Tabs from "@/layouts/Tabs";
import Hero from "@/layouts/Hero";
import WHYus from "@/layouts/WhyUs";
import Otzives from "@/layouts/Otzives";
import FAQs from "@/layouts/FAQs";
import Footer from "@/layouts/Footer";
import { FooterNav } from "@/layouts/FooterNav";
import Phone from "@/layouts/Phone";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-[#282728]">
        <Navbar />
        <Main />
      </div>
      <Tabs />
      <Phone />
      <Hero />
      {/* <WHYus /> */}
      {/* <Otzives />  */}
      {/* <FAQs /> */}
      <Footer />
      <FooterNav />
    </div>
  );
};

export default Home;
