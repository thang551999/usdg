import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_FAIL, FILE_LIMIT, MAX_SIZE } from '../../common/constant';
import { UploadService } from './upload.service';

@ApiTags('Upload File')
@ApiConsumes('Upload File')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('s3')
  @ApiOperation({ summary: 'Upload file to s3' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadS3(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    if (file.size > MAX_SIZE)
      return {
        code: API_FAIL,
        message: FILE_LIMIT,
      };
    // if (!file) throw new ApiError(null, null, NFT_RESPOND_MESSAGE.FILE_FORMAT_NOT_SUPPORT);
    return this.uploadService.uploadFileS3(file);
  }
}
