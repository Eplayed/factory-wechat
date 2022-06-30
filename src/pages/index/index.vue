<template>
  <view class="index">
    <text>{{ msg }}</text>
    <button @tap="handleLogin">微信登录</button>
    <button open-type="getPhoneNumber" @getphonenumber="handlePhoneNumber">获取手机号</button>
  </view>
</template>

<script>
import './index.less'
import Taro from '@tarojs/taro'

export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  },
  methods:{
    handleLogin(){
      Taro.login().then(res=>{
        console.log('res',res)
      })
      Taro.getUserProfile({
      lang: 'zh_CN',
      desc: "获取你的昵称、头像、地区及性别",
      success: response => {
        const wxUserInfo = response.userInfo;
        console.log('response',response)
        // const { openId } = this.state;
        // console.log('getUserProfile',  wxUserInfo);
        // const from_url = Taro.getCurrentInstance().router?.params["from_url"];
        // Taro.navigateTo({url: `${ROUTER_ENUM.PAGE_USER_REGISTER}?userInfo=${JSON.stringify(wxUserInfo)}&openId=${openId || ''}&from_url=${from_url}`})
      },
      fail: () => {
        //拒绝授权
        console.error("您拒绝了请求");
        return;
      }
    })
    },
    handlePhoneNumber(e){
        console.log('handlePhoneNumber')
        if (e.detail.errMsg === "getPhoneNumber:ok") {
              // 发起网络请求
              console.log('e',e)
              console.log('detail',e.detail)
            }
    }
  }
}
</script>
