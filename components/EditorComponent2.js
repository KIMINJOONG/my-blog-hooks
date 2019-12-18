import { useState } from 'react';
const EditorComponent2 = () => {
  const [editorHtml, setEditorHtml] = useState('snow');
  const [theme, setTheme] = useState(null);
  if (typeof window !== 'undefined') {
    this.ReactQuill = require('react-quill');
    console.log(this.ReactQuill);
  }

  const handleChange = html => {
    setEditorHtml({ editorHtml: html });
  };

  const handleThemeChange = newTheme => {
    if (newTheme === 'core') newTheme = null;
    setTheme({ theme: newTheme });
  };

  const ReactQuill = this.ReactQuill;
  if (typeof window !== 'undefined' && ReactQuill) {
    return (
      <div>
        <ReactQuill
          theme={theme}
          onChange={handleChange}
          value={editorHtml}
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
              ],
              ['link', 'image', 'video'],
              ['clean'],
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            },
          }}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'video',
          ]}
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />
        <div className="themeSwitcher">
          <label>Theme </label>
          <select onChange={e => this.handleThemeChange(e.target.value)}>
            <option value="snow">Snow</option>
            <option value="bubble">Bubble</option>
            <option value="core">Core</option>
          </select>
        </div>
      </div>
    );
  } else {
    return <textarea />;
  }
};

export default EditorComponent2;
