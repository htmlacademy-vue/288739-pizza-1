<template>
  <div class="radio-input">
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
.radio-input {
  position: absolute;
  top: 18px;
  cursor: pointer;

  label::before {
    position: absolute;
    top: 50%;
    left: 0;

    transform: translate(0, -50%);

    width: 36px;
    height: 36px;

    content: "";
    transition: 0.3s;

    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &:hover label::before {
    box-shadow: $shadow-regular;
  }

  input:checked + label::before {
    box-shadow: $shadow-large;
  }
}
</style>
