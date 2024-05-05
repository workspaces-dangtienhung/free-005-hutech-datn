import { useEffect, useState } from "react";
import { Select, TimePicker, Input, DatePicker, Form } from "antd";
import { IService } from "../../../types/services.type";
import { IDoctor } from "../../../types/doctor.type";
import { getServices } from "../../../api";
import { getAllDoctors } from "../../../api/DoctorApi";
import {
  convertToISOString,
  extractDateFromString,
  extractHourMinuteFromString,
  getLocalStorage,
  pause,
} from "../../../utils";
import { toast } from "react-toastify";
import { createAppointment } from "../../../api/Appointment";
import { useNavigate } from "react-router-dom";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import Spinner from "../../common/Spinner";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const Appointment = () => {
  const [service, setService] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<{ label: string; value: string }[]>([]);
  const [form] = Form.useForm();
  const user = getLocalStorage("user");
  const navigate = useNavigate();
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };

  useEffect(() => {
    user &&
      form.setFieldsValue({
        userName: user?.user?.userName,
        email: user?.user?.email,
      });
    (async () => {
      try {
        const { data } = await getServices();
        setService(
          data?.map((item: IService) => ({
            label: item?.serviceName,
            value: item?.serviceId,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const { data } = await getAllDoctors();
        setDoctor(
          data?.map((item: IDoctor) => ({
            label: item?.doctorName,
            value: item?.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // console.log(service, "service", doctor, "doctor");
  const onFinish = async (values: any) => {
    const dateData = extractDateFromString(values?.date?.$d);
    const timeData = extractHourMinuteFromString(values?.time?.$d);
    const ISOdatetime = convertToISOString(dateData, timeData);

    const bodyData = {
      userID: user?.user?.id,
      doctorID: values?.doctor,
      clinicID: 1,
      appointmentDate: ISOdatetime,
      status: "create",
      serviceIDs: values?.service?.map((item: any) => item.toString()),
    };
    setIsLoading(true);
    await createAppointment(bodyData);
    await pause(1000);
    setIsLoading(false);
    toast.success("Đặt lịch thành công !");
    navigate("/account");
    // form.resetFields();
    try {
      setIsLoading(true);
    } catch (error) {
      toast.error("Đặt lịch thất bại !");
    }
    // console.log(bodyData, "bodyData", values);
  };

  return (
    <div
      className="container-fluid bg-primary bg-appointment my-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      {isLoading && <Spinner />}
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6 py-5">
            <div className="py-5">
              <h1 className="display-5 text-white mb-4">
                Chúng tôi là phòng khám nha khoa được chứng nhận và giành giải
                thưởng mà bạn có thể tin tưởng
              </h1>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn"
              data-wow-delay="0.6s"
            >
              <h1 className="text-white mb-4">Đặt Lịch</h1>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className="row g-2">
                  <div className="col-12 col-sm-6">
                    <Form.Item
                      name="service"
                      rules={[
                        {
                          required: true,
                          message: "Dịch vụ không được bỏ trống !",
                        },
                      ]}
                      style={{
                        marginBottom: 0,
                      }}
                      label={<span className="text-white">Dịch vụ</span>}
                    >
                      <Select
                        placeholder="Chọn dịch vụ"
                        mode="multiple"
                        size="large"
                        style={{
                          width: "100%",
                          textAlign: "left",
                        }}
                        // onChange={handleChange}

                        options={[...service]}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Form.Item
                      style={{
                        marginBottom: 0,
                      }}
                      name="doctor"
                      label={<span className="text-white">Bác sĩ</span>}
                      rules={[
                        {
                          required: true,
                          message: "Bác sĩ không được bỏ trống !",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        style={{ width: "100%", textAlign: "left" }}
                        // onChange={handleChange}
                        placeholder="Chọn bác sĩ"
                        options={[...doctor]}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Form.Item
                      name="userName"
                      style={{
                        marginBottom: 0,
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Họ và tên không được bỏ trống !",
                        },
                      ]}
                      label={<span className="text-white">Họ và tên</span>}
                    >
                      <Input
                        size="large"
                        disabled
                        type="text"
                        className="bg-light border-0"
                        placeholder="Họ và Tên"
                        // style={{ height: 55 }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Form.Item
                      name="email"
                      style={{
                        marginBottom: 0,
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Email không được bỏ trống !",
                        },
                        {
                          type: "email",
                          message: "Email không đúng định dạng !",
                        },
                      ]}
                      label={<span className="text-white">Email</span>}
                    >
                      <Input
                        size="large"
                        disabled
                        type="email"
                        className=" bg-light border-0"
                        placeholder="Email"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div
                      className="date"
                      id="date1"
                      data-target-input="nearest"
                    >
                      <Form.Item
                        name={"date"}
                        style={{
                          marginBottom: 0,
                        }}
                        label={
                          <span className="text-white">Ngày đặt lịch</span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Ngày đặt lịch không được bỏ trống !",
                          },
                        ]}
                      >
                        <DatePicker
                          disabledDate={disabledDate}
                          size="large"
                          placeholder="Chọn ngày đặt lịch"
                          style={{ width: "100%" }}
                          format={"DD/MM/YYYY"}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div
                      className="time"
                      id="time1"
                      data-target-input="nearest"
                    >
                      <Form.Item
                        name={"time"}
                        style={{
                          marginBottom: 0,
                        }}
                        label={<span className="text-white">Thời gian</span>}
                        rules={[
                          {
                            required: true,
                            message: "Thời gian không được bỏ trống !",
                          },
                        ]}
                      >
                        <TimePicker
                          disabledHours={() => [
                            0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23,
                          ]}
                          size="large"
                          needConfirm={false}
                          format={"HH:mm"}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      disabled={!user}
                      className="btn btn-dark w-100 py-3"
                      type="submit"
                    >
                      Đặt Lịch
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
