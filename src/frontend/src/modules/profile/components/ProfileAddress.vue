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
      <small
        v-if="address.comment"
        data-test="address-comment"
      >
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

<style lang="scss" scoped>
.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
