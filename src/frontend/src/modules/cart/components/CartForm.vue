<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="deliveryOption"
          name="test"
          class="select"
          data-test="cart-form-select"
        >
          <option :value="1">Заберу сам</option>
          <option :value="2">Новый адрес</option>
          <template v-if="addresses.length">
            <option
              v-for="address in addresses"
              :key="address.id"
              :value="address.name"
            >
              {{ address.name }}
            </option>
          </template>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          :value="phone"
          type="tel"
          name="tel"
          placeholder="+7 999-999-99-99"
          data-test="cart-phone"
          @input="setPhone($event.target.value)"
        />
      </label>

      <div
        v-if="!isPickupChosen"
        class="cart-form__address"
        data-test="cart-address-form"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              :value="address.street"
              :disabled="isInputDisabled"
              type="text"
              name="street"
              required
              @input="
                setAddressProperty({
                  property: 'street',
                  value: $event.target.value,
                })
              "
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              :value="address.building"
              :disabled="isInputDisabled"
              type="text"
              name="house"
              required
              @input="
                setAddressProperty({
                  property: 'building',
                  value: $event.target.value,
                })
              "
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              :value="address.flat"
              :disabled="isInputDisabled"
              type="text"
              name="apartment"
              @input="
                setAddressProperty({
                  property: 'flat',
                  value: $event.target.value,
                })
              "
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  SET_ADDRESS,
  SET_ADDRESS_PROPERTY,
  SET_PHONE,
} from "@/store/mutations-types";

export default {
  name: "CartForm",

  data() {
    return {
      deliveryOption: 1,
    };
  },

  computed: {
    ...mapState("Cart", ["phone", "address"]),
    ...mapState("Addresses", ["addresses"]),
    ...mapGetters("Addresses", ["getAddressByName"]),

    isPickupChosen() {
      return this.deliveryOption === 1;
    },

    isNewAddressOptionChosen() {
      return this.deliveryOption === 2;
    },

    isExistingAddressChosen() {
      return typeof this.deliveryOption === "string";
    },

    isInputDisabled() {
      return this.isPickupChosen || this.isExistingAddressChosen;
    },
  },

  watch: {
    deliveryOption() {
      if (this.isExistingAddressChosen) {
        const address = this.getAddressByName(this.deliveryOption);

        this.setAddress({
          id: address.id,
          street: address.street,
          building: address.building,
          flat: address.flat,
        });
      } else if (this.isNewAddressOptionChosen) {
        this.setAddress({
          street: "",
          building: "",
          flat: "",
        });
      } else {
        this.setAddress(null);
      }
    },
  },

  methods: {
    ...mapMutations("Cart", {
      setPhone: SET_PHONE,
      setAddressProperty: SET_ADDRESS_PROPERTY,
      setAddress: SET_ADDRESS,
    }),
  },
};
</script>

<style lang="scss" scoped>
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
