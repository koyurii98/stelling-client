import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import Calendar from '@toast-ui/react-calendar';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { MODAL_OPEN } from "../reducer/modal";
import { AppContext } from '../context';
import { requestGet, requestPut } from '../utils/requestHelper';
import { SERVER_URL } from '../env_config';
import { SCHEDULE_INIT, SCHEDULE_UPDATE } from '../reducer/schedule';
import moment from 'moment';

const WeekCalendar = () => {
  const { user, dispatchModal, dispatchSchedule, dispatchLoadMask, openAlert, schedule, closeModal } = useContext(AppContext);
  const calendarRef = React.createRef();
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
  }, [dispatchSchedule, openAlert, user]);

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
        bgColor: data.color,
        color:"white",
        borderColor:data.color,
        dragBgColor:data.color,
        start: moment(`${data.day} ${data.start}`).format("YYYY-MM-DD HH:mm"),
        end: moment(`${data.day} ${data.end}`).format("YYYY-MM-DD HH:mm"),
      }
    });
  }, [schedule]);

  const detailSchedule = useCallback((e) => {
    const date = {
      id:e.schedule.id,
      title: e.schedule.title,
      content: e.schedule.body,
      color:e.schedule.bgColor,
      day: e.schedule.start._date,
      start: e.schedule.start._date,
      end: e.schedule.end._date,
    };
    
    dispatchModal({ type: MODAL_OPEN, name:"addSchedule", edit: true, options: { ...date }});
  }, [dispatchModal]);

  const createSchedule = useCallback((e)=>{
    if(!e?.start?._date || !e?.end?._date) {
      return window.alert("????????? ???????????? ???????????????."); 
    }

    const date = {
      title: "",
      content: "",
      color:"#46ce69",
      start: e.start._date,
      end: e.end._date,
      day: e.start._date
    };

    dispatchModal({ type: MODAL_OPEN, name:"addSchedule", edit: false, options: { ...date }});
  }, [dispatchModal]);

  const moveUpdateSchedule = useCallback(async(e) => {
    const changeDate = {
      id:e.schedule.id,
      title:e.schedule.title,
      color:e.schedule.bgColor,
      day:moment(e.changes.start?e.changes.start._date:e.start._date).format("YYYY-MM-DD"),
      start:moment(e.changes.start?e.changes.start._date:e.start._date).format("HH:mm"),
      end:moment(e.changes.end._date).format("HH:mm")
    }
    try {
			const { res, err } = await requestPut(`${SERVER_URL}schedule`, { ...changeDate }, null , user.token)
		
			if(err) {
				throw new Error(err);
			}
			if(res?.result) {
				dispatchSchedule({ type: SCHEDULE_UPDATE, payload: { ...res.data } });
			}
		} catch(err) {
			openAlert(err.message);
		} finally {
			closeModal();
		}
  },[dispatchSchedule, openAlert, closeModal, dispatchLoadMask, user]);

  const clickPrev = useCallback(()=>{
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.prev();
  },[calendarRef]);

  const clickThisWeek = useCallback(()=>{
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.today();
  },[calendarRef]);

  const clickNext = useCallback(()=>{
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.next();
  },[calendarRef]);

  return(
    <div>
      <div className="Home-Header">
        <span>{user.data.name}'s Schedule</span>
        <div className="Home-Header-box">
          
          <div className="Home-Header-btn previewBtn" onClick={clickPrev}><ArrowBackIosIcon style={{ fontSize: "1.1vw"}}/></div>
          <div className="Home-Header-btn nowBtn" onClick={clickThisWeek}>????????? </div>
          <div className="Home-Header-btn nextBtn" onClick={clickNext}><ArrowForwardIosIcon style={{ fontSize: "1.1vw"}}/></div>
        </div>
      </div>
      <div className="Home-Calendar box">
      <Calendar
        ref={calendarRef}
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
        onBeforeUpdateSchedule={moveUpdateSchedule}
        onClickSchedule={detailSchedule}
      />
      </div>
    </div>
  )
}

export default WeekCalendar;