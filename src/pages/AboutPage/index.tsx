import React from "react";
import {
  Footer,
  Hero,
  Newsletter,
  About as AboutComponent,
} from "../../components/layout";
import { ABOUT } from "../../constants/route";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <>
      <Hero currenPage={{ title: "Giới thiệu", link: ABOUT }} />
      <AboutComponent />
    </>
  );
};

export default AboutPage;
