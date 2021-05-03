import React from 'react';
import Memo from './../components/Memo';
import WeekCalendar from './../components/WeekCalendar';
import TodoList from './../components/TodoList';

const Home = () => {
  return(
    <div className="Home-Layout">
      <div className="Home-Layout-row">
        <WeekCalendar/>
        <TodoList/>
      </div>
      <Memo/>
    </div>
  )
}

export default Home;