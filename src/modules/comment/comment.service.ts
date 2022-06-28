import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../place/entities/place.entity';
import { Customer } from '../users/entities/customer.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createCommentDto: CreateCommentDto, user) {
    const customer = await this.customerRepository.findOne({
      where: {
        id: user.relativeId,
      },
    });
    const comment = await this.commentRepository.create({
      star: createCommentDto.star,
      comment: createCommentDto.comment,
      commentImages: createCommentDto.commentImages,
      commentVideos: createCommentDto.commentVideos,
      place: createCommentDto.place,
      customer,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  findAll() {
    return this.commentRepository.find();
  }

  findByOwner(user) {
    console.log(user);
    return this.commentRepository.find({
      where: {
        place: {
          owner:{
            id: user.relativeId
          },
        },
      },
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
