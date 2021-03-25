const toWeekDayString = (weekDay: number) => {
  switch (weekDay) {
    case 1:
      return "Chủ nhật";
    case 2:
      return "Thứ hai";
    case 3:
      return "Thứ ba";
    case 4:
      return "Thứ tư";
    case 5:
      return "Thứ năm";
    case 6:
      return "Thứ sáu";
    case 7:
      return "Thứ bảy";
  }
};

export default toWeekDayString;
