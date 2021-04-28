import React, { useContext } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import { AppContext } from '../context';
import moment from 'moment';

const WeekCalendar = () => {
  const { user } = useContext(AppContext);
  return(
    <div>
      <div className="Home-Header">
        <span>{user.data.name}'s Schedule</span>
      </div>
      <div className="Home-Calendar box">
      <Calendar
        height="900px"
        disableClick={false}
        isReadOnly={false}
        month={{
          startDayOfWeek: 0
        }}
        scheduleView
        useDetailPopup
        useCreationPopup
        taskView={false}
      />
        {/* <Calendar
          taskView={false}
          defaultView='week'
          scheduleView={['time']}
          week={{
            daynames: ['일','월', '화', '수', '목', '금', '토'],
            startDayOfWeek: 0,
            narrowWeekend: true
          }}
          className="Home-Calendar-Calendar"/> */}
      </div>
    </div>
  )
}

export default WeekCalendar;