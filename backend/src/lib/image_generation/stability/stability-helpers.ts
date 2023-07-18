import {ImageToImageRequest} from "./stability-types";
import * as FormData from 'form-data';
import * as fs from "fs";
import * as path from "path";

export function createFormDataForImageToImage(request: ImageToImageRequest): FormData {
  const formData = new FormData();

  request.text_prompts.forEach((prompt, index) => {
    formData.append(`text_prompts[${index}][text]`, prompt.text);
    formData.append(`text_prompts[${index}][weight]`, prompt.weight.toString());
  });

  formData.append('init_image', fs.readFileSync(path.join(
    __dirname,
    '../base_images',
    request.init_image
  )));

  if (request.init_image_mode) {
    formData.append('init_image_mode', request.init_image_mode);
  }
  if (request.image_strength !== undefined) {
    formData.append('image_strength', request.image_strength.toString());
  }
  if (request.cfg_scale !== undefined) {
    formData.append('cfg_scale', request.cfg_scale.toString());
  }
  if (request.clip_guidance_preset) {
    formData.append('clip_guidance_preset', request.clip_guidance_preset);
  }
  if (request.sampler) {
    formData.append('sampler', request.sampler);
  }
  if (request.samples !== undefined) {
    formData.append('samples', request.samples.toString());
  }
  if (request.seed !== undefined) {
    formData.append('seed', request.seed.toString());
  }
  if (request.steps !== undefined) {
    formData.append('steps', request.steps.toString());
  }
  if (request.style_preset) {
    formData.append('style_preset', request.style_preset);
  }
  if (request.extras) {
    Object.entries(request.extras).forEach(([key, value]) => {
      formData.append(`extras[${key}]`, value);
    });
  }

  return formData;
}

export const typeToBaseImagePath = {
  sittingChumby: 'sitting_bear.png',
}
