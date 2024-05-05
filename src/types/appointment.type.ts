export interface IAppointmentDetail {
  appointmentId: number;
  userName: string;
  doctorName: string;
  clinicName: string;
  appointmentDate: string;
  status: string;
  cost: number;
  service: {
    serviceId: number;
    serviceName: string;
    cost: number;
  }[];
}
