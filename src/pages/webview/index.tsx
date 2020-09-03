import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'
import { observer } from '@tarojs/mobx'


@observer
class _page extends Component {
  config: Config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#B00051',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F5F5F5'
  }

  state = {
    webUrl: ''
  }

  componentWillMount() {
    this.setState({
      webUrl: decodeURIComponent(this.$router.params.url)
    })
  }

  onload(event) {
    console.log(event);
  }

  err(event) {
    console.log(event);
  }

  render() {

    return (
      <WebView src={this.state.webUrl} onLoad={this.onload} onError={this.err}>
      </WebView>
    )
  }
}

export default _page 
