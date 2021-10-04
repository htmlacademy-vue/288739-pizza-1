import { DOUGH_TYPES, SAUCE_TYPES, PIZZA_SIZE_TEXT } from "@/common/constants";

export const normalizeDough = (dough) => ({
  ...dough,
  value: DOUGH_TYPES.find((it) => it.name === dough.name).value,
});

export const normalizeSize = (size) => ({
  ...size,
  value: PIZZA_SIZE_TEXT[size.multiplier],
});

export const normalizeSauce = (sauce) => ({
  ...sauce,
  value: SAUCE_TYPES.find((it) => it.name === sauce.name).value,
});

export const normalizeIngredient = (ingredient) => ({
  ...ingredient,
  value: ingredient.image.match(/[A-Za-z-_]*\.svg$/)[0].slice(0, -4),
  count: 0,
});

export const normalizeMisc = (misc) => ({
  ...misc,
  quantity: 0,
});
