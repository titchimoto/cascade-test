import React from 'react';
import spinner from '../utils/spinner.gif';

export default () => {
  return (
    <div className="loading-spinner">
      <img src={spinner} alt="Loading..." className="loading-spinner"/>
    </div>
  );
}
