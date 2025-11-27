import React, { useRef, useEffect, useState } from 'react';
const { Text,Image, View,StyleSheet, Animated } = require('react-native');

const AbortPrefetch = () => {
  Image.prefetch(
    'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
    // @ts-ignore
    (requestId) => {
      setTimeout(() => {
        Image.abortPrefetch?.(requestId);
      }, 10);
    },
  ).then(res => console.log(res));
return (
    <View>
        {/* <Text>预期效果:中断预加载操作</Text>
        <Text>实际效果:</Text>
        <Text>{status}</Text>
        <Image
            style={[styles.image, { height: 300 }]}
            source={{ uri: 'https://legacy.reactjs.org/logo-og.png' }}
        />
        <Button title="Abort Prefetch" onPress={handleAbortPrefetch} /> */}
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  sectionHeader: {
    width: 100,
    backgroundColor: 'lightgray',
    padding: 2,
  },
  viewButton: {
    flexDirection: 'row',
  },
  viewBlock: {
    padding: 20,
    width: 100,
    height: 100,
    backgroundColor: '#61dafb',
  },
})


exports.title = 'Image AbortFetch Example';
exports.category = 'image';
exports.description =
  'Check whether it is a production environment';
exports.examples = [
  {
    title: '1. abortPrefetch',
    render(): React.Node {
      return <AbortPrefetch />
    },
  },
]