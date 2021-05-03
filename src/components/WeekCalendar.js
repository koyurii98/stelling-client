import React, { useCallback, useContext } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { MODAL_OPEN } from "../reducer/modal";
import { AppContext } from '../context';
// import moment from 'moment';

const WeekCalendar = () => {
  const { user, dispatchModal } = useContext(AppContext);

  const detailSchedule = useCallback((e) => {
    console.log("detailSchedule");
  },[]);

  const createSchedule = useCallback((e)=>{
    dispatchModal({ type: MODAL_OPEN, name:"addSchedule"});
    console.log("createSchedule");
  },[ dispatchModal ]);

  return(
    <div>
      <div className="Home-Header">
        <span>{user.data.name}'s Schedule</span>
      </div>
      <div className="Home-Calendar box">
      <Calendar
        defaultView="month"
        height="900px"
        calendars={[
          {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff'
          },
          // {
          //   id: '1',
          //   name: 'Company',
          //   bgColor: '#00a9ff',
          //   borderColor: '#00a9ff'
          // }
        ]}
        isReadOnly={false}
        timezones={[
          {
            timezoneOffset: 540,
            displayLabel: 'GMT+09:00',
            tooltip: 'Seoul'
          },
        ]}
        month= {{
          visibleWeeksCount: 2  // visible week count in monthly
        }}
        useDetailPopup={false}
        useCreationPopup={false}
        onBeforeCreateSchedule={createSchedule}
        onClickSchedule={detailSchedule}
      />
      </div>
    </div>
  )
}

export default WeekCalendar;