import { RESOURCES } from "@/common/constants";
import {
  AuthApiService,
  DoughApiService,
  IngredientApiService,
  MiscApiService,
  SauceApiService,
  SizeApiService,
  OrderApiService,
  AddressApiService,
} from "@/services/api.service";

export const createResources = () => ({
  [RESOURCES.AUTH]: new AuthApiService(),
  [RESOURCES.ORDERS]: new OrderApiService(),
  [RESOURCES.DOUGH]: new DoughApiService(),
  [RESOURCES.INGREDIENTS]: new IngredientApiService(),
  [RESOURCES.MISC]: new MiscApiService(),
  [RESOURCES.SAUCES]: new SauceApiService(),
  [RESOURCES.SIZES]: new SizeApiService(),
  [RESOURCES.ADDRESSES]: new AddressApiService(),
});

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit("Auth/SET_IS_AUTHENTICATED", true);
};

const getNormalizedPizza = (
  pizza,
  { sauceList, doughList, sizeList, ingredients: storeIngredients }
) => {
  const sauce = sauceList.find((it) => it.id === pizza.sauceId);
  const dough = doughList.find((it) => it.id === pizza.doughId);
  const size = sizeList.find((it) => it.id === pizza.sizeId);

  const ingredients = pizza.ingredients.map((it) => {
    const ingredient = storeIngredients.find((el) => el.id === it.ingredientId);
    return { ...ingredient, count: it.quantity };
  });

  const ingredientsPrice = ingredients.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return {
    id: pizza.id,
    name: pizza.name,
    orderId: pizza.orderId,
    dough,
    sauce,
    size,
    ingredients,
    quantity: pizza.quantity,
    price: (dough.price + sauce.price + ingredientsPrice) * size.multiplier,
  };
};

const getNormalizedMisc = (misc, additionalList) => {
  const additionalListItem = additionalList.find((it) => misc.miscId === it.id);
  return {
    ...additionalListItem,
    quantity: misc.quantity,
  };
};

export const getNormalizedOrder = (order, builderData, additionalList) => {
  const orderPizzas = order.orderPizzas.map((pizza) =>
    getNormalizedPizza(pizza, builderData)
  );

  let orderMisc = [];

  if (order.orderMisc) {
    orderMisc = order.orderMisc.map((it) =>
      getNormalizedMisc(it, additionalList)
    );
  }

  return { ...order, orderPizzas, orderMisc };
};
