import Child from 'src/types/Child';

const children: Child[] = [
  {
    id: 1,
    name: 'Amiya Boss',
    born: '2021-04-13',
    family_id: 1,
    avatar: 'http://localhost:8000/storage/images/avatars/children/1.png',
    age: '2 years',
  },
  {
    id: 2,
    name: 'Ethyl Boss',
    born: '2022-08-10',
    family_id: 1,
    avatar: 'http://localhost:8000/storage/images/avatars/children/2.png',
    age: '8 months 3 days',
  },
];

const child: Child = children[0];

export { children as default, child };
