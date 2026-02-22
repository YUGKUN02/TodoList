import React from 'react';
import TodoFunction from './TodoFunction';

const TodoList = ({ todos, onUpdate, onDelete, onEdit, setEditId, setTitle }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoFunction
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit} 
          setEditId={setEditId}
          setTitle={setTitle}
        />
      ))}
    </div>
  );
};
export default TodoList;