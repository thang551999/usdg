import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../place/entities/place.entity';
import { Customer } from '../users/entities/customer.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
    const users = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    const comment = await this.commentRepository.create({
      star: createCommentDto.star,
      comment: createCommentDto.comment,
      commentImages: createCommentDto.commentImages,
      commentVideos: createCommentDto.commentVideos,
      place: createCommentDto.place,
      customer,
      user: users,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async findAll(getParams) {
    const comment = await this.commentRepository.findAndCount({
      relations: ['customer', 'user'],
      where: {},
      skip: (getParams.page - 1) * getParams.pageSize,
      take: getParams.pageSize,
    });

    return {
      total: comment[1],
      pageSize: getParams.pageSize,
      currentPage: getParams.page,
      records: comment[0],
    };
  }

  async findByOwner(user, getParams) {
    const comment = await this.commentRepository.findAndCount({
      relations: ['customer', 'user'],
      where: {
        place: {
          owner: {
            id: user.relativeId,
          },
        },
      },
      skip: (getParams.page - 1) * getParams.pageSize,
      take: getParams.pageSize,
    });

    return {
      total: comment[1],
      pageSize: getParams.pageSize,
      currentPage: getParams.page,
      records: comment[0],
    };
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
