const fs = require('fs');
const { v4: uuid } = require('uuid');

const { getWeekNumber } = require('./helpers')

// Define structure of expected input
const regex = /\w{2} (\d{1,2})-(\d{1,2}): (\d{1,2}:\d{2}) - (\d{1,2}:\d{2})/g

const parse = data => {

  // Open string that will be saved as an .ics file
  // and be read by the user's calendar application
  let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0'

  // Match input with previously defined structure
  const workDays = [...data.matchAll(regex)]

  workDays.forEach(workDay => {

    // Destructure regex response
    let [_, date, month, start, end] = workDay

    // Format values
    date = date.padStart(2, '0')
    month = month.padStart(2, '0')
    start = start.replace(':', '').padStart(4, '0')
    end = end.replace(':', '').padStart(4, '0')

    // Open event in .ics content
    icsContent = icsContent.concat('\nBEGIN:VEVENT')

    // Add date and time string to .ics content
    icsContent = icsContent.concat(`\nDTSTART:2021${month}${date}T${start}00\nDTEND:2021${month}${date}T${end}00`)

    // Check for starting time and add correct event description to .ics content
    if (parseInt(start.substring(0, 2)) < 12) {
      icsContent = icsContent.concat(`\nSUMMARY:Work: Early shift`)
    } else {
      icsContent = icsContent.concat(`\nSUMMARY:Work: Late shift`)
    }

    // Add location to .ics content
    icsContent = icsContent.concat(`\nLOCATION:Stationsplein\\, 5611 AD Eindhoven`)

    // Close event in .ics content
    icsContent = icsContent.concat(`\nEND:VEVENT`)

  });

  // Close .ics content string
  icsContent = icsContent.concat('\nEND:VCALENDAR')

  const id = uuid();
  const week = getWeekNumber(new Date(`2021-${workDays[0][2]}-${workDays[0][1]}`))

  // Write .ics file to public folder 
  fs.writeFile(`${__dirname}/public/ics/${id}.ics`, icsContent, () => console.log(`Created: ${id} (week ${week})`))


  return { id, week };

}

module.exports = parse;