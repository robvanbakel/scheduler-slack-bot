import parseSchedule from "~/utils/parseSchedule";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ message: string }>(event);

  if (!body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message not provided",
    });
  }

  try {
    const icsContent = parseSchedule(body.message);

    setHeader(event, "content-type", "text/calendar");

    return icsContent.data;
  } catch {
    throw createError({
      statusCode: 422,
      statusMessage: "Invalid message provided",
    });
  }
});
