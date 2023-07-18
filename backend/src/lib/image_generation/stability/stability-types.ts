export interface StabilityPrompt {
  text: string;
  weight: number;
}

export enum ClipGuidancePreset {
  FAST_BLUE = 'FAST_BLUE',
  FAST_GREEN = 'FAST_GREEN',
  NONE = 'NONE',
  SIMPLE = 'SIMPLE',
  SLOW = 'SLOW',
  SLOWER = 'SLOWER',
  SLOWEST = 'SLOWEST',
}

export enum Sampler {
  DDIM = 'DDIM',
  DDPM = 'DDPM',
  K_DPMPP_2M = 'K_DPMPP_2M',
  K_DPMPP_2S_ANCESTRAL = 'K_DPMPP_2S_ANCESTRAL',
  K_DPM_2 = 'K_DPM_2',
  K_DPM_2_ANCESTRAL = 'K_DPM_2_ANCESTRAL',
  K_EULER = 'K_EULER',
  K_EULER_ANCESTRAL = 'K_EULER_ANCESTRAL',
  K_HEUN = 'K_HEUN', 
  K_LMS = 'K_LMS',
}

export enum StylePreset {
  ThreeDModel = '3d-model',
  AnalogFilm = 'analog-film',
  Anime = 'anime',
  Cinematic = 'cinematic',
  ComicBook = 'comic-book',
  DigitalArt = 'digital-art',
  Enhance = 'enhance',
  FantasyArt = 'fantasy-art',
  Isometric = 'isometric',
  LineArt = 'line-art',
  LowPoly = 'low-poly',
  ModelingCompound = 'modeling-compound',
  NeonPunk = 'neon-punk',
  Origami = 'origami',
  Photographic = 'photographic',
  PixelArt = 'pixel-art',
  TileTexture = 'tile-texture',
}

export interface ImageToImageRequest {
  text_prompts: StabilityPrompt[];
  init_image: string;
  init_image_mode?: 'IMAGE_STRENGTH' | 'STEP_SCHEDULE';
  image_strength?: number;
  cfg_scale?: number;
  clip_guidance_preset?: ClipGuidancePreset;
  sampler?: Sampler;
  samples?: number;
  seed?: number;
  steps?: number;
  style_preset?: StylePreset;
  extras?: Object;
}

export interface Artifact {
  base64: string;
  seed: number;
  finishReason: string;
}

export interface GenerationResponse {
  artifacts: Array<Artifact>;
}
