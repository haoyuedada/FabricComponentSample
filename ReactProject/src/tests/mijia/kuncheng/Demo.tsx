import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

const App = () => {
  const [selectedTab, setSeletedTab] = useState(0);
  return (
    <SafeAreaView style={{ width: '100%', height: 100 }} >
      <View style={{
        position: 'absolute', bottom: 0, width: '100%', height: 55, flexDirection: 'row',
        alignItems: 'center', paddingStart: 15, paddingEnd: 15
      }} >
        <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
          <TouchableWithoutFeedback
            onPress={() => {
              if (selectedTab == 0) return;
              setSeletedTab(0)
            }}
          >
            <View style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center', end: 20 }} >
              <Text style={{
                fontSize: 16,
                color: selectedTab == 0 ? '#32bac0' : '#333333'
              }}
              >
                图片
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (selectedTab == 1) return;
              setSeletedTab(1)
            }}
          >
            <View style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center', start: 20 }} >
              <Text style={{
                fontSize: 16,
                color: selectedTab == 1 ? '#32bac0' : '#333333'
              }}
              >
                视频
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;