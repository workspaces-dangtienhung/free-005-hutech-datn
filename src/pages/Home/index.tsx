import Carousel from "../../components/layout/Carousel";
import {
  About,
  Appointment,
  Banner,
  Offer,
  Pricing,
  Service,
  Team,
  Testimonial,
} from "../../components/layout";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Carousel />;
      <Banner />
      <About />
      <Appointment />
      <Service />
      <Offer />
      <Pricing />
      <Testimonial />
      <Team />
    </>
  );
};

export default Home;
