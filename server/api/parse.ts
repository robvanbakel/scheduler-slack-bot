import parseSchedule from "~/utils/parseSchedule";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ message: string }>(event);

  if (!body.message) {
    throw createError({
      statusCode: 422,
      statusMessage: "Message not provided",
    });
  }

  const icsContent = parseSchedule(body.message);

  setHeader(event, "content-type", "text/calendar");

  return icsContent.data;
});
