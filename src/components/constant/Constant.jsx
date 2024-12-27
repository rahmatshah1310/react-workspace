/** @format */

export const options = [
  {
    value: "Day",
    label: "Day",
  },
  {
    value: "Week",
    label: "Week",
  },
  {
    value: "Month",
    label: "Month",
  },
  {
    value: "Year",
    label: "Year",
  },
];
export const items = [
  {
    key: "1",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.antgroup.com'>
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.aliyun.com'>
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.luohanacademy.com'>
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

export const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const optionItems = [
  { id: 1, label: "Day" },
  { id: 2, label: "Week" },
  { id: 3, label: "Month" },
  { id: 4, label: "Year" },
];

export const radioOptionsMonth = [
  { id: 1, label: "On day 24" },
  { id: 2, label: "On the fourth Tuesday" },
  { id: 3, label: "On the last Tuesday" },
];
export const radioOptionsYear = [
  { id: 1, label: "On December 24" },
  { id: 2, label: "On the fourth Tuesday of December" },
  { id: 3, label: "On the last Tuesday of December" },
];

export const WeekData = [
  { label: "M" },
  { label: "T" },
  { label: "W" },
  { label: "T" },
  { label: "F" },
  { label: "S" },
  { label: "S" },
];
// export const WeekData = ["M", "T", "W", "Th", "F", "Sa", "Su"];
export const daySelector = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const yearSelector = [
  "December 24",
  "the fourth Tuesday of December",
  "the last Tuesday of December",
];

export const monthSelector = [
  "day 24",
  "the fourth Tuesday",
  "the last Tuesday",
];
