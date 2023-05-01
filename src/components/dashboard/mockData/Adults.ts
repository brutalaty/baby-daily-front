import Adult from 'src/types/Adult';

const adults: Adult[] = [
  {
    id: 1,
    name: 'Da Boss',
    relation: 'Father',
    manager: true,
    avatar: 'http://localhost:8000/storage/images/avatars/users/1.png',
  },
  {
    id: 2,
    name: 'Grace Boss',
    relation: 'Mother',
    manager: false,
    avatar: 'http://localhost:8000/storage/images/avatars/users/2.png',
  },
];

const manager: Adult = adults[0];
const nonManager: Adult = adults[1];

export { adults as default, manager, nonManager as adult };
