require('./dashboard.scss');
import React from 'react';
import uuid from 'uuid/v4';

import ExpenseCreateForm from '../expense-create-form';
import ExpenseList from '../expense-list';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.expenseCreate = this.expenseCreate.bind(this);
    this.expenseRemove = this.expenseRemove.bind(this);
    this.expenseUpdate = this.expenseUpdate.bind(this);
  }

  expenseCreate(expense) {
    expense.id = uuid();
    this.props.app.setState(state => ({
      expenses: [...state.expenses, expense],
    }));
  }

  expenseUpdate(expense) {
    let { app } = this.props;
    app.setState(state => ({
      expenses: state.expenses.map(item => {
        return item.id === expense.id ? expense : item;
      }),
    }));
  }
  expenseRemove(expense) {
    let { app } = this.props;
    app.setState(state => ({
      expenses: state.expenses.filter(item => {
        return item.id !== expense.id;
      }),
    }));
  }

  render() {
    const { app } = this.props;

    let totalSpent = app.state.expenses.reduce(
      (p, exp) => p + exp.price, 0);
    let remainingBudget = app.state.budget - totalSpent;
    console.log({totalSpent, remainingBudget})

    return (
      <div className='dashboard-container'>
        <h2>Dashboard</h2>
        <dl>
          <dt>Total Budget:</dt>
          <dd>${app.state.budget}</dd>
          <dt>Total Spent:</dt>
          <dd>${totalSpent}</dd>
          <dt>Remaining Budget:</dt>
          <dd>${remainingBudget}</dd>
        </dl>

        <ExpenseCreateForm id='form1'
          handleExpenseCreate={this.expenseCreate}
          />

        <ExpenseList
          expenseUpdate={this.expenseUpdate}
          expenseRemove={this.expenseRemove}
          expenses={app.state.expenses} />
      </div>
    )
  }
}

export default Dashboard;
