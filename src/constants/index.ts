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

export const startTimeOptions: { index: number; text: string }[] = [
  { index: 1, text: "12:00 AM" },
  { index: 2, text: "12:30 AM" },
  { index: 3, text: "1:00 AM" },
  { index: 4, text: "1:30 AM" },
  { index: 5, text: "2:00 AM" },
  { index: 6, text: "2:30 AM" },
  { index: 7, text: "3:00 AM" },
  { index: 8, text: "3:30 AM" },
  { index: 9, text: "4:00 AM" },
  { index: 10, text: "4:30 AM" },
  { index: 11, text: "5:00 AM" },
  { index: 12, text: "5:30 AM" },
  { index: 13, text: "6:00 AM" },
  { index: 14, text: "6:30 AM" },
  { index: 15, text: "7:00 AM" },
  { index: 16, text: "7:30 AM" },
  { index: 17, text: "8:00 AM" },
  { index: 18, text: "8:30 AM" },
  { index: 19, text: "9:00 AM" },
  { index: 20, text: "9:30 AM" },
  { index: 21, text: "10:00 AM" },
  { index: 22, text: "10:30 AM" },
  { index: 23, text: "11:00 AM" },
  { index: 24, text: "11:30 AM" },
  { index: 25, text: "12:00 PM" },
  { index: 26, text: "12:30 PM" },
  { index: 27, text: "1:00 PM" },
  { index: 28, text: "1:30 PM" },
  { index: 29, text: "2:00 PM" },
  { index: 30, text: "2:30 PM" },
  { index: 31, text: "3:00 PM" },
  { index: 32, text: "3:30 PM" },
  { index: 33, text: "4:00 PM" },
  { index: 34, text: "4:30 PM" },
  { index: 35, text: "5:00 PM" },
  { index: 36, text: "5:30 PM" },
  { index: 37, text: "6:00 PM" },
  { index: 38, text: "6:30 PM" },
  { index: 39, text: "7:00 PM" },
  { index: 40, text: "7:30 PM" },
  { index: 41, text: "8:00 PM" },
  { index: 42, text: "8:30 PM" },
  { index: 43, text: "9:00 PM" },
  { index: 44, text: "9:30 PM" },
  { index: 45, text: "10:00 PM" },
  { index: 46, text: "10:30 PM" },
  { index: 47, text: "11:00 PM" },
  { index: 48, text: "11:30 PM" },
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
