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
        type="button"
        class="button button--border"
        data-test="open-new-address-form-button"
        @click="onAddressFormShowButtonClick"
        :disabled="isAddressFormShown"
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

export default {
  name: "Profile",

  components: { ProfileUser, ProfileForm, ProfileAddress },

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
