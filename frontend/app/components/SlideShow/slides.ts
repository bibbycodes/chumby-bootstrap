import path from "path";
import {Slide} from "@/app/components/SlideShow/SlideShow";

export const fumbyLandingPageSlides :[Slide] = [
  {
    image: '/shiba_fumby.png',
    caption: 'A shiba inu wearing glasses and a gold collar'
  },
  {
    image: '/bear_fumby.png',
    caption: 'A bear wearing a blue bowtie'
  },
  {
    image: '/hamster_fumby.png',
    caption: 'A hamster with a cool haircut'
  },
  {
    image: '/pug_fumby.png',
    caption: 'A pug wearing a bowtie'
  },
  {
    image: '/tiger_fumby.png',
    caption: 'A tiger wearing a sunglasses'
  }
].map((slide) => {
  return {
    ...slide,
    image: path.join('/assets/fumbies', (slide.image)),
  }
})
