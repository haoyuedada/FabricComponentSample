// App.js
import React from 'react'
import { SafeAreaView } from 'react-native'
import EnhancedPostList from './PostList'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EnhancedPostList />
    </SafeAreaView>
  )
}

export default App