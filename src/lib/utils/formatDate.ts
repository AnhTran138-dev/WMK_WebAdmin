export enum FormatType {
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
}

export function formatFromISOString(
  isoString: string | Date,
  format: FormatType
): string {
  const date = new Date(isoString);
  let formattedDateTime = "";

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  };

  switch (format) {
    case FormatType.DATE:
      formattedDateTime = date.toLocaleDateString("en-US", dateOptions);
      break;
    case FormatType.TIME:
      formattedDateTime = date.toLocaleTimeString("en-US", timeOptions);
      break;
    case FormatType.DATETIME:
      formattedDateTime = date.toLocaleString("en-US", {
        ...dateOptions,
        ...timeOptions,
      });
      break;
    default:
      throw new Error("Invalid format type");
  }

  return formattedDateTime;
}

export function formatDateToYYYYMMDD(dateString: string): string {
  // Tách ngày, tháng và năm từ chuỗi đầu vào
  const parts = dateString.split("/");
  const month = parts[0];
  const day = parts[1];
  const year = parts[2];

  // Định dạng lại chuỗi theo dạng YYYY-MM-DD
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;

  return formattedDate;
}
