import React from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';

import ListForm from '../list-form';
import * as listActions from '../../action/list-actions.js';

class Dashboard extends React.Component {
  render() {
    const { lists, listCreate, listDelete } = this.props;
    return (
      <div className='dashboard'>
        <h2>Todo App!</h2>

        <ListForm
          onComplete={listCreate}
          buttonText='create list' />

        {lists.map(list => (
          <div key={list._id}>
            <h3>{list.name}</h3>
            <button onClick={() => listDelete(list)}>x</button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
});
const mapDispatchToProps = (dispatch) => ({
  listCreate: (list) => dispatch(listActions.listCreateRequest(list)),
  listDelete: (list) => dispatch(listActions.listDeleteRequest(list)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
