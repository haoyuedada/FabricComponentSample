import React, { useRef, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

const TabText = (props: any) => {
    return (
        <Text>{props.children}</Text>
    )
}

export default () => {
  console.log('App.tsx rendered start');
  const tabViewRef = useRef<any>(null);

  const goToFirstPage = () => {
    tabViewRef.current?.goToPage(0);
  };

  useEffect(() => {
    tabViewRef.current?.goToPage(0);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={['iod', 'harmony'].includes(Platform.OS) ? 'padding' : undefined}
      enable={true}
    >
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          ref={tabViewRef}
          style={{ marginTop: 20 }}
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
        >
          <TabText tabLabel='Tab #1'>My</TabText>
          <TabText tabLabel='Tab #2'>favorite</TabText>
          <TabText tabLabel='Tab #3'>project</TabText>
        </ScrollableTabView>
        <TouchableOpacity
          onPress={goToFirstPage}
          style={{
            position: 'absolute',
            bottom: 40,
            right: 20,
            backgroundColor: '#007AFF',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff' }}>跳转到第一页</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="请输入内容..."
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          paddingHorizontal: 12,
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      />
    </KeyboardAvoidingView>
  );
}
