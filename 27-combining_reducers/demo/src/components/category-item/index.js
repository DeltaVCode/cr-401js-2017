import * as React from 'react';
import { connect } from 'react-redux';

import CategoryForm from '../category-form';
import * as actions from '../../action/category-actions';

const CategoryItem = ({ category, categoryUpdate, categoryDelete }) => (
  <section className='category-item'>
    <div>
      <div className='content'>
        <h3>{category.title}</h3>
        <button onClick={() => categoryDelete(category)}>Delete</button>
      </div>
      <div className='editing'>
        <CategoryForm
          buttonText='Update'
          category={category}
          saveCategory={categoryUpdate} />
      </div>
    </div>
  </section>
)

let mapStateToProps = () => ({});
let mapDispatchToProps = dispatch => ({
  categoryUpdate: category => dispatch(actions.categoryUpdate(category)),
  categoryDelete: category => dispatch(actions.categoryRemove(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
