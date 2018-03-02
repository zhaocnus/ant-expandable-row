import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import 'antd/dist/antd.css';

const App = () => <Hello />;

render(<App />, document.getElementById('root'));
