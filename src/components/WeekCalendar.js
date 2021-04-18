import React from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

const WeekCalendar = () => {
  return(
    <div>
      <div className="Home-Header">
        <span>00's Schedule</span>
      </div>
      <div className="Home-Calendar box">
        <Calendar
          taskView={false}
          height="10px"
          className="Home-Calendar-Week"
        />
      </div>
    </div>
  )
}

export default WeekCalendar;