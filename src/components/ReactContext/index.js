import React from 'react'

const ReactContext = React.createContext({
  lightTheme: true,
  changeTheme: () => {},
  savedVideoList: [],
  changeSavedVideo: () => {},
  savedVal: false,
  onSavedChange: () => {},
  removeCartItem: () => {},
})

export default ReactContext
