/**
 * Options for constructing a user response object
 */
export interface UserResponseOptions {
  includeEmail?: boolean;
}

export interface SuperUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
