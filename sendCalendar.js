const axios = require('axios');

// Construct message via Slack's Blocks structure
const sendCalendar = (response_url, id, week) => {
  axios.post(response_url, {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Your schedule for *week ${week}* is ready for download!`
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "View in Calendar"
            },
            "value": "get_calendar",
            "url": `https://avsr.nl/get/${id}`,
            "action_id": "actionId-0"
          }
        ]
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "plain_text",
            "text": "This link will expire in 7 days"
          }
        ]
      }
    ],
  });
}

module.exports = sendCalendar;