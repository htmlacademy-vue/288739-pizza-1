<template>
  <div :class="radioButtonClass" class="radio-button">
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

    size: {
      type: String,
      required: false,
    },
  },

  computed: {
    radioButtonClass() {
      switch (this.size) {
        case "small":
          return "radio-button--small";
        case "big":
          return "radio-button--big";
        default:
          return "radio-button--big";
      }
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

  &--small {
    label {
      &::before {
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        border: 1px solid #b3abbc;
      }
    }

    &:hover label::before {
      box-shadow: none;
      border-color: $purple-800;
    }

    input:checked + label::before {
      box-shadow: none;
      border: 6px solid #41b619;
    }
  }
}
</style>
