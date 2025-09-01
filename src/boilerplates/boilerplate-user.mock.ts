import { User } from '@prisma/client';

export function mockBoilerplateUser({ name, email }: Partial<User>): User {
  return {
    user_id: 'b60b728d450146a1bbb4836ed61c93c7',
    name: name || 'John Doe',
    email: email || 'John.doe@domain.com',
    password: 'mockPassword123!',
    user_type: 'user',
    profile_picture: 'https://example.com/profile.jpg',
    creation_date: new Date(),
  };
}

export const mockTestBoilerplateUserDto: User = mockBoilerplateUser({
  name: 'John Doe',
  email: 'john.doe@example.com',
});

export const mockTestBoilerplateUsers: User[] = [
  mockBoilerplateUser({
    name: 'Alice Smith',
    email: 'alice.smith@domain.com',
  }),
];
