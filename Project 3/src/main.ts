import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EntityNotFoundExceptionFilter } from "./exception-filters/entity-not-found.exception-filter";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  await app.listen(3000);
}

bootstrap();