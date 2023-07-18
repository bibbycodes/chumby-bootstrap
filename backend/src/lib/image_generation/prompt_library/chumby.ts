import {StabilityPrompt} from "../stability/stability-types";

export enum Creatures {
  Dog = 'dog',
  Cat = 'cat',
  Panda = 'panda bear',
  Bear = 'bear',
  Koala = 'koala',
  Tiger = 'tiger',
  Lion = 'lion',
  Cheetah = 'cheetah',
  Fox = 'fox',
  Wolf = 'wolf',
  Otter = 'otter',
  Rabbit = 'rabbit',
  Squirrel = 'squirrel',
  Hedgehog = 'hedgehog',
  Raccoon = 'raccoon',
  Monkey = 'monkey',
  Penguin = 'penguin',
  Dolphin = 'dolphin',
  Owl = 'owl',
  Seal = 'seal',
  Kangaroo = 'kangaroo',
  Sloth = 'sloth',
  PolarBear = 'polar bear',
  RedPanda = 'red panda',
  Meerkat = 'meerkat',
}

const generateApparelString = (apparel: string[]): string => {
  if (apparel.length === 0) {
    return ''
  }
  if (apparel.length === 1) {
    return apparel[0]
  }
  const lastApparel = apparel.pop()
  return `${apparel.join(', ')} and ${lastApparel}`
}

export const sittingChumbyPrompt = (
  creature: Creatures,
  apparel: string[],
  artist?: string,
): StabilityPrompt[] => {
  const negativePrompt = {
    text: 'person human texture',
    weight: -1,
  }
  const positivePrompt = {
    text: `
    Digital cartoon art of a cute baby ${creature} wearing a ${generateApparelString(apparel)} by ${artist ?? 'Ken Sugimori'}. 
    Simple circular sticker art logo on a white background pixiv
    `,
    weight: 1,
  }
  return [positivePrompt, negativePrompt]
}


