import React from "react";

type Props = {};

const Newsletter = (props: Props) => {
  return (
    <div
      className="container-fluid position-relative pt-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ zIndex: 1, marginBottom: -75 }}
    >
      <div className="container">
        <div className="bg-primary p-5">
          <form className="mx-auto" style={{ maxWidth: 600 }} />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
