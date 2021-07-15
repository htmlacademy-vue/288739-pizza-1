<template>
  <header class="header">
    <div class="header__logo">
      <a href="index.html" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html">{{ pizzaPrice }} ₽</a>
    </div>
    <div class="header__user">
      <a href="/login" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeader",

  props: {
    pizzaPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: $green-500;
  box-shadow: $shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: $white;
    background-color: $green-500;
    background-image: url("~@/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: $white;
  }
}

.header__login {
  ::after {
    margin-left: 8px;
    content: "";
    background-size: auto 50%;
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}

.header__logout {
  ::before {
    content: "";
    background-size: auto 50%;
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}

.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}
</style>
