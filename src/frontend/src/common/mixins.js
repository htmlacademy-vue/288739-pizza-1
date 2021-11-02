const logout = {
  methods: {
    async $logout() {
      await this.$store.dispatch("Auth/logout");
      await this.$router.push("/login");
      this.$notifier.success("Вы успешно вышли из аккаунта");
    },
  },
};

export { logout };
