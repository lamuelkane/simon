import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingBox = () => {
    return (
        <div className={`w-100 flex align-center justify-center`}>
              <CircularProgress />
        </div>
    )
}

export default LoadingBox  
