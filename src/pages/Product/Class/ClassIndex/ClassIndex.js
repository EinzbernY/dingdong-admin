/*
 * @Author: 崔国强
 * @Date: 2019-12-05 09:53:21
 * @LastEditTime : 2020-01-09 17:25:38
 * @LastEditors  : Please set LastEditors
 * @Description: 产品管理->分类管理->分类展示
 * @FilePath: \umi-admin\src\pages\Product\Class\ClassIndex\ClassIndex.js
 */
import React, { Component } from 'react'
import moment from 'moment'
import router from 'umi/router';
import styles from './ClassIndex.css'
import Link from 'umi/link';
import { Row, Col , Input , Button , Table, Divider, Popconfirm , Switch } from 'antd';


export default class ClassIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:{
        current: 1,  //当前页
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSize: 10,  //每页条数
        total: 35   //总条数
      },
      message: "",  //搜索关键词
      dataList : []  //表格数组
    } 
  }
  // 删除
  handleDelete = key => {
    let This = this
    this.$https.get('index/removeSort',{
      params:{
        id: key
      }
    })
    .then(res=>{
      if(res.code === 0){
        let dataList = This.state.dataList
            dataList.forEach((item,index)=>{
              if(item.id === key){
                dataList.splice(index,1)
              }
            })
            This.setState({
              dataList
            })
      }
    })
  }
  // 编辑
  handleEdit = key =>{
    router.push({
      pathname: '/index/product/class/add',
      query: {
        id: key,
      },
    });
  }
  // 切换分页
  onChangePage = (pagination, filters, sorter) =>{  
      let page = this.state.page
        page.current = pagination.current
      this.setState({
        page
      })
      this.info()
  }

  // 绑定 分类输入框
  messageChange = (e) =>{   //
    this.setState({
      message: e.target.value
    })
  }
  // 生命周期
  componentDidMount(){
    // this.info(this.state.page.current,this.state.page.pageSize,this.state.message)
    this.info()
  }
  // 初始化方法
  info=()=>{
    let This = this
    this.$https.get('nottoken/getSort',{
      params:{
        current:this.state.page.current,
        pageSize: this.state.page.pageSize,
        msg: this.state.message
      }
    })
    .then(res=>{
      let page = this.state.page
          page.total = res.data.total
        This.setState({
          page,
          dataList: res.data.list.map( item=>{
            item.image = JSON.parse(item.image)
            item.shows = item.shows === 1 ? true : false
            item.one_sort = Boolean(item.one_sort)
            item.key = item.id
            return item;
          })
        })
    })
  }
  // 查找
  searche = () =>{
    let page = this.state.page
        page.current = 1
    this.setState({
      page
    })
    // this.info(this.state.page.current,this.state.page.pageSize,this.state.message)
    this.info()
  }
  // 是否上线 开关
  onChangeSwitch = (check,indexs,types) =>{
    let dataList = this.state.dataList
    let This = this
    this.$https.post('index/updataSortShows',{
      shows: !check,
      id: indexs,
      types
    })
    .then(res=>{
      This.setState({
        dataList: dataList.map((item,index)=>{
          if(item.id === indexs){
            item.shows = !check
          }
          return item;
        })
      })
    })
  }
    render() {
        const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              key: 'name',
              render: text => <span>{text}</span>,
            },
            {
              title: '分类图片',
              dataIndex: 'image',
              key: 'image',
              render: image => (
                <div key='1'>
                  {image.map((item,index)=> <img key={index} style={{width: '50px'}} alt={index} src={item.url} />)}
                </div>
              )
              // render: text => <img style={{width: '50px'}} alt='' src={text[0].url} />,
            },
            {
              title: '是否上架',
              dataIndex: 'shows',
              key: 'shows',
              render: (shows,record) => (
                <Switch defaultChecked={shows} onClick={() => this.onChangeSwitch(shows,record.id,1)} />
              )
            },
            {
              title: '添加到首屏',
              dataIndex: 'one_sort',
              key: 'one_sort',
              render: (shows,record) => (
                <Switch defaultChecked={shows} onClick={() => this.onChangeSwitch(shows,record.id,2)} />
              )
            },
            {
              title: '创建人',
              dataIndex: 'user_nickname',
              key: 'user_nickname',
            },
            {
              title: '创建时间',
              dataIndex: 'createtime',
              key: 'createtime',
              render: text => <span>{moment(text).format('YY-MM-DD HH:mm:ss')}</span>,
            },
            {
              title: '更新时间',
              dataIndex: 'updatatime',
              key: 'updatatime',
              render: text => <span>{moment(text).format('YY-MM-DD HH:mm:ss')}</span>,
            },
            {
              title: '操作',
              dataIndex: 'action',
              render: (text, record) =>
                (
                  <div>
                    <Button type="primary" size='small' onClick={() => this.handleEdit(record.key)}>编辑</Button>
                    <Divider type="vertical" />
                    <Popconfirm title="确认删除?" okText='确认' cancelText="取消"  onConfirm={() => this.handleDelete(record.key)} >
                      <Button type="danger" size='small'>删除</Button>
                    </Popconfirm>
                  </div>
                  
                ),
            },
          ];
        return (
            <div className={styles.ShopIndex}>
                <div className={styles.ShopIndexBox}>
                    <Row style={{marginBottom: '15px'}}>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Input placeholder="请输入分类名称" value={this.state.message} onChange={this.messageChange} />
                        </Col>
                        <Col xs={24} sm={12} md={4} lg={4} xl={2} offset={1}>
                            <Button type="primary"  style={{width: '100%'}} onClick={this.searche}>查找</Button>
                        </Col>
                        <Col xs={24} sm={12} md={4} lg={4} xl={2} offset={1}>
                            <Button type="primary" style={{width: '100%'}}>
                                <Link to='/index/product/class/add'>添加</Link> 
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: '15px'}}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table columns={columns} dataSource={this.state.dataList} onChange={this.onChangePage} pagination={this.state.page} />
                        </Col>
                    </Row>    
                </div>
            </div>
        )
    }
}
