import React from "react";
import { Hero, Team } from "../../components/layout";
import { TEAM } from "../../constants/route";

type Props = {};

const TeamPage = (props: Props) => {
  return (
    <div>
      <Hero
        currenPage={{
          title: "Đội ngũ nha sĩ",
          link: TEAM,
        }}
      />
      <Team />
    </div>
  );
};

export default TeamPage;
