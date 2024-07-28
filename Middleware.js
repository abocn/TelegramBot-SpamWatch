module.exports = (isOnSpamWatch) => {
  return async (ctx, next) => {
    if (await isOnSpamWatch(ctx.from.id)) {
      console.log(`User ${ctx.from.id} is banned on SpamWatch. Blocking command.`);
      return;
    }
    await next();
  };
};