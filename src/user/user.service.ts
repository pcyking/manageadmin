import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { md5 } from 'src/utils/md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    if (!username || !password) {
      throw new HttpException('账号密码不能为空', 200);
    }
    const existUser = await this.userRepository.findOneBy({
      username,
    });
    if (existUser) {
      throw new HttpException('用户名已存在', 200);
    }
    // 对密码进行加密
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.password = md5(createUserDto.password);
    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
