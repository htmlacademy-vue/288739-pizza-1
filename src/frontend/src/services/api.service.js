import JwtService from "@/services/jwt.service";
import axiosInstance from "@/plugins/axios";

import { DOUGH_TYPES, SAUCE_TYPES, PIZZA_SIZE_TEXT } from "@/common/constants";
class BaseApiService {
  constructor(notifier) {
    if (!axiosInstance.$notifier) {
      axiosInstance.$notifier = notifier;
    }
  }
}
export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axiosInstance.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axiosInstance.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axiosInstance.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axiosInstance.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query() {
    const { data } = await axiosInstance.get(this.#resource);
    return data;
  }

  async get(id) {
    const { data } = await axiosInstance.get(`${this.#resource}/${id}`);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axiosInstance.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axiosInstance.put(
      `${this.#resource}/${entity.id}`,
      entity
    );
    return data;
  }

  async delete(id) {
    const { data } = await axiosInstance.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class OrderApiService extends CrudApiService {
  constructor(notifier) {
    super("orders", notifier);
  }
}

export class AddressApiService extends CrudApiService {
  constructor(notifier) {
    super("addresses", notifier);
  }
}

export class DoughApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super("dough", notifier);
  }

  _normalize(dough) {
    return {
      ...dough,
      value: DOUGH_TYPES.find((it) => it.name === dough.name).value,
    };
  }

  async query() {
    const doughList = await super.query();
    return doughList.map((dough) => this._normalize(dough));
  }
}

export class SauceApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super("sauces", notifier);
  }

  _normalize(sauce) {
    return {
      ...sauce,
      value: SAUCE_TYPES.find((it) => it.name === sauce.name).value,
    };
  }

  async query() {
    const sauces = await super.query();
    return sauces.map((sauce) => this._normalize(sauce));
  }
}

export class SizeApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super("sizes", notifier);
  }

  _normalize(size) {
    return {
      ...size,
      value: PIZZA_SIZE_TEXT[size.multiplier],
    };
  }

  async query() {
    const sizes = await super.query();
    return sizes.map((size) => this._normalize(size));
  }
}

export class IngredientApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super("ingredients", notifier);
  }

  _normalize(ingredient) {
    return {
      ...ingredient,
      value: ingredient.image.match(/[A-Za-z-_]*\.svg$/)[0].slice(0, -4),
      count: 0,
    };
  }

  async query() {
    const ingredients = await super.query();
    return ingredients.map((ingredient) => this._normalize(ingredient));
  }
}

export class MiscApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super("misc", notifier);
  }

  _normalize(misc) {
    return {
      ...misc,
      quantity: 0,
    };
  }

  async query() {
    const miscList = await super.query();
    return miscList.map((misc) => this._normalize(misc));
  }
}
