<template>
  <div class="radio-button">
    <input
      :id="id"
      :checked="isChecked"
      :name="name"
      :value="value"
      type="radio"
      class="visually-hidden"
    />
    <label :for="id" />
  </div>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    id: {
      type: String,
      required: true,
    },

    isChecked: {
      type: Boolean,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.radio-button {
  position: absolute;
  width: 100%;
  height: 100%;

  label {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &::before {
      position: absolute;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  &:hover label::before {
    box-shadow: $shadow-regular;
  }

  input:checked + label::before {
    box-shadow: $shadow-large;
  }
}
</style>
