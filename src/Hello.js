import React, { Component } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import ExpandIcon from './ExpandIcon';
import './Hello.less';

const nestedColumns = [
  {
    key: 'caseId',
    width: 100,
  }, {
    title: 'Item',
    dataIndex: 'products',
    width: 200,
    render: (products = []) => (
      <ul>
        {products.slice(1).map((name, index) => <li key={index}>{name}</li>)}
      </ul>
    )
  }, {
    key: 'address',
    width: 300,
  }
];

const data = [
  {
    caseId: '123',
    products: [
      'constituam et, ad qui discere labores',
      'assentior definiebas',
      'mei cu euismod debitis evertitur',
      'constituam et, ad qui discere labores',
      'assentior definiebas',
      'mei cu euismod debitis evertitur',
      'constituam et, ad qui discere labores',
      'assentior definiebas',
      'mei cu euismod debitis evertitur',
      'constituam et, ad qui discere labores',
      'assentior definiebas',
      'mei cu euismod debitis evertitur',
      'constituam et, ad qui discere labores',
      'assentior definiebas',
      'mei cu euismod debitis evertitur'
    ],
    address: 'New York No. 1 Lake Park'
  }, 
  {
    caseId: '456',
    products: [
      'dissentiunt, sea assentior definiebas'
    ],
    address: 'San Jose N 1st St',
  },
  {
    caseId: '789',
    products: [
      'assentior definiebas',
      'mei cu euismod debitis evertitur'
    ],
    address: 'San Francisco No. 1 Lake Park'
  }, 
];

const NestedTable = ({record}) => (
  <Table 
    className="Hello--nested-table"
    size="middle" 
    bordered={false}
    columns={nestedColumns}
    dataSource={record}
    showHeader={false}
    pagination={false}
  />
);

class Hello extends Component {
  _expandedRowKeys = new Set();

  _columns = [
    {
      title: 'Case',
      dataIndex: 'caseId',
      width: 100,
    }, {
      title: 'Item',
      dataIndex: 'products',
      width: 200,
      render: (products = [], record) => {
        const { caseId } = record;
        const expanded = this._expandedRowKeys.has(caseId);
        const firstProduct = _.head(products);
        const count = products.length;
        return (
          <span>
            {
              count > 1 && 
              <ExpandIcon 
                count={count}
                expanded={expanded} 
                onClick={() => this._onExpandIconClick(caseId)}
              />
            }
            {firstProduct}
          </span>
        );
      }
    }, {
      title: 'Address',
      dataIndex: 'address',
      width: 300,
    }
  ];

  constructor(props) {
    super(props);

    this.state = {
      expandedRowKeys: Array.from(this._expandedRowKeys.values())
    };
  }

  render() {
    return (
      <Table 
        className="Hello"
        pagination={false}
        columns={this._columns} 
        dataSource={data} 
        rowKey="caseId"
        rowClassName={this._getRowClassName}
        expandedRowKeys={this.state.expandedRowKeys}
        onExpand={this._onExpand}
        expandedRowRender={this._expandRowRender}
      />
    );
  }

  _getRowClassName = (record) => {
    return _.get(record, 'products.length', 0) > 1 ? '' : 'Hello--hide-expand';
  };

  _onExpand = (expanded, record) => {
    this._toggleExpandByCaseId(record.caseId);  
  };

  _expandRowRender = (record) => {
    return (
      <NestedTable record={[record]} />
    );
  }

  _onExpandIconClick = (caseId) => {
    this._toggleExpandByCaseId(caseId);
  }

  _toggleExpandByCaseId = (caseId) => {
    this._expandedRowKeys.has(caseId) 
      ? this._expandedRowKeys.delete(caseId)
      : this._expandedRowKeys.add(caseId);

    this.setState({
      expandedRowKeys: Array.from(this._expandedRowKeys.values())
    });
  };
}

export default Hello;