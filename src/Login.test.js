import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import { act } from "react-dom/test-utils";
import Login from './components/Login';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders the link with the correct endpoint', () => {
  act(() => {
    render(<Login />, container);
  });
  let url = container.querySelector('a').href;

  expect(url).toContain("/login");
});
