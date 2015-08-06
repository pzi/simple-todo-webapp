// Manually load ES5 Compat.
import 'es5-shim/es5-shim';
import 'es5-shim/es5-sham';

import React from 'react';
import TodoApp from 'components/TodoApp';

React.render(
  <TodoApp />,
  document.getElementById('todo-app')
);
