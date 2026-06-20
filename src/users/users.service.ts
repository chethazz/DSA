export type User = {
  userId: number;
  username: string;
  password: string;
};

const users: User[] = [
  {
    userId: 1,
    username: 'alice',
    password: 'topsecret',
  },
  {
    userId: 2,
    username: 'bob',
    password: 'topsecret',
  },
];

export class UsersService {
  async findUserByname(username: string): Promise<User | undefined> {
    await Promise.resolve();
    return users.find((user) => user.username === username);
  }
}
