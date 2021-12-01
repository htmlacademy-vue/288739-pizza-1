<template>
  <div class="layout__address">
    <div
      v-if="!isAddressFormShown"
      class="sheet address-form"
      data-test="address-info-card"
    >
      <div class="address-form__header">
        <b data-test="address-number-and-name">
          Адрес №{{ number }}. {{ address.name }}
        </b>

        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            data-test="address-edit-button"
            @click="onShowAddressFormButtonClick"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>

      <p data-test="address-full">
        {{ address.street }}, д. {{ address.building
        }}<template v-if="address.flat"> , оф. {{ address.flat }} </template>
      </p>
      <small v-if="address.comment" data-test="address-comment">
        {{ address.comment }}
      </small>
    </div>

    <ProfileForm
      v-else
      :address="address"
      :number="number"
      @close="onAddressFormClose"
      @submit="onAddressFormSubmit"
    />
  </div>
</template>

<script>
import ProfileForm from "@/modules/profile/components/ProfileForm";

import { mapActions } from "vuex";

export default {
  name: "ProfileAddress",

  components: { ProfileForm },

  props: {
    address: {
      type: Object,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isAddressFormShown: false,
    };
  },

  methods: {
    ...mapActions("Addresses", { deleteAddress: "delete", editAddress: "put" }),

    onShowAddressFormButtonClick() {
      this.isAddressFormShown = true;
    },

    onAddressFormClose(callback) {
      this.deleteAddress(this.address.id);
      callback();
      this.isAddressFormShown = false;
    },

    onAddressFormSubmit(address, callback) {
      this.editAddress(address);
      callback();
      this.isAddressFormShown = false;
    },
  },
};
</script>
