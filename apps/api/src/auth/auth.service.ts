import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRegisterDTO, UserLoginDTO } from '@agx/dto';
import { tryGet } from '@agx/utils';
import { environment } from '../environments/environment';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService) {
    this.createAdmin();
  }

  async register(data: UserRegisterDTO) {
    return await this.userService.create(data);
  }

  async login(data: UserLoginDTO) {
    const { username, email, password } = data;
    const user = await this.userService.userRepository.findOne({ where: [{ username }, { email }] });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return tryGet(() => user.toResponseDTO({ includeToken: true, includeEmail: true }));
  }

  private createAdmin() {
    this.userService.userRepository
      .findOne({ where: { username: environment.adminInfo.username } })
      .then(admin => {
        if (!admin) {
          this.register(environment.adminInfo);
        }
      })
      .catch(err => console.log(err));
  }
}
