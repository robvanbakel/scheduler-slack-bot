import redis from "~/server/redis";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 422,
      statusMessage: "ID not provided",
    });
  }

  const data = await redis.get<string>(id);

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Schedule not found",
    });
  }

  setHeader(event, "content-type", "text/calendar");

  return data;
});
