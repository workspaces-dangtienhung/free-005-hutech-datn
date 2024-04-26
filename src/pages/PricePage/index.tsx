import React from "react";
import { Hero, Pricing } from "../../components/layout";
import { PRICE } from "../../constants/route";

type Props = {};

const PricePage = (props: Props) => {
  return (
    <div>
      <Hero
        currenPage={{
          title: "Chuyên khoa",
          link: PRICE,
        }}
      />
      <Pricing />
    </div>
  );
};

export default PricePage;
