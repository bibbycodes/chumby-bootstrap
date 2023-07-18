import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  bucketName: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true })
  key: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);

export type ImageDocument = Image & Document;
