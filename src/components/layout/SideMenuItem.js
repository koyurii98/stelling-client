import React from 'react';

const SideMenuItem = (props) => {
  const { data } = props;
  return(
    <div className="sideMenuItem">
      <span>{ data.name }</span>
    </div>
  )
}

export default SideMenuItem;