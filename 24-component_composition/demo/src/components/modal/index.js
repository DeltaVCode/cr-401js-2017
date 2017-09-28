import './modal.scss';
import React from 'react';

export default (props) => (
  <section className='modal'>
    <button onClick={props.close}>X</button>
    <main>
      {props.children}
    </main>
  </section>
);
