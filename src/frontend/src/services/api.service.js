import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

import { DOUGH_TYPES, SAUCE_TYPES, PIZZA_SIZE_TEXT } from "@/common/constants";

export class AuthApiService {
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  async query() {
    const { data } = await axios.get(this.#resource);
    return data;
  }

  async get(id) {
    const { data } = await axios.get(`${this.#resource}/${id}`);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class OrderApiService extends CrudApiService {
  constructor() {
    super("orders");
  }
}

export class AddressApiService extends CrudApiService {
  constructor() {
    super("addresses");
  }
}

export class DoughApiService extends ReadOnlyApiService {
  constructor() {
    super("dough");
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
  constructor() {
    super("sauces");
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
  constructor() {
    super("sizes");
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
  constructor() {
    super("ingredients");
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
  constructor() {
    super("misc");
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
