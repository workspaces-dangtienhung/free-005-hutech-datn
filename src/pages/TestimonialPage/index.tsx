import { Hero, Testimonial } from "../../components/layout";
import { TESTIMONIAL } from "../../constants/route";

type Props = {};

const TestimonialPage = (props: Props) => {
  return (
    <div>
      <Hero
        currenPage={{
          title: "Đánh giá từ khách hàng",
          link: TESTIMONIAL,
        }}
      />
      <Testimonial />
    </div>
  );
};

export default TestimonialPage;
