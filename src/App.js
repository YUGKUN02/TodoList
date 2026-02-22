import React, { useState, useRef } from 'react';
import { chatHistory } from './openai';

import ChatGPT from './ChatGPT';
import TagFunction from './TagFunction';
import TodoList from './TodoList';

export default function App() {
  const [weeklytodos, setWeeklyTodos] = useState([]);
  const [dailytodos, setDailyTodos] = useState([]);
  const [title, setTitle] = useState('');
  const refTitle = useRef(null);
  const [editId, setEditId] = useState(null);

  const [selected, setSelected] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);

  const onWeeklyAdd = (text) => {
    const id = weeklytodos.length === 0 ? 1 : weeklytodos[weeklytodos.length - 1].id + 1;
    setWeeklyTodos([...weeklytodos, { id, title: text, check: false, tag: selectedTags }]);
    setTitle('');
    setSelectedTags([]); 
  };
  const onDailyAdd = (text) => {
    const id = dailytodos.length === 0 ? 1 : dailytodos[dailytodos.length - 1].id + 1;
    setDailyTodos([...dailytodos, { id, title: text, check: false, tag: selectedTags }]);
    setTitle('');
    setSelectedTags([]); 
  };

  const onDelete = (id) => {
    if (selected === '주간계획') {
      setWeeklyTodos(weeklytodos.filter((todo) => todo.id !== id));
    } else if (selected === '일간계획') {
      setDailyTodos(dailytodos.filter((todo) => todo.id !== id));
    }
  };

  const onUpdate = (id, check) => {
    if (selected === '주간계획') {
      setWeeklyTodos(
        weeklytodos.map((todo) => {
          if (todo.id === id) return { ...todo, check };
          return todo;
        })
      );
    } else if (selected === '일간계획') {
      setDailyTodos(
        dailytodos.map((todo) => {
          if (todo.id === id) return { ...todo, check };
          return todo;
        })
      );
    }
  };

  const onEdit = (id, editTitle) => {
    if (selected === '주간계획') {
      setWeeklyTodos(
        weeklytodos.map((todo) => {
          if (todo.id === id) return { ...todo, title: editTitle };
          return todo;
        })
      );
    } else if (selected === '일간계획') {
      setDailyTodos(
        dailytodos.map((todo) => {
          if (todo.id === id) return { ...todo, title: editTitle };
          return todo;
        })
      );
    }
    setEditId(null);  
    setTitle(''); 
  };
  const weeklyremain = weeklytodos.filter((todo) => !todo.check).length;
  const dailyremain = dailytodos.filter((todo) => !todo.check).length;

  const knowledge = 'https://career.nexon.com/user/recruit/member/postDetail?joinCorp=NX&reNo=20240111&currentPage=0'
  const initial = [
    { role: 'user', content: knowledge },
    { role: 'assistant', content: '네. 내용을 충분히 이해했습니다.' },
  ];

  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState(initial);
  const refChatText = useRef();

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const sendChat = () => {
    const prompt = chatText;
    setChatText('');
    if (refChatText.current) {
      refChatText.current.focus();
    }
    setMessages((messages) => [...messages, { role: 'user', content: prompt }]);
    chatHistory(prompt, messages, (result) => {
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: result },
      ]);
    });
  };

  const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      if (selected === '주간계획') {
        if (editId !== null) {
          onEdit(editId, title); 
        } else {
          onWeeklyAdd(title); 
        }
        setTitle(''); 
      }
      else if(selected === '일간계획'){
        if (editId !== null) {
          onEdit(editId, title); 
        } else {
          onDailyAdd(title); 
        }
        setTitle(''); 
      }
      else if (selected === '챗GPT') {
        sendChat(); 
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (selected === '주간계획' || selected === '일간계획') {
      setTitle(value);
    } else if (selected === '챗GPT') {
      setChatText(value);
    }
  };


  const getValue = () => {
    if (selected === '주간계획' || selected === '일간계획') {
      return title;
    } else if (selected === '챗GPT') {
      return chatText;
    }
  };

  const getRef = () => {
    if (selected === '주간계획' || selected === '일간계획') {
      return refTitle;
    } else if (selected === '챗GPT') {
      return refChatText;
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prevState =>
      prevState.includes(tag)
        ? prevState.filter(t => t !== tag)
        : [...prevState, tag]
    );
  };

  return (
    <div>
      <TagFunction 
      selectedTags={selectedTags} 
      handleTagClick={handleTagClick} 
      />
      <input
        type="text"
        style={{ fontSize: 20, borderColor: 'red', borderWidth: 2 }}
        ref={getRef()}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={getValue()}
      />
      <select value={selected} onChange={handleSelect}>
        <option value="주간계획">주간계획</option>
        <option value="일간계획">일간계획</option>
        <option value="챗GPT">챗GPT</option>
      </select>

      <h2>주간계획</h2>
      {selected === '주간계획' && (
        <TodoList
          todos={weeklytodos}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
          setEditId={setEditId}
          setTitle={setTitle}
        />
      )}

      <h2>일간계획</h2>
      {selected === '일간계획' && (
        <TodoList
          todos={dailytodos}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
          setEditId={setEditId}
          setTitle={setTitle}
        />
      )}
        <span style={{ fontSize: 20, color: 'blue' }}>
          주간계획 남은 일: {weeklyremain}개/{weeklytodos.length}개
        <br/>
          일간계획 남은 일: {dailyremain}개/{dailytodos.length}개
        </span>
      
      <h2>챗GPT</h2>
      {selected === '챗GPT' && 
      <ChatGPT
       messages={messages} 
       />}
    </div>
  );
}
