import { HttpCode, Put, Query, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IUserInfo, UserInfo } from 'src/common/decorators/user.decorator';
import { API_SUCCESS } from '../../common/constant';
import { AuthService } from './auth.service';
import {
  ChangePasswordUserDto,
  ResChangePasswordUserDto,
} from './dto/change-password.dto';
import {
  ForgotPasswordDto,
  ResForgotPasswordDto,
} from './dto/forgot-password.dto';
import { ActiveEmail, LoginUserDto, ResLoginUserDto } from './dto/login.dto';
import { RefreshTokenDto, ResRefreshTokenDto } from './dto/refresh-token.dto';
import {
  RegisterUserDto,
  ResRegisterDto,
  ResUserInfoDto,
} from './dto/register.dto';
import { ResUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt.strategy';
@ApiTags('Auth Api')
@ApiConsumes('Auth Api')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Api đăng ký user hoặc chủ sân' })
  @ApiOkResponse({ type: ResRegisterDto, status: 200 })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user Api - {Thang}' })
  @ApiOkResponse({ type: ResLoginUserDto, status: 200 })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Login user Api - {Thang}' })
  @ApiOkResponse({ type: ResLoginUserDto, status: 200 })
  async activeEmail(@Query() token: ActiveEmail) {
    await this.authService.activeEmail(token);
    return {
      code: API_SUCCESS,
    };
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Send mail Forgot Password . Gửi mail khi quên mật khẩu - {Thang}',
  })
  @ApiOkResponse({ type: ResForgotPasswordDto, status: 200 })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ResUserInfoDto, status: 200 })
  @ApiOperation({
    summary: 'Get user info of me . Lấy Thông Tin Của Tôi-thang',
  })
  async getInfo(@UserInfo() user: IUserInfo) {
    return this.authService.getUser(user.id);
  }

  @Put('update')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update User Info . Cập nhật thông tin của user -{thangdp}',
  })
  @ApiOkResponse({ type: ResUpdateUserDto, status: 200 })
  async updateInfo(
    @Body() updateUserDto: UpdateUserDto,
    @UserInfo() user: IUserInfo,
  ) {
    return this.authService.updateInfo(user.id, updateUserDto);
  }

  @Put('change-password')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change Password User .Đổi mật khẩu của user' })
  @ApiOkResponse({ type: ResChangePasswordUserDto, status: 200 })
  async changePassword(
    @Body() changePasswordUserDto: ChangePasswordUserDto,
    @UserInfo() user: IUserInfo,
  ) {
    return this.authService.changePassword(user.id, changePasswordUserDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token Api .Refresh token Api' })
  @ApiOkResponse({ type: ResRefreshTokenDto, status: 200 })
  @HttpCode(200)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.token);
  }
}
