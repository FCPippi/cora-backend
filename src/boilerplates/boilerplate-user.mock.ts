import { User } from '@prisma/client';

export function mockBoilerplateUser({ name, email }: Partial<User>): User {
  return {
    id: 'b60b728d450146a1bbb4836ed61c93c7',
    name: name || 'John Doe',
    email: email || 'John.doe@domain.com',
    createdAt: new Date(),
    updatedAt: new Date(),
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
