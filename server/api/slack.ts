import { randomUUID } from "crypto";
import parseSchedule from "~/utils/parseSchedule";
import redis from "~/server/redis";

type SlackBody = {
  payload: {
    response_url: string;
    message: {
      text: string;
    };
  };
};

export default defineEventHandler(async (event) => {
  const { payload } = await readBody<SlackBody>(event);

  const { data, week } = parseSchedule(payload.message.text);

  const id = randomUUID();

  await redis.set(id, data, { ex: 7 * 24 * 60 * 60 });

  return $fetch(payload.response_url, {
    method: "POST",
    body: {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Your schedule for *week ${week}* is ready for download!`,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "View in Calendar",
              },
              value: "get_calendar",
              url: `https://avsr.nl/api/ics/${id}`,
              action_id: "actionId-0",
            },
          ],
        },
        {
          type: "context",
          elements: [
            {
              type: "plain_text",
              text: "This link will expire in 7 days",
            },
          ],
        },
      ],
    },
  });
});
