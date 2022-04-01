import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IUserInfo, UserInfo } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { UserService } from './user.service';
@ApiTags('user-api')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin-get-user-info/:id')
  @ApiOperation({ summary: 'pt,admin get thông tin người dùng' })
  async adminGetInfoUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUserInfo(id);
  }

  @Get('/bonus')
  @ApiOperation({
    summary: 'user. get bonus user info',
  })
  @UseGuards(JwtAuthGuard)
  async getBonusUser(@UserInfo() user: IUserInfo) {
    return this.userService.getBonusUser(user.id);
  }
}
