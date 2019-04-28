import moment from 'moment';


const holidays = [
  "270519", "040719", "020919", "141019", "281119", "251219"
]


const getWeek = start => {
  const days = []
  for (let i = 0; i < 5; i++) {
    const day = moment().day(start + i)
    days.push({
      id: day.format('DDMMYY'),
      dow: day.format('dddd'),
      text: day.format('MMMM D'),
      holiday: holidays.indexOf(day.format('DDMMYY')) !== -1
    })
  }
  return days
}


const getStartingWeek = () => (moment().day() < 2) ? "last" : "this"


export { getWeek, getStartingWeek }
