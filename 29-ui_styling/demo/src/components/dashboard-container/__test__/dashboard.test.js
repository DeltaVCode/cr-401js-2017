import React from 'react';
import { shallow } from 'enzyme';

import { DashboardContainer } from '../';
import CategoryForm from '../../category-form';

const categoryCreate = jest.fn();

test('should have h2', () => {
  expect(shallow(<DashboardContainer categories={[]} categoryCreate={categoryCreate} />).contains(<h2>Dashboard</h2>)).toBe(true);
});

test('should have CategoryForm', () => {
  expect(shallow(<DashboardContainer categories={[]} categoryCreate={categoryCreate} />)
    .contains(<CategoryForm buttonText='Add Category' saveCategory={categoryCreate} />)).toBe(true);
});
