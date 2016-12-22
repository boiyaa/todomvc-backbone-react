import React from 'react';
import Stats from '../containers/Stats';
import Todo from '../containers/Todo';
import * as keys from '../constants/keys';

const App = (props) => {

  const {todos, value, checked, onNewTodoChange, onNewTodoKeyPressEnter, onToggleAllChange} = props;

  const handleNewTodoChange = (event) => onNewTodoChange(event.target.value);

  const handleNewTodoKeyPress = (event) => {
    if (event.which === keys.ENTER_KEY) {
      onNewTodoKeyPressEnter();
    }
  };

  const handleToggleAllChange = () => onToggleAllChange();

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          value={value}
          onChange={handleNewTodoChange}
          onKeyPress={handleNewTodoKeyPress}
        />
      </header>
      {(() => {
        if (todos.length > 0) {
          return (
            <div>
              <section className="main">
                <input
                  className="toggle-all"
                  id="toggle-all"
                  type="checkbox"
                  checked={checked}
                  onChange={handleToggleAllChange}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                  {todos.map((todo) => <Todo key={todo.cid} model={todo} />)}
                </ul>
              </section>
              <footer className="footer">
                <Stats todos={todos} />
              </footer>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default App;
