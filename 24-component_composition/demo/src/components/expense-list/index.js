import './_expense-list.scss';
import React from 'react';

import ExpenseUpdateForm from '../expense-update-form';

export default (props) => (
  <section className="expense-list">
    <ul>
      {props.expenses.map((expense) => (
        <li key={expense.id}>
          <button onClick={() => props.expenseRemove(expense)}>
            Delete
          </button>
          <button onClick={() => props.expenseUpdate({
            id: expense.id,
            title: expense.title,
            price: expense.price + 1,
          })}>
            +$1
          </button>
          <strong>{expense.title}</strong>
          <em>${expense.price}</em>
          <ExpenseUpdateForm
            expense={expense}
            handleSubmit={props.expenseUpdate}
            />
        </li>
      ))}
    </ul>
  </section>
);
