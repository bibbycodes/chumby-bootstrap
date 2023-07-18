import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.schema';

@Injectable()
export class ImageModel {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async create(imageData: Partial<Image>): Promise<Image> {
    const createdImage = new this.imageModel(imageData);
    return createdImage.save();
  }

  async findById(id: string): Promise<Image> {
    return this.imageModel.findById(id).exec();
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async update(id: string, updateData: Partial<Image>): Promise<Image> {
    return this.imageModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Image> {
    return this.imageModel.findByIdAndDelete(id).exec();
  }
}
