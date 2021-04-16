import React, { useCallback, useState } from 'react';

const Alert = props => {
  const { message } = props;

  return(
    <div>
      {message}
    </div>

  )
}

export default Alert;