export function formatDateTime(
  dateTime: any,
  getDDMMYYYY = false,
  getTime = false
) {
  // Tạo một đối tượng Date từ chuỗi ngày giờ đầu vào
  let dateTimeObj = new Date(dateTime);

  // Tạo các biến lấy thông tin từ đối tượng Date
  let year = dateTimeObj.getFullYear();
  let month = pad(dateTimeObj.getMonth() + 1);
  let day = pad(dateTimeObj.getDate());
  let hour = pad(dateTimeObj.getHours());
  let minute = pad(dateTimeObj.getMinutes());

  if (getDDMMYYYY) {
    return `${day}/${month}/${year}`;
  }
  if (getTime) {
    return `${hour}giờ ${minute}phút`;
  }
  // Định dạng lại chuỗi ngày giờ theo yêu cầu
  let result = `${day}/${month}/${year} - ${hour}giờ ${minute}phút`;

  return result;
}

// Hàm để thêm số 0 trước số nếu số đó có một chữ số
function pad(number: any) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

export function extractDateFromString(dateString: string) {
  // Tạo một đối tượng Date từ chuỗi ngày
  let dateObj = new Date(dateString);

  // Trích xuất ngày, tháng và năm từ đối tượng Date
  let day = dateObj.getDate(); // Lấy ngày
  let month = dateObj.getMonth() + 1; // Lấy tháng (lưu ý: tháng bắt đầu từ 0)
  let year = dateObj.getFullYear(); // Lấy năm

  // Định dạng chuỗi ngày tháng năm
  let formattedDate = `${day}/${month}/${year}`;

  // Trả về chuỗi ngày đã định dạng
  return formattedDate;
}

export function extractHourMinuteFromString(dateString: string) {
  // Create a Date object from the date string
  let dateObj = new Date(dateString);

  // Extract hour and minute from the Date object
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();

  // Format the hour and minute
  let formattedTime = `${Number(hour) < 10 ? "0" + hour : hour}:${
    Number(minute) < 10 ? "0" + minute : minute
  }`;

  // Return the formatted time
  return formattedTime;
}

export function convertToISOString(dateString: string, timeString: string) {
  // Tách ngày, tháng và năm từ chuỗi ngày tháng năm
  let [day, month, year] = dateString.split("/");
  // Tách giờ và phút từ chuỗi giờ phút
  let [gio, phut] = timeString.split(":");

  // Tạo một đối tượng Date với thông tin từ chuỗi
  let dateObj = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(gio),
    Number(phut)
  );

  // Lấy chuỗi định dạng ISO 8601 từ đối tượng Date
  let isoString = dateObj.toISOString();

  return isoString;
}
