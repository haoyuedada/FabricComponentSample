// PostList.js
import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { withObservables } from '@nozbe/watermelondb/react'
import { Post, Comment } from './models'

const PostList = ({ posts }) => (
  <FlatList
    data={posts}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.body}</Text>
        {item.comments.map(comment => (
          <Text key={comment.id}>{comment.body} — by {comment.author}</Text>
        ))}
      </View>
    )}
  />
)

const EnhancedPostList = withObservables(['posts'], ({ posts }) => ({
//   posts: posts.observe(),
})) (PostList)

export default EnhancedPostList