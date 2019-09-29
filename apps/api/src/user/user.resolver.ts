import { Query, Resolver } from '@nestjs/graphql';

import { UserResponseDTO } from '@agx/dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [UserResponseDTO])
  users(): Promise<UserResponseDTO[]> {
    return this.userService.findAll();
  }
}
