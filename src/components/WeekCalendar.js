import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { MODAL_OPEN } from "../reducer/modal";
import { AppContext } from '../context';
import { requestGet } from '../utils/requestHelper';
import { SERVER_URL } from '../env_config';
import { SCHEDULE_INIT } from '../reducer/schedule';
import moment from 'moment';

const WeekCalendar = () => {
  const { user, dispatchModal, dispatchSchedule, openAlert, schedule } = useContext(AppContext);

  const initSchedule = useCallback( async () => {
    try {
      const { res, err } = await requestGet(`${SERVER_URL}schedule`, {}, null, user.token);

      if(err) {
        throw new Error(err);
      }

      if(res?.result) {
        dispatchSchedule({ type: SCHEDULE_INIT, payload: res.data });
      }
    } catch(err) {
      openAlert(err.message);
    }
  }, [dispatchSchedule, openAlert]);

  useEffect(() => {
    initSchedule();
  }, [initSchedule]);

  const parseSchedule = useMemo(() => {
    return schedule.data.map(data => {
      return {
        ...data,
        body: data.content,
        calendarId: "99",
        category: "time",
        bgColor: "yellow",
        start: moment(`${data.day} ${data.start}`).format("YYYY-MM-DD HH:mm"),
        end: moment(`${data.day} ${data.end}`).format("YYYY-MM-DD HH:mm"),
      }
    });
  }, [schedule]);

  const detailSchedule = useCallback((e) => {
    const date = {
      title: e.schedule.title,
      content: e.schedule.body,
      day: e.schedule.start._date,
      start: e.schedule.start._date,
      end: e.schedule.end._date,
    };

    dispatchModal({ type: MODAL_OPEN, name:"addSchedule", edit: true, options: { ...date }});
  }, []);

  const createSchedule = useCallback((e)=>{
    if(!e?.start?._date || !e?.end?._date) {
      return window.alert("날짜가 선택되지 않았습니다."); 
    }

    const date = {
      title: "",
      content: "",
      start: e.start._date,
      end: e.end._date,
      day: e.start._date
    };

    dispatchModal({ type: MODAL_OPEN, name:"addSchedule", edit: false, options: { ...date }});
  }, [dispatchModal]);

  return(
    <div>
      <div className="Home-Header">
        <span>{user.data.name}'s Schedule</span>
      </div>
      <div className="Home-Calendar box">
      <Calendar
        height="28.4vw"
        calendars={[
          {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff'
          },
        ]}
        isReadOnly={false}
        timezones={[
          {
            timezoneOffset: 540,
            displayLabel: 'GMT+09:00',
            tooltip: 'Seoul'
          },
        ]}
        schedules={parseSchedule}
        taskView={false}
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