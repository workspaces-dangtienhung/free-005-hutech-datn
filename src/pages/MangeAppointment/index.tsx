import React, { useEffect } from "react";
import { Button, Space, Table, TableProps, Tag, TimePicker } from "antd";
import { formatDateTime, pause } from "../../utils";
import { toast } from "react-toastify";
import { getAllDoctors, updateSchedule } from "../../api/DoctorApi";
import Spinner from "../../components/common/Spinner";
type Props = {};

interface DataType {
  index: number;
  key: string;
  name: string;
  specialty: string;
  schedule: string;
}
const MangeAppointment = (props: Props) => {
  const [doctors, setDoctors] = React.useState<DataType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllDoctors();
        const doctors = data.map((doctor: any, index: any) => ({
          index: index + 1,
          key: doctor.id,
          name: doctor.doctorName,
          specialty: doctor.specialty,
          schedule: doctor.schedule,
        }));
        setDoctors(doctors);
      } catch (error) {
        toast.error("Lỗi không xác định");
      }
    })();
  }, []);

  const onHandleUpdateSchedule = async (timeData: any, id: string | number) => {
    try {
      const startTime = `${
        timeData[0]?.$H < 10 ? `0${timeData[0]?.$H}` : timeData[0]?.$H
      }:${timeData[0]?.$m < 10 ? `0${timeData[0]?.$m}` : timeData[0]?.$m}`;
      const endTime = `${
        timeData[1]?.$H < 10 ? `0${timeData[1]?.$H}` : timeData[1]?.$H
      }:${timeData[1]?.$m < 10 ? `0${timeData[1]?.$m}` : timeData[1]?.$m}`;
      setIsLoading(true);
      await updateSchedule(id, `${startTime}-${endTime}`);
      await pause(1000);
      setIsLoading(false);
      //update table data affter update schedule
      const newDoctors = doctors.map((doctor) => {
        if (doctor.key === id) {
          doctor.schedule = `${startTime}-${endTime}`;
        }
        return doctor;
      });
      setDoctors(newDoctors);
      toast.success("Cập nhật lịch trình thành công");
    } catch (error) {
      toast.error("Cập nhật lịch trình không thành công");
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
      title: "Tên bác sĩ",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Chuyên môn",
      key: "specialty",
      dataIndex: "specialty",
      render: (_, { specialty }) => <Tag color={"cyan"}>{specialty}</Tag>,
    },

    {
      title: "Lịch trình",
      key: "schedule",
      dataIndex: "schedule",
      render: (_, { schedule }) => (
        <Tag color={schedule ? "cyan" : "error"}>
          {schedule ? schedule : "Chưa có lịch trình"}
        </Tag>
      ),
    },
    {
      title: "Chọn giờ làm việc",
      key: "startTime",
      render: (_, { key }) => (
        <TimePicker.RangePicker
          disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]}
          format={"HH:00"}
          // needConfirm={false}
          onChange={(value) => {
            onHandleUpdateSchedule(value, key);
            console.log(value);
          }}
        />
      ),
    },
    // {
    //   title: "Thao tác",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button
    //         type="primary"
    //         onClick={() => {
    //           console.log();

    //           // handleFetchAppointmentDetail(record.key);
    //           // setIsOpenModal(true);
    //         }}
    //       >
    //         Cập nhật lịch trình
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      <Table pagination={false} columns={columns} dataSource={doctors} />
    </>
  );
};

export default MangeAppointment;
