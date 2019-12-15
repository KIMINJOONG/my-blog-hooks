import React, { Component } from 'react';
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight

let toastEditor;
class ToastEditor extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };

    this.saveArticle = this.saveArticle.bind(this);
  }

  componentDidMount() {
    toastEditor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'wysiwyg', // 'markdown'
      previewStyle: 'vertical',
      height: '300px',
      exts: ['colorSyntax'],
    });
  }

  saveArticle() {
    const content = toastEditor.getHtml();
    console.log(content);

    this.setState({
      content,
    });
  }

  render() {
    return (
      <div id="toastEditor">
        <h1>Toast UI Editor Example</h1>
        <div id="editSection"></div>
        <button onClick={this.saveArticle} className="btn_save">
          Save
        </button>
        <div>
          <h2>result</h2>
          <textarea
            className="tf_result"
            value={this.state.content}
            readOnly="readOnly"
          ></textarea>
        </div>
      </div>
    );
  }
}

export default ToastEditor;
