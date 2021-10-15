import resources from "@/common/enums/resources";
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

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.ORDERS]: new OrderApiService(),
    [resources.DOUGH]: new DoughApiService(),
    [resources.INGREDIENTS]: new IngredientApiService(),
    [resources.MISC]: new MiscApiService(),
    [resources.SAUCES]: new SauceApiService(),
    [resources.SIZES]: new SizeApiService(),
    [resources.ADDRESSES]: new AddressApiService(),
  };
};
