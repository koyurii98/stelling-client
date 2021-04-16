import React, { useCallback, useState } from 'react';

const LoadMask = () => {
  return(
    <div className="spinner-box">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
  )
}

export default LoadMask;