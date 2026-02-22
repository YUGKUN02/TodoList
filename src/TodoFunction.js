import React from 'react';

const TodoFunction = ({ todo, onUpdate, onDelete, setEditId, setTitle }) => {
  return (
    <div style={{ border: '1px solid #ccc', fontSize: 20, textDecorationLine: todo.check ? 'line-through' : '', margin: '10px 0' }}>
      <span onClick={() => onUpdate(todo.id, !todo.check)}>{todo.title}</span>
      <div>{todo.tag}</div>
      <button onClick={() => { setEditId(todo.id); setTitle(todo.title); }}>수정</button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </div>
  );
};
export default TodoFunction;