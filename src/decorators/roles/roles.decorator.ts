import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const Roles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const roles = Reflect.getMetadata('roles', ctx.getClass());
    return roles;
  },
);
