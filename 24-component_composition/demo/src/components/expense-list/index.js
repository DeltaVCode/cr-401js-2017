import './_expense-list.scss';
import React from 'react';

export default (props) => (
  <section className="expense-list">
    <ul>
      {props.expenses.map((expense) => (
        <li key={expense.id}>
          <button onClick={() => props.expenseRemove(expense)}>
            Delete
          </button>
          <strong>{expense.title}</strong>
          <em>${expense.price}</em>
        </li>
      ))}
    </ul>
  </section>
);
