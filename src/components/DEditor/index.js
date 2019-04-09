/* eslint-disable */
import React from 'react';
import propTypes from 'prop-types';
import MonacoEditor from './MonacoEditor';
import styles from './index.less';

class DEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.defaultValue
    };
  }
  onChange = (value, event, editor) => {
    this.setState({
      code: value
    });
  };
  onBlur = () => {
    this.props.onBlur(this.state.code);
  };

  editorDidMount = (editor, monaco) => {
    const { suggestions } = this.props;
    if (suggestions.length) {
      // 写提示语
      monaco.languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems() {
          return {
            suggestions: suggestions.map(item => ({...item, kind: monaco.languages.CompletionItemKind.Variable}))
          };
        },
        triggerCharacters: [':']
      });
    }

    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 300);
  };

  render() {
    const {
      prefixCls,
      defaultValue,
      mode,
      height,
      lineNumbers,
      wordWrap,
      ...args
    } = this.props;
    const options = {
      ...args,
      // lineNumbers: 'on',
      selectOnLineNumbers: false,
      scrollBeyondLastLine: false,
      formatOnPaste: true,
      contextmenu: false, // 禁止右键
      fixedOverflowWidgets: true, // 超出编辑器大小的使用fixed属性显示
      quickSuggestions: false, // 默认的提示关掉
      minimap: {
        // 缩略图
        enabled: false
      },
      scrollbar: {
        // 滚动条
        horizontalScrollbarSize: 6,
        verticalScrollbarSize: 6
      },
      lineNumbersMinChars: 3, // 最少显示3位长的行号
      lineNumbers, // 是否显示行号
      wordWrap // 是否可以换行
    };
    return (
      <div className={styles[`${prefixCls}`]} onBlur={this.onBlur}>
        <MonacoEditor
          height={height}
          language={mode}
          theme="vs-dark"
          defaultValue={defaultValue}
          options={options}
          onChange={this.onChange}
          lineNumbers={lineNumbers}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}
DEditor.propTypes = {
  prefixCls: propTypes.string,
  defaultValue: propTypes.string,
  mode: propTypes.string,
  lineNumbers: propTypes.string,
  onBlur: propTypes.func,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  wordWrap: propTypes.string,
  suggestions: propTypes.arrayOf(propTypes.any)
};

DEditor.defaultProps = {
  prefixCls: 'd-editor',
  lineNumbers: 'on',
  defaultValue: '',
  mode: 'json',
  onBlur: () => {},
  height: '100%',
  wordWrap: 'off',
  suggestions: []
};
export default DEditor;
