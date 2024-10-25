export const usersColumns = [
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    sorter: (a: { gender: string; }, b: { gender: string }) => a.gender.length - b.gender.length,
  },  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: (a: { firstName: string }, b: { firstName: string }) => a.firstName.length - b.firstName.length,
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: (a: { lastName: string }, b: { lastName: string }) => a.lastName.length - b.lastName.length,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: 'age',
    sorter: (a: { age: number; }, b: { age: number; }) => a.age - b.age,
  },
];
