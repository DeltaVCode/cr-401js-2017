import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action/card-actions';

import CardForm from '../card-form';

const CardItem = ({ card, cardUpdate, cardDelete }) => (
  <li className='card-item'>
    <p>{card.title}</p>
    <button onClick={() => cardDelete(card)}>Delete</button>
    <CardForm
      card={card}
      buttonText='Update Card'
      onSave={cardUpdate} />
  </li>
);

let mapStateToProps = () => ({});
let mapDispatchToProps = (dispatch) => ({
  cardUpdate: card => dispatch(actions.cardUpdate(card)),
  cardDelete: card => dispatch(actions.cardDelete(card)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
