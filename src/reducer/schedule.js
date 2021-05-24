export const SCHEDULE_INIT = 'SCHEDULE_INIT';
export const SCHEDULE_ADD = 'SCHEDULE_ADD';
export const SCHEDULE_UPDATE = 'SCHEDULE_UPDATE';
export const SCHEDULE_DELETE = 'SCHEDULE_DELETE';

export const initialSchedule = {
  data: []
};

export const ScheduleReducer = (state = initialSchedule, action) =>{
  switch (action.type) {
    case SCHEDULE_INIT:
      return {
        ...state,
        data: action.payload
      };
    case SCHEDULE_ADD:
      return {
        ...state,
        data: state.data.concat({ ...action.payload })
      };
    case SCHEDULE_UPDATE:
      return {
        ...state,
        data: state.data.map(value => {
          if(action.payload.id) {
            return {
              ...action.payload
            };
          }

          return {
            ...value
          };
        })
      };
    case SCHEDULE_DELETE:
      return {
        ...state,
        data: state.data.filter(value => value.id !== action.payload.id)
      };
    default:
      return state;
  }
}