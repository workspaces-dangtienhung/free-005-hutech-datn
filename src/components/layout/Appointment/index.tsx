import { useEffect, useState } from "react";
import {
  Select,
  TimePicker,
  Input,
  DatePicker,
  Form,
  Modal,
  Divider,
  Tag,
  Row,
  Col,
  Space,
  Radio,
} from "antd";
import { IService } from "../../../types/services.type";
import { IDoctor } from "../../../types/doctor.type";
import { getClinics, getServices } from "../../../api";
import { getAllDoctors, getDoctorDetail } from "../../../api/DoctorApi";
import {
  convertToISOString,
  extractDateFromString,
  extractHourMinuteFromString,
  formatPrice,
  getLocalStorage,
  pause,
} from "../../../utils";
import { toast } from "react-toastify";
import { createAppointment, vnPayApointment } from "../../../api/Appointment";
import { useNavigate, useLocation } from "react-router-dom";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import Spinner from "../../common/Spinner";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const Appointment = () => {
  const [service, setService] = useState<{ label: string; value: string }[]>(
    []
  );
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<{ label: string; value: string }[]>([]);
  const [clinic, setClinic] = useState<{ label: string; value: string }[]>([]);
  const [hourOfDoctor, setHourOfDoctor] = useState<number[]>([]);
  const [form] = Form.useForm();
  const user = getLocalStorage("user");
  const navigate = useNavigate();
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };
  const { state: doctorId } = useLocation();
  // console.log(doctorId, "state");

  useEffect(() => {
    form.setFieldsValue({
      paymendMethod: "monney",
    });
    if (user) {
      form.setFieldsValue({
        userName: user?.user?.userName,
        email: user?.user?.email,
        // doctor: 1007,
      });
    }
    if (doctorId) {
      form.setFieldsValue({
        doctor: doctorId,
      });
      onChooseDoctorChange(1007);
    }

    (async () => {
      try {
        const { data } = await getServices();
        setService(
          data?.map((item: IService) => ({
            label: item?.serviceName,
            value: item?.serviceId,
          }))
        );
        setServiceData(data);
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

      (async () => {
        try {
          const { data } = await getClinics();
          setClinic(
            data?.map((item: any) => ({
              label: item?.clinicName,
              value: item?.clinicID,
            }))
          );
        } catch (error) {
          console.log(error);
        }
      })();
    })();
  }, []);

  // console.log(service, "service", doctor, "doctor");
  const onChooseDoctorChange = async (value: any) => {
    try {
      // const hourArr: number[] = [];
      setIsLoading(true);
      const { data } = await getDoctorDetail(value);
      // console.log(data, "data");
      const [startStr, endStr] = data?.doctor?.schedule?.split("-");
      const startHour = parseInt(startStr.split(":")[0]);
      const endHour = parseInt(endStr.split(":")[0]);
      setHourOfDoctor(
        Array.from({ length: 24 }, (_, i) => i).filter(
          (hour) => hour < startHour || hour > endHour
        )
      );
      // for (let i = 0; i <= 24; i++) {
      //   if (i === startHour || i === endHour) continue;
      //   hourArr.push(i);
      // }
      // console.log(hourArr, "hourArr");

      // setHourOfDoctor(hourArr);
      await pause(1000);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    // console.log(matchedDoctor, "matchedDoctor");
  };

  const onFinish = async (values: any) => {
    const dateData = extractDateFromString(values?.date?.$d);
    const timeData = extractHourMinuteFromString(values?.time?.$d);
    const ISOdatetime = convertToISOString(dateData, timeData);
    const bodyData = {
      userID: user?.user?.idUser,
      doctorID: values?.doctor,
      clinicID: values?.clinic,
      appointmentDate: ISOdatetime,
      status: "create",
      serviceIDs: values?.service?.map((item: any) => item.toString()),
    };
    setIsLoading(true);
    const { data } = await createAppointment(bodyData);
    await pause(1000);
    setIsLoading(false);
    if (values?.paymendMethod === "vnPay") {
      const totalCost = serviceData
        ?.filter((item: any) => {
          return values.service.includes(item.serviceId);
        })
        .reduce((acc: number, item: any) => {
          return acc + Number(item.cost);
        }, 0);

      await vnPayApointment({
        userId: `${user?.user?.idUser}`,
        total: totalCost,
        appointmentId: `${data?.AppointmentsId}`,
      }).then((res) => {
        window.location.href = res?.data?.url;
      });
    } else {
      toast.success("Đặt lịch thành công !");
      navigate("/account");
    }
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
                        onChange={onChooseDoctorChange}
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
                      // className="time"
                      // id="time1"
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
                          disabled={hourOfDoctor.length === 0}
                          disabledHours={() => hourOfDoctor}
                          size="large"
                          needConfirm={false}
                          format={"HH:mm"}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 ">
                    <div
                      className="time"
                      id="time1"
                      data-target-input="nearest"
                    >
                      <Form.Item
                        name={"clinic"}
                        style={{
                          marginBottom: 0,
                        }}
                        label={<span className="text-white">Phòng khám</span>}
                        rules={[
                          {
                            required: true,
                            message: "Phòng khám không được bỏ trống !",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          style={{ width: "100%", textAlign: "left" }}
                          // onChange={handleChange}
                          placeholder="Chọn phòng khám"
                          options={[...clinic]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-12  mb-3">
                    <div
                      className="time"
                      id="time1"
                      data-target-input="nearest"
                    >
                      <Form.Item
                        name={"paymendMethod"}
                        style={{
                          marginBottom: 0,
                        }}
                        label={
                          <span className="text-white">
                            Phương thức thanh toán
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Phòng khám không được bỏ trống !",
                          },
                        ]}
                      >
                        <Radio.Group
                          // value={"monney"}

                          buttonStyle="solid"
                          className="bg-light"
                          style={{
                            display: "flex",
                            height: 40,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Radio value={"monney"}>Thanh toán tiền mặt</Radio>
                          <Radio value={"vnPay"}>Thanh toán qua VN Pay</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      disabled={!user}
                      className="btn btn-dark w-100 py-3"
                      type="submit"
                    >
                      {user ? " Đặt Lịch" : "Hãy đăng nhập để đặt lịch"}
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
