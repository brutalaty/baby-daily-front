import User from 'src/types/User';

const randy: User = {
  id: 4,
  name: 'Randy User',
  email: 'randy@example.com',
  updated_at: '2023-05-02T22:54:39.000000Z',
  created_at: '2023-05-02T22:54:39.000000Z',
  avatar: 'http://localhost:8000/storage/images/avatars/users/4.png',
};

const mockRandyUserGetResponse = {
  data: { ...randy },
};

export {
  randy as default,
  randy,
  mockRandyUserGetResponse as mockUserGetResponse,
  mockRandyUserGetResponse,
};
