import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', display: 'block', position:'relative',  left:'40%' }}
      alt='Loading...'
    />
  </Fragment>
);