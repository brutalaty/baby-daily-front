import Family from 'src/types/Family';

const families: Family[] = [
  {
    id: 5,
    name: 'Nikolaus',
    created_at: '2023-04-25T09:08:05.000000Z',
    adults: [
      {
        id: 4,
        name: 'Randy User',
        relation: 'Father',
        manager: true,
        avatar: 'http://localhost:8000/storage/images/avatars/users/4.png',
      },
      {
        id: 5,
        name: 'Wonder Nikolaus',
        relation: 'Mother',
        manager: false,
        avatar: 'http://localhost:8000/storage/images/avatars/users/5.png',
      },
    ],
    children: [
      {
        id: 3,
        name: 'Dudley Nikolaus',
        born: '2022-10-03',
        family_id: 5,
        avatar: 'http://localhost:8000/storage/images/avatars/children/3.png',
        age: '6 months 4 weeks',
      },
      {
        id: 4,
        name: 'Janie Nikolaus',
        born: '2020-10-19',
        family_id: 5,
        avatar: 'http://localhost:8000/storage/images/avatars/children/4.png',
        age: '2 years 6 months',
      },
    ],
  },
  {
    id: 6,
    name: 'Ankunding',
    created_at: '2023-04-25T09:08:05.000000Z',
    adults: [
      {
        id: 4,
        name: 'Randy User',
        relation: 'Father',
        manager: true,
        avatar: 'http://localhost:8000/storage/images/avatars/users/4.png',
      },
    ],
    children: [
      {
        id: 5,
        name: 'Louisa Ankunding',
        born: '2022-02-04',
        family_id: 6,
        avatar: 'http://localhost:8000/storage/images/avatars/children/5.png',
        age: '1 year 2 months',
      },
      {
        id: 6,
        name: 'Lilliana Ankunding',
        born: '2020-10-16',
        family_id: 6,
        avatar: 'http://localhost:8000/storage/images/avatars/children/6.png',
        age: '2 years 6 months',
      },
    ],
  },
];

const family: Family = families[0];

export { families as default, families, family };
