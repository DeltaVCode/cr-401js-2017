import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <header>
    {props.children}
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/about'>About Me</Link></li>
      </ul>
    </nav>
  </header>
);
