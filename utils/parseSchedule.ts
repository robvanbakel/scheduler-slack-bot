import getWeekNumber from "~/utils/getWeekNumber";

const regex = /\w{2} (\d{1,2})-(\d{1,2}): (\d{1,2}:\d{2}) - (\d{1,2}:\d{2})/g;

export default (message: string): { week: number; data: string } => {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0";

  const workDays = [...message.matchAll(regex)];

  workDays.forEach((workDay) => {
    // Destructure regex response
    let [, date, month, start, end] = workDay;

    // Format values
    date = date.padStart(2, "0");
    month = month.padStart(2, "0");
    start = start.replace(":", "").padStart(4, "0");
    end = end.replace(":", "").padStart(4, "0");

    // Open event in .ics content
    icsContent = icsContent.concat("\nBEGIN:VEVENT");

    // Add date and time string to .ics content
    icsContent = icsContent.concat(
      `\nDTSTART:2021${month}${date}T${start}00\nDTEND:2021${month}${date}T${end}00`,
    );

    // Check for starting time and add correct event description to .ics content
    if (parseInt(start.substring(0, 2)) < 12) {
      icsContent = icsContent.concat(`\nSUMMARY:Work: Early shift`);
    } else {
      icsContent = icsContent.concat(`\nSUMMARY:Work: Late shift`);
    }

    // Add location to .ics content
    icsContent = icsContent.concat(
      `\nLOCATION:Stationsplein\\, 5611 AD Eindhoven`,
    );

    // Close event in .ics content
    icsContent = icsContent.concat(`\nEND:VEVENT`);
  });

  icsContent = icsContent.concat("\nEND:VCALENDAR");

  const week = getWeekNumber(
    new Date(`${new Date().getFullYear()}-${workDays[0][2]}-${workDays[0][1]}`),
  );

  return { week, data: icsContent };
};
