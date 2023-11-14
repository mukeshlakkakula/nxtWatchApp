import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'
import ReactContext from './components/ReactContext'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import ProtectedRoute from './components/ProtectedRoute'

import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import './App.css'
// Replace your code here
class App extends Component {
  state = {lightTheme: true, savedVideoList: [], savedVal: false}

  changeTheme = () => {
    this.setState(prevState => ({lightTheme: !prevState.lightTheme}))
  }

  onSavedChange = id => {
    this.setState(prevState => ({
      savedVideoList: prevState.savedVideoList.map(each => {
        if (id === each.id) {
          return {...each, savedVal: !prevState.savedVal}
        }
        return each
      }),
    }))
  }

  removeCartItem = id => {
    const {savedVideoList} = this.state
    const updatedCartList = savedVideoList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({savedVideoList: updatedCartList})
  }

  changeSavedVideo = details => {
    const videoDetails = details
    const {savedVideoList} = this.state
    const productObject = savedVideoList.find(
      eachCartItem => eachCartItem.id === details.id,
    )
    console.log('productObject', productObject)
    if (productObject === undefined) {
      this.setState(prevState => ({
        savedVideoList: [...prevState.savedVideoList, videoDetails],
      }))
    }
  }

  render() {
    const {lightTheme, savedVideoList, savedVal} = this.state
    console.log('savedVideoList', savedVideoList)
    return (
      <ReactContext.Provider
        value={{
          lightTheme,
          changeTheme: this.changeTheme,
          changeSavedVideo: this.changeSavedVideo,
          savedVideoList,
          savedVal,
          onSavedChange: this.onSavedChange,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />

          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
