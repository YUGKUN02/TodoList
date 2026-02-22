import React from 'react';

const TagFunction = ({ selectedTags, handleTagClick }) => {
  const tags = [' Python ', ' React ', ' Java ', ' Unreal Engine '];
  return (
    <div>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          style={{ backgroundColor: selectedTags.includes(tag) ? 'skyblue' : 'white' }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
export default TagFunction;