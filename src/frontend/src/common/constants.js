export const DOUGH_TYPES = [
  {
    name: "Тонкое",
    value: "light",
  },
  {
    name: "Толстое",
    value: "large",
  },
];

export const SAUCE_TYPES = [
  {
    name: "Томатный",
    value: "tomato",
  },
  {
    name: "Сливочный",
    value: "creamy",
  },
];

export const PIZZA_SIZE_TEXT = {
  1: "small",
  2: "normal",
  3: "big",
};

export const PIZZA_SIZE_NUMBER = {
  small: 23,
  normal: 32,
  big: 45,
};

export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const RESOURCES = {
  AUTH: "auth",
  ADDRESSES: "addresses",
  DOUGH: "dough",
  INGREDIENTS: "ingredients",
  MISC: "misc",
  ORDERS: "orders",
  SAUCES: "sauces",
  SIZES: "sizes",
};

export const NOTIFICATION_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

export const NOTIFICATION_LIVE_TIME = 3000;

export const BUILDER_DEFAULTS = {
  doughId: 1,
  sizeId: 1,
  sauceId: 1,
};
