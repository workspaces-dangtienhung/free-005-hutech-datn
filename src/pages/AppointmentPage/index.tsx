import React from "react";
import { Appointment, Hero } from "../../components/layout";
import { APPOINTMENT } from "../../constants/route";

type Props = {};

const AppointmentPage = (props: Props) => {
  return (
    <div>
      <Hero currenPage={{ title: "Đặt lịch", link: APPOINTMENT }} />
      <Appointment />
    </div>
  );
};

export default AppointmentPage;
