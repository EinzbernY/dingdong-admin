/*
 * @Author: 崔国强
 * @Date: 2019-12-04 16:07:36
 * @LastEditTime : 2020-01-04 17:54:25
 * @LastEditors  : Please set LastEditors
 * @Description: 营销控制->首页疯狂抢购->疯狂抢购列表
 * @FilePath: 
 */
import React, { Component } from 'react'
import styles from './BuyIndex.css'
import Link from 'umi/link';
import { Row, Col , Input , Button , Table, Tag , Select, Popconfirm } from 'antd';
const { Option } = Select;
export default class BuyIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:{
        // current: 1,
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSize: 10,
        total: 35
      }
    }
  }
  componentDidMount(){
      console.log(this.props)
  }
  handleDelete = key => {
    console.log(key)
  }
  onChangePage = (pagination) =>{
      console.log(pagination)
  }
    render() {
        const columns = [
            {
              title: '名称',
              dataIndex: 'name',
              key: 'name',
              render: text => <span>{text}</span>,
            },
            {
              title: '图片',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '价格',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: '分类',
              key: 'tags',
              dataIndex: 'tags',
              render: tags => (
                <span>
                  {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </span>
              ),
            },
            {
              title: '操作',
              dataIndex: 'action',
              render: (text, record) =>
                (
                  <div>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)} >
                      <Button type="danger" size='small'>取消</Button>
                    </Popconfirm>
                  </div>
                  
                ),
            },
          ];
          
          const data = [
            {
              key: '1',
              name: '菠菜',
              age: 32,
              address: '神操作',
              tags: ['nice', 'd45'],
            },
            {
              key: '2',
              name: '青菜',
              age: 42,
              address: '晓得了',
              tags: ['蔬菜'],
            },
            {
              key: '3',
              name: '小白菜',
              age: 32,
              address: '还挺小',
              tags: ['cool', 'teacher'],
            },
          ];
        return (
            <div className={styles.ShopIndex}>
                <div className={styles.ShopIndexBox}>
                    <Row style={{marginBottom: '15px'}}>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Input placeholder="请输入商品名称" />
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} offset={1}>
                            {/* <Input placeholder="请输入商品状态" /> */}
                            <Select
                              showSearch
                              style={{ width: '100%' }}
                              placeholder="请选择商品分类"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="tom">全部</Option>
                              <Option value="jack">蔬菜</Option>
                              <Option value="lucy">生鲜</Option>
                            </Select>
                        </Col>
                        {/* <Col xs={24} sm={12} md={8} lg={6} xl={4} offset={1}>
                            <Select
                              showSearch
                              style={{ width: '100%' }}
                              placeholder="请选择商品状态"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="jack">已上架</Option>
                              <Option value="lucy">已下架</Option>
                              <Option value="tom">已删除</Option>
                            </Select>
                        </Col> */}
                        <Col xs={24} sm={12} md={4} lg={4} xl={2} offset={1}>
                            <Button type="primary"  style={{width: '100%'}}>查找</Button>
                        </Col>
                        <Col xs={24} sm={12} md={4} lg={4} xl={2} offset={1}>
                            <Button type="primary" style={{width: '100%'}}>
                                <Link to='/index/marketing/buy/add'>添加</Link> 
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: '15px'}}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table columns={columns} dataSource={data} onChange={this.onChangePage} pagination={this.state.page} />
                        </Col>
                    </Row>    
                </div>
            </div>
        )
    }
}
