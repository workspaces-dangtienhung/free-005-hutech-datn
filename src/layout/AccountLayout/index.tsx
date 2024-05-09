import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer, TopBar } from "../../components/layout";
import {
  Tabs,
  Layout,
  Avatar,
  Dropdown,
  MenuProps,
  Button,
  Modal,
  Divider,
} from "antd";
import { LogoutOutlined, LockOutlined } from "@ant-design/icons";
import { HOME } from "../../constants/route";
import { getLocalStorage, removeLocalStorage } from "../../utils/localStorage";
import { Space, Table, Tag, Popconfirm, Row, Col } from "antd";
import type { TableProps } from "antd";
import { toast } from "react-toastify";
import {
  cancelAppointment,
  getAppointmentByUserId,
  getAppointmentDetail,
  updateAppointment,
} from "../../api/Appointment";
import { formatDateTime, formatPrice, pause } from "../../utils";
import { IAppointmentDetail } from "../../types/appointment.type";
import Spinner from "../../components/common/Spinner";
type Props = {};

interface DataType {
  index: number;
  key: string;
  name: string;
  dateTime: string;
  status: string;
}

const AccountLayout = (props: Props) => {
  const [appointment, setAppointment] = useState([]);
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (!user) {
      navigate(HOME);
      return;
    }
    (async () => {
      try {
        const { data } = await getAppointmentByUserId(user?.user?.idUser);
        setAppointment(data);
      } catch (error) {
        // toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        console.log(error);
      }
    })();
  }, []);
  // console.log(appointment);

  const items: MenuProps["items"] = [
    {
      key: "2",
      icon: (
        <LockOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
      label: <Link to={"/change-password"}>Đổi mật khẩu</Link>,
    },
    {
      key: "4",
      danger: true,
      label: "Đăng Xuất",
      onClick: () => {
        removeLocalStorage("user");
        navigate(HOME);
      },
      icon: (
        <LogoutOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
    },
  ];
  const formatAppointmentData: DataType[] =
    appointment &&
    appointment?.map((item: any, index: number) => {
      return {
        index: index + 1,
        key: item?.appointmentsId,
        name: user && user?.user?.userName,
        dateTime: item.appointmentDate,
        status: item.status,
      };
    });
  const { Header } = Layout;
  return (
    <div>
      <TopBar />
      <Header className="d-flex justify-content-between align-items-center">
        <Link to={HOME} className="navbar-brand p-0">
          <h1 className="m-0 text-primary">
            <i className="fa fa-tooth me-2"></i>DentCare
          </h1>
        </Link>
        <Dropdown menu={{ items }} arrow trigger={["click"]}>
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
              fontWeight: "bold",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
            size="default"
          >
            {user && user?.user?.userName?.split("")[0]}
          </Avatar>
        </Dropdown>
      </Header>
      <div
        className="mb-4 mt-4 container"
        style={{
          minHeight: "100vh",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          // type="card"
          size={"large"}
          items={[
            {
              key: "1",
              label: "Quản lý lịch hẹn",
              children: (
                <TableManageAppointment
                  setAppointment={setAppointment}
                  appointment={formatAppointmentData}
                  user={user}
                />
              ),
            },
            {
              key: "2",
              label: "Lịch sử đặt lịch",
              children: (
                <TableViewHistoryAppointment
                  setAppointment={setAppointment}
                  appointment={formatAppointmentData}
                  user={user}
                />
              ),
            },
          ]}
        />
      </div>
      <Footer />
    </div>
  );
};

export default AccountLayout;

const TableManageAppointment = ({ setAppointment, appointment, user }: any) => {
  const urlParams = new URLSearchParams(window.location.search);
  const appointmentId = urlParams.get("userId")?.split("=")[1];
  const res_Code = urlParams.get("vnp_ResponseCode");
  // console.log(userId, "userId");
  console.log(res_Code, "res_Code");
  console.log(appointmentId, "appointmentId");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [appointmentDetail, setAppointmentDetail] =
    useState<IAppointmentDetail>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (appointmentId && res_Code === "00") {
      (async () => {
        try {
          await updateAppointment(appointmentId, "payed");
          //update table after pay success
          // toast.success("Đặt lịch thành công");
          setAppointment((prev: any) => {
            return prev.map((item: any) => {
              if (item.appointmentsId === appointmentId) {
                return { ...item, status: "payed" };
              }
              return item;
            });
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);
  const onHandleCancel = async (id: number | string) => {
    try {
      setIsLoading(true);
      const { data } = await cancelAppointment(id);
      setIsLoading(false);
      //update table after cancel success
      setAppointment((prev: any) => {
        return prev.map((item: any) => {
          if (item.appointmentsId === id) {
            return { ...item, status: "canceled" };
          }
          return item;
        });
      });
      toast.success("Hủy lịch thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const handleFetchAppointmentDetail = async (id: number | string) => {
    try {
      setIsLoading(true);
      const { data } = await getAppointmentDetail(id);
      await pause(1000);
      setAppointmentDetail(data);
      setIsLoading(false);
      setIsOpenModal(true);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      setIsLoading(false);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.index - b.index,
      width: 50,
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Ngày khám",
      key: "dateTime",
      dataIndex: "dateTime",
      render: (_, { dateTime }) => (
        <Tag color={"cyan"}>{formatDateTime(dateTime, true)}</Tag>
      ),
    },
    {
      title: "Giờ khám  ",
      key: "dateTime",
      dataIndex: "dateTime",
      render: (_, { dateTime }) => (
        <Tag color={"cyan"}>
          {formatDateTime(dateTime + ".000Z", false, true)}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag color={"geekblue"}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              handleFetchAppointmentDetail(record.key);
              // setIsOpenModal(true);
            }}
          >
            Xem chi tiết
          </Button>
          {record.status !== "canceled" && record.status !== "done" && (
            <Popconfirm
              title="Bạn chắc chắn muốn hủy?"
              onConfirm={() => {
                onHandleCancel(record.key);
              }}
            >
              <Button type="primary" danger>
                Hủy lịch
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      <Table
        // pagination={false}
        columns={columns}
        dataSource={appointment.reverse()}
      />
      <Modal
        // centered
        width={800}
        title={<h3 className="mb-5">Xem chi tiết lịch hẹn</h3>}
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
      >
        <Row>
          <Col span={8}>
            <div>
              <p
                className=""
                style={{
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                Thông tin bệnh nhân
              </p>
              <div>
                Họ và tên:{" "}
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  {user && user?.user?.userName}
                </span>
              </div>
              <div>
                Số điện thoại:{" "}
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  0{user && user?.user?.phone}
                </span>
              </div>
              <div>
                Email:{" "}
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  {user && user?.user?.email}
                </span>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <p
                className=""
                style={{
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                Các dịch vụ đã chọn
              </p>

              <Space direction="vertical" className="mt-2">
                {appointmentDetail &&
                  appointmentDetail.service.map((item) => (
                    <Tag color="cyan-inverse">
                      <p
                        className="py-1"
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {item.serviceName} - Giá:{" "}
                        {formatPrice(item?.cost! || 0)}
                      </p>
                    </Tag>
                  ))}
              </Space>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <div>
                <p
                  className=""
                  style={{
                    fontWeight: 500,
                    fontSize: "18px",
                  }}
                >
                  Bác sĩ
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                    }}
                    src="img/team-1.jpg"
                    alt=""
                  />
                  <div>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      {appointmentDetail?.doctorName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p
                  className=""
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  Phòng khám:{" "}
                  <Tag color="gold-inverse">
                    {appointmentDetail?.clinicName}
                  </Tag>
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <div>
              Trạng thái:{" "}
              <Tag color="geekblue-inverse">
                {appointmentDetail?.status.toUpperCase()}
              </Tag>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: "normal",
                }}
              >
                Tổng chi phí:
              </span>{" "}
              {formatPrice(appointmentDetail?.cost! || 0)}
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const TableViewHistoryAppointment = ({
  setAppointment,
  appointment,
  user,
}: any) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.index - b.index,
      width: 50,
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Ngày khám",
      key: "dateTime",
      dataIndex: "dateTime",
      render: (_, { dateTime }) => (
        <Tag color={"cyan"}>{formatDateTime(dateTime, true)}</Tag>
      ),
    },
    {
      title: "Giờ khám  ",
      key: "dateTime",
      dataIndex: "dateTime",
      render: (_, { dateTime }) => (
        <Tag color={"cyan"}>
          {formatDateTime(dateTime + ".000Z", false, true)}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag color={"geekblue"}>{status.toUpperCase()}</Tag>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={appointment.reverse()}
    />
  );
};
