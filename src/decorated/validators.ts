class Validators {
  @ax.validator()
  validateName({ ctx, name }) {
    ctx.validator.validate({ name })
  }
}
