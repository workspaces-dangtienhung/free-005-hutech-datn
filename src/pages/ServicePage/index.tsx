import React from "react";
import { Hero, Service } from "../../components/layout";
import { SERVICE } from "../../constants/route";

type Props = {};

const ServicePage = (props: Props) => {
  return (
    <>
      <Hero
        currenPage={{
          title: "Dịch vụ",
          link: SERVICE,
        }}
      />
      <Service />
    </>
  );
};

export default ServicePage;
