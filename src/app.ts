/*
 * @Author: zyj
 * @Date: 2020-09-03 15:09:43
 * @LastEditors: zyj
 * @LastEditTime: 2020-12-03 13:12:39
 * @Description: file content
 * @FilePath: /factorynike-mini/src/app.ts
 */
import { Component } from 'react'
import 'taro-ui/dist/style/index.scss'
import './app.scss'

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
