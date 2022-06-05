import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../place/entities/place.entity';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';
import { TypePlace } from '../place/entities/type-place.entity';
import { Customer } from '../users/entities/customer.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Comment, Customer])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
