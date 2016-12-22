import React from 'react';

const Stats = (props) => {

  const {completed, remaining, filter, onClearCompletedClick} = props;

  const handleClearCompletedClick = () => onClearCompletedClick();

  const classNameAll = !filter ? 'selected' : '';
  const classNameActive = filter === 'active' ? 'selected' : '';
  const classNameCompleted = filter === 'completed' ? 'selected' : '';

  return (
    <div>
      <span className="todo-count">
        <strong>{remaining}</strong> {remaining === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        <li><a className={classNameAll} href="#/">All</a></li>
        <li><a className={classNameActive} href="#/active">Active</a></li>
        <li><a className={classNameCompleted} href="#/completed">Completed</a></li>
      </ul>
      {(() => {
        if (completed) {
          return (
            <button
              className="clear-completed"
              onClick={handleClearCompletedClick}
            >
              Clear completed
            </button>
          );
        }
      })()}
    </div>
  );
}

export default Stats;
