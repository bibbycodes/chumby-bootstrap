import {User} from "./user.schema";

export const getFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
}
