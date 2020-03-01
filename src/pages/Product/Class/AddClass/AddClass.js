/*
 * @Author: 崔国强
 * @Date: 2019-12-04 16:53:51
 * @LastEditTime : 2020-01-07 18:07:27
 * @LastEditors  : Please set LastEditors
 * @Description: 添加商品
 * @FilePath: \umi-admin\src\pages\Product\Shoping\AddShop\AddShop.js
 */
import React, { Component } from 'react'
import router from 'umi/router';
import { connect } from 'dva'
import styles from './AddClass.css'
import { Form, Icon, Input, Button, Switch , Upload, message} from 'antd';

class AddClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            ListSrc:{   
                name: '',
                image: [],
                shows: false
            },
            propsUpload: {
                name: 'file',
                action: this.props.UserRedux.httpsUpload, 
                method: 'post',
                headers: {
                //   authorization: 'authorization-text',
                  Authorization: this.props.UserRedux.token
                },
                onChange(info) {
                   
                  if (info.file.status !== 'uploading') {
                   
                  }
                  if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                  }
                },
              }
        }
    }
    // 添加
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.$https.post('index/addSort',{
                ...values,
                id: this.state.ListSrc ? this.state.ListSrc.id : null
            })
            .then(res=>{
                console.log(res)
                if(res.code === 0 && res.data.type === 0){
                    this.props.form.resetFields();
                }else if(res.code === 0 && res.data.type === 1){
                    this.props.form.resetFields();
                    router.push('/index/product/class/index')
                }
            })
          }
        });
      };
    componentDidMount(){
        // 查询某一分类
        let This = this
        if(this.props.location.query.id){
            this.$https.get('nottoken/getSortItem',{
                params:{
                    id: this.props.location.query.id
                }
            })
            .then(res=>{
                console.log(res)
                res.data.image = JSON.parse(res.data.image)
                res.data.shows  = Boolean(res.data.shows)
                if(res.code === 0){
                    This.setState({
                        ListSrc: res.data
                    })
                }else{
                    router.push('/index/product/class/index')
                }
            })
        }
    }
    // 序列化 上传图标返回后的数据结构
    normFile = e => {
        let srcAll = []
        if(e.file.response && e.file.response.code === 0){
                for(let i=0; i<e.fileList.length;i++){
                    if(e.fileList[i].response){
                        let imgSrc = {
                            url: e.fileList[i].response.data.url || '',
                            name: e.fileList[i].name,
                            uid: e.fileList[i].uid,
                            status: e.fileList[i].status
                        }
                        srcAll=[]
                        srcAll.push(imgSrc)
                    }else{
                        srcAll=[]
                        srcAll.push(e.fileList[i])
                    }
                }
                return srcAll
            
            }else{
                return e.fileList;
            }
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
              xl: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
              xl: { span: 20 },
            },
          }
        return (
            <div className={styles.AddShop}>
                <div className={styles.AddShopBox}>
                <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="分类名称" hasFeedback className={styles.AddShopBoxFromItem} extra="建议在2~4个字之间">
                        {getFieldDecorator('name', {
                            initialValue: this.state.ListSrc.name,
                            rules: [{ required: true, message: '请输入分类名称!' },{ min:2 , max: 4 , message: '分类名称在2~4个字之间!' }],
                        })(
                            <Input
                            placeholder="请输入分类名称"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="分类展示图" extra="分类展示(建议1:1)">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            initialValue: this.state.ListSrc.image,
                            getValueFromEvent: this.normFile,
                            rules: [
                                { required: true, message: '请上传分类展示图!' }
                            ]
                        })(
                            <Upload {...this.state.propsUpload} listType="picture-card">
                                <Button>
                                    <Icon type="upload" />上传分类展示图片
                                </Button>
                            </Upload>,
                        )}
                    </Form.Item>
                    <Form.Item label="立即上架">
                        {getFieldDecorator('shows', { 
                            initialValue: this.state.ListSrc.shows,
                            valuePropName: 'checked',
                            rules: [
                                { required: true, message: '请选择是否立即上架!' }
                            ]
                        })(<Switch checkedChildren="是" unCheckedChildren="否"  />)}
                    </Form.Item>
                    {/* <Form.Item> */}
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                           {this.state.ListSrc.id ? '修改' : '添加'}
                        </Button>
                    {/* </Form.Item> */}
                </Form>
                </div>
            </div>
        )
    }
}


// export default Form.create()(AddClass)

export default connect(
    state => ({
    loading: state.loading , //dva已经可以获得 loading状态
    UserRedux: state.UserRedux  //获取指定命名空间的模型状态
}),
{
    
}

)(Form.create()(AddClass))