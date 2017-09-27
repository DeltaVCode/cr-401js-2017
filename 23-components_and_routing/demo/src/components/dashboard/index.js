require('./dashboard.scss');
import React from 'react';
import uuid from 'uuid/v4';

import ExpenseCreateForm from '../expense-create-form';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.expenseCreate = this.expenseCreate.bind(this);
  }

  expenseCreate(expense) {
    expense.id = uuid();
    this.props.app.setState(state => ({
      expenses: [...state.expenses, expense],
    }));
  }

  render() {
    return (
      <div className='dashboard-container'>
        <h1>Dashboard</h1>
        <ExpenseCreateForm id='form1'
          handleExpenseCreate={this.expenseCreate}
          />
        <ExpenseCreateForm id='form2'
          handleExpenseCreate={this.expenseCreate}
          />
      </div>
    )
  }
}

export default Dashboard;
