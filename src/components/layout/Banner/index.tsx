import React, { useEffect } from "react";
import { Form, Modal, Select, Input } from "antd";
import { getSpecialty } from "../../../api";
import { pause } from "../../../utils";
import { getAllDoctors } from "../../../api/DoctorApi";
import Spinner from "../../common/Spinner";
import { useNavigate } from "react-router-dom";
import { APPOINTMENT } from "../../../constants/route";

type Props = {};

const Banner = (props: Props) => {
  const [form] = Form.useForm();
  const [specialty, setSpecialty] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [doctor, setDoctor] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [searchDoctorResult, setSearchDoctorResult] = React.useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await getSpecialty();
        const specialty = data.map((item: any) => ({
          label: item.specialtyName,
          value: item.specialtyName,
        }));

        setSpecialty(specialty);
        await pause(1000);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllDoctors();
        setDoctor(data);
        await pause(1000);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const result =
      doctor &&
      doctor.length > 0 &&
      doctor.filter((item: any) => {
        const nameMatch = item.doctorName
          .toLowerCase()
          .includes(values.doctorName.toLowerCase());
        const specialtyMatch = item.specialty === values.specialty;
        return nameMatch && specialtyMatch;
      });
    // console.log(result, "result");

    setSearchDoctorResult(result);
    await pause(1000);
    setIsLoading(false);
    setIsOpenModal(true);
  };
  const navigate = useNavigate();

  const handleBookDoctor = (doctorId: number | string) => {
    navigate(APPOINTMENT, {
      state: doctorId,
    });
  };
  return (
    <div className="container-fluid banner mb-5">
      <div className="container">
        {isLoading && <Spinner />}
        <Modal
          destroyOnClose
          open={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
          footer={null}
          width={1000}
          title="Kết Quả Tìm Kiếm"
        >
          <h5 className="mb-4 mt-3">
            Tìm thấy: {searchDoctorResult.length} bác sĩ
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent:
                searchDoctorResult.length > 3 ? "center" : "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              {searchDoctorResult.length > 0 &&
                searchDoctorResult.map((item, index) => (
                  <div key={index} className="card" style={{ width: "18rem" }}>
                    <img
                      src="img/team-1.jpg"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Bác sĩ: {item?.doctorName}</h5>
                      <p className="card-text">
                        Chuyên khoa: {item?.specialty}
                      </p>
                      <button
                        className="btn btn-primary mt-3"
                        onClick={() => handleBookDoctor(item?.id)}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal>
        <div className="row gx-0">
          <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
            <div
              className="bg-primary d-flex flex-column p-5"
              style={{ height: 300 }}
            >
              <h3 className="text-white mb-3">Thời Gian Mở Cửa</h3>
              <div className="d-flex justify-content-between text-white mb-3">
                <h6 className="text-white mb-0">Thứ 2 - Thứ 7</h6>
                <p className="mb-0"> 8:00am - 9:00pm</p>
              </div>
              <div className="d-flex justify-content-between text-white mb-3">
                <h6 className="text-white mb-0">Chủ Nhật</h6>
                <p className="mb-0"> 8:00am - 5:00pm</p>
              </div>
              <a className="btn btn-light" href="">
                Đặt Lịch
              </a>
            </div>
          </div>
          <div className="col-lg-4 wow zoomIn" data-wow-delay="0.3s">
            <div
              className="bg-dark d-flex flex-column p-5"
              style={{ height: 300 }}
            >
              <h3 className="text-white mb-3">Tìm Kiếm Bác Sĩ</h3>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className="mb-3">
                  <Form.Item
                    name={"specialty"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn chuyên khoa",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      options={[...specialty]}
                      placeholder="Chọn chuyên khoa"
                      size="large"
                    />
                  </Form.Item>
                </div>

                <div
                  className="date mb-3"
                  id="date"
                  data-target-input="nearest"
                >
                  <Form.Item
                    name={"doctorName"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên bác sĩ",
                      },

                      <Input placeholder="Nhập tên bác sĩ" size="large" />,
                    ]}
                  >
                    <Input placeholder="Nhập tên bác sĩ" size="large" />
                  </Form.Item>
                </div>

                <button
                  type="submit"
                  className="btn btn-light"
                  style={{
                    width: "100%",
                  }}
                  // onClick={() => setIsOpenModal(true)}
                >
                  Tìm Bác Sĩ
                </button>
              </Form>
            </div>
          </div>
          <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
            <div
              className="bg-secondary d-flex flex-column p-5"
              style={{ height: 300 }}
            >
              <h3 className="text-white mb-3">Đặt Lịch Hẹn</h3>
              <p className="text-white">
                Hãy liên hệ với chúng tôi qua số điện thoại sau để đặt lịch .
              </p>
              <h2 className="text-white mb-0">+84 12 345 6789</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
