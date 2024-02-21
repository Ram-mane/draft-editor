import React from 'react';
import './MyEditor.css';

const MyEditor = () => {
  const [text, setText] = React.useState('');
  const [heading, setHeading] = React.useState('');

  let newText = '';
  const headingText = (text) => {
        if (text.charAt(0) === '#') {
             newText = text.substring(1, text.length);
            setHeading(`<h1>${newText}</h1>`);
        } else if (text.charAt(0) === '*' && text.charAt(1) !== '*'){
            // Add a valid expression here
             newText = text.substring(1, text.length);
             setHeading(`<b>${newText}</b>`);
        } else if (text.substring(0,2) === '**' && text.charAt(2) !== '*'){
            newText = text.substring(2, text.length);
            setHeading(`<div style="color: red;">${newText}</div>`);
        } else if (text.substring(0,3) === '***'){
            newText = text.substring(3, text.length);
            setHeading(`<u>${newText}</u>`);
        }
    };

  const handleChange = (e) => {
    const newTextValue = e.target.value;
    setText(newTextValue);
    headingText(newTextValue);
  };

  const handleSave = () => {
    const container = document.createElement('div');
    container.innerHTML = heading;
  
    // Save the HTML content as a string
    const htmlContent = container.innerHTML;
  
    localStorage.setItem('heading', htmlContent);
    console.log('Saved heading:', heading);
    setText('');
  };

  const data = localStorage.getItem('heading');
  console.log('data', data);

  return (
    <div className='myEditor'>
      <textarea
        value={text}
        rows={10}
        onChange={(e) => handleChange(e)}
      />
        <button
        onClick={handleSave}>Save</button>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default MyEditor;
