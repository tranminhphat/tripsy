import PersonalInfoSettings from "assets/images/icons/info-settings.svg";
import PasswordSettings from "assets/images/icons/password-settings.svg";

export const themes = [
  { id: "6040f1eff1be2a20fc64352f", value: "Animals", name: "Động vật" },
  {
    id: "6040f4d76b4a1124acdd80c4",
    value: "Art and Design",
    name: "Hội họa và Điêu khắc",
  },
  {
    id: "6040f4d86b4a1124acdd80c5",
    value: "Culture and Society",
    name: "Văn hóa và Xã hội",
  },
  { id: "6040f4d86b4a1124acdd80c6", value: "Drink", name: "Đồ uống" },
  { id: "6040f4d86b4a1124acdd80c7", value: "Entertainment", name: "Giải trí" },
  { id: "6040f4d96b4a1124acdd80c8", value: "Food", name: "Đồ ăn" },
  {
    id: "6040f4d96b4a1124acdd80c9",
    value: "History and Literature",
    name: "Lịch sử và văn học",
  },
  {
    id: "6040f4d96b4a1124acdd80ca",
    value: "Nature and Outdoors",
    name: "Thiên nhiên và Ngoài trời",
  },
  { id: "6040f4da6b4a1124acdd80cb", value: "Shopping", name: "Mua sắm" },
  { id: "6040f4da6b4a1124acdd80cc", value: "Sports", name: "Thể thao" },
  { id: "6040f4da6b4a1124acdd80cd", value: "Wellness", name: "Sức khỏe" },
];

export const languages: string[] = ["Tiếng Việt", "English"];

export const groupSizeOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const durationOptions: number[] = [
  1,
  1.5,
  2,
  2.5,
  3,
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
  11,
  11.5,
  12,
  12.5,
  13,
  13.5,
  14,
  14.5,
  15,
  15.5,
  16,
  16.5,
];

export const startTimeOptions: string[] = [
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

export const bookingDateOptions: number[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
];

export const accountSettingOptions: {
  id: number;
  icon: any;
  title: string;
  description: string;
  url: string;
}[] = [
  {
    id: 1,
    icon: PersonalInfoSettings,
    title: "Thông tin cá nhân",
    description:
      "Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ với bạn",
    url: "/account-settings/personal-info",
  },
  {
    id: 2,
    icon: PasswordSettings,
    title: "Đăng nhập và bảo mật",
    description: "Cập nhật mật khẩu và bảo mật tài khoản của bạn",
    url: "/account-settings/login-and-security",
  },
];
