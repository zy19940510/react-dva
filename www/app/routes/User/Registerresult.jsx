import React ,{Component}from 'react';
import { Button } from 'antd';
import { connect } from "dva";
import { Link } from 'dva/router';
import Result from '../../components/Result';
import  '../../styles/Registerresult.less';


const actions = (
  <div className="actions">
    <a href=""><Button size="large" type="primary">查看邮箱</Button></a>
    <Link to="/"><Button size="large">返回首页</Button></Link>
  </div>
);


 class resultIndex extends Component {
  constructor(props){
    super()
    
  }
  render() {

    const mail = this.props.register.mail;

    return (
      
      <div>
        <Result
          className="registerResult"
          type="success"
          title={mail}
          description="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
          actions={actions}
          style={{ marginTop: 56 }}
      />
      </div>
    )
  }
}
export default connect(
  (state) => ({
    register : state.register
  })
)(resultIndex);