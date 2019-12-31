import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill');
    }
  }

  render() {
    const ReactQuill = this.ReactQuill;
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div>
          {this.props.division === 1 ? (
            <ReactQuill
              theme={'snow'}
              onChange={this.props.handleChange}
              value={this.props.editorHtml}
              modules={Editor.modules}
              formats={Editor.formats}
              bounds={'.app'}
              placeholder={'내용을 입력해주세요'}
            />
          ) : (
            <ReactQuill
              value={this.props.editorHtml}
              theme={'bubble'}
              readOnly={true}
            />
          )}
        </div>
      );
    } else {
      return <span>내용 불러오는중</span>;
    }
  }
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    [{ color: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
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
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'color',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

/*
 * PropType validation
 */
