<template>
  <div class="backdrop" @click="onClose">
    <div class="popup" @click.stop>
      <button class="close btn-close" @click.prevent="onClose">
        <span class="visually-hidden">Закрыть попап</span>
      </button>

      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>

      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>

      <div class="popup__button">
        <a href="#" class="button" @click.prevent="onClose">
          Отлично, я жду!
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartModal",

  methods: {
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}

.btn-close {
  background-color: transparent;
  border: none;
}
</style>
