import moment from 'moment';

const getWeek = start => {
  const days = []
  for (let i = 0; i < 5; i++) {
    const day = moment().day(start + i)
    days.push({
      id: day.format('DDMMYY'),
      dow: day.format('dddd'),
      text: day.format('MMMM D'),
      holiday: false
    })
  }
  return days
}


const getStartingWeek = () => (moment().day() < 2) ? "last" : "this"


export { getWeek, getStartingWeek }
