import React, { useCallback, useState } from 'react';

const Privacy = () => {
  const [ edit, setEdit ] = useState(false);
  
  const clickEdit = useCallback(()=>{
    setEdit(!edit);
  },[edit]);

  return(
    <div>
      {/*개인정보처리방침*/}
    </div>

  )
}

export default Privacy;