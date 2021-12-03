<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <ProfileUser />

    <ProfileAddress
      v-for="(address, index) in addresses"
      :key="address.id"
      :address="address"
      :number="index + 1"
    />

    <div
      v-if="isAddressFormShown"
      class="layout__address"
      data-test="profile-form-wrapper"
    >
      <ProfileForm @close="onAddressFormClose" @submit="onAddressSubmit" />
    </div>

    <div class="layout__button">
      <button
        :disabled="isAddressFormShown"
        type="button"
        class="button button--border"
        data-test="open-new-address-form-button"
        @click="onAddressFormShowButtonClick"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";

import { mapActions, mapState } from "vuex";
import { auth } from "@/middlewares";

export default {
  name: "ProfileIndex",

  components: { ProfileUser, ProfileForm, ProfileAddress },

  layout: "AppLayoutWithSidebar",

  middlewares: [auth],

  data() {
    return {
      isAddressFormShown: false,
    };
  },

  computed: {
    ...mapState("Addresses", ["addresses"]),
  },

  created() {
    this.getAddresses();
  },

  methods: {
    ...mapActions("Addresses", { getAddresses: "query", addAddress: "post" }),

    onAddressFormShowButtonClick() {
      this.isAddressFormShown = true;
    },

    onAddressFormClose(callback) {
      callback();
      this.isAddressFormShown = false;
    },

    onAddressSubmit(address, callback) {
      callback();
      this.isAddressFormShown = false;
      this.addAddress(address);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
