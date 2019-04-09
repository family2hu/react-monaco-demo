import React, { Component } from 'react';
import DEditor from '../components/DEditor';

import style from './index.less';

export default class TestEditor extends Component {
  componentDidMount() {}
  render() {
    const suggestions = [
      {
        label: '测试1',
        insertText: '测试1', // 不写的时候不展示。。
        detail: '提示的文字'
      },
      {
        label: '测试2',
        insertText: '测试22',
        detail: '提示的文字'
      },
      {
        label: '测试3',
        insertText: '测试3',
        detail: '提示的文字'
      }
    ];
    return (
      <div className={style.wrapper}>
        <div className={style.editor}>
          <DEditor
            key="plaintext"
            height="260"
            lineNumbers="off"
            wordWrap="on"
            defaultValue=""
            mode="plaintext"
            suggestions={suggestions}
            onBlur={value => console.log(value)}
          />
        </div>
      </div>
    );
  }
}
