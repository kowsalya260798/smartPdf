import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight,darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SmartCodeDisplay = ({ type,data }) => {
  //const jsonString = JSON.stringify(data, null, 2);
  return (
    <SyntaxHighlighter language={type} style={darcula}>
      {data}
    </SyntaxHighlighter>
  );
};

export default SmartCodeDisplay;