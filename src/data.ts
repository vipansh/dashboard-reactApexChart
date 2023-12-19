export type AgeType = "All" | "15-25" | ">25";
export type GenderType = "All" | "Male" | "Female";

export type DataType = {
  day: string;
  age: "15-25" | ">25";
  gender: "Male" | "Female";
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};
export const data: DataType[] = [
  {
    day: "4/10/2022",
    age: "15-25",
    gender: "Male",
    a: 999,
    b: 348,
    c: 824,
    d: 22,
    e: 34,
    f: 126,
  },
  {
    day: "4/10/2022",
    age: ">25",
    gender: "Male",
    a: 50,
    b: 108,
    c: 839,
    d: 160,
    e: 706,
    f: 611,
  },
  {
    day: "4/10/2022",
    age: "15-25",
    gender: "Female",
    a: 886,
    b: 110,
    c: 328,
    d: 665,
    e: 897,
    f: 869,
  },
  {
    day: "4/10/2022",
    age: ">25",
    gender: "Female",
    a: 814,
    b: 904,
    c: 460,
    d: 110,
    e: 793,
    f: 135,
  },
  {
    day: "29/10/2022",
    age: "15-25",
    gender: "Male",
    a: 991,
    b: 289,
    c: 106,
    d: 999,
    e: 860,
    f: 873,
  },
  {
    day: "29/10/2022",
    age: ">25",
    gender: "Male",
    a: 691,
    b: 659,
    c: 20,
    d: 404,
    e: 275,
    f: 170,
  },
  {
    day: "29/10/2022",
    age: "15-25",
    gender: "Female",
    a: 331,
    b: 752,
    c: 599,
    d: 479,
    e: 74,
    f: 897,
  },
  {
    day: "29/10/2022",
    age: ">25",
    gender: "Female",
    a: 91,
    b: 856,
    c: 197,
    d: 848,
    e: 275,
    f: 963,
  },
];
