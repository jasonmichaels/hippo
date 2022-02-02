import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { mockPostA, mockPostB } from '../dummyData';
import ListHeaderComponent from '../components/ListHeaderComponent';

jest.mock('react', () => {
  const React = jest.requireActual('react');
  return {
    ...React,
    useContext: () => ({
      posts: { [mockPostA.id]: mockPostA, [mockPostB.id]: mockPostB },
    }),
  };
});

const props = {
  navigation: {
    setParams: jest.fn(),
  },
  authorId: '',
};

describe('ListHeaderComponent', () => {
  test('renders a list of unique authors', async () => {
    const { getByTestId } = render(<ListHeaderComponent {...props} />);
    const childText = getByTestId('PickerText');

    fireEvent(childText, 'onPressIn');

    const modal = getByTestId('PickerModal');

    // includes placeholder option
    expect(modal.props.children.length).toEqual(3);
  });

  test('authorId value change results in child Selects textInput value to reflect as much', async () => {
    const { getByTestId, rerender } = render(
      <ListHeaderComponent {...props} />
    );
    const textInput = getByTestId('PickerText');

    // empty authorId value
    expect(textInput.props.value).toEqual('Select an Author');
    // update with actual authorId
    rerender(
      <ListHeaderComponent
        authorId={mockPostA.author.id}
        navigation={props.navigation}
      />
    );
    // authorId successfully set
    expect(textInput.props.value).toEqual('Clear Selected Author');
  });

  /**
   * @TODOs
   *  - Not sure how granular we want to go here, but we could test things like
   *    text color, render a more realistic tree and confirm fired events on the Select
   *    component result in the Posts list updating, etc.
   *  - Not as deep as I'd prefer for unit tests (higher in the tree, definitely testing
   *    too much), and it seems more like I'm writing end-to-end tests...hmmm...
   */
});
