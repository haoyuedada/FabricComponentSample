import React from 'react';
import { View } from 'react-native';
import { ScreenSound } from './screen_sound'; // 根据你的文件结构调整路径

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}
    >
      {/* 只是指定宽高 */}
      <ScreenSound width={32} height={32} />

      <ScreenSound
        width={48}
        height={48}
        // fill="#FFFFFF"   // 把 svg 内所有可填充部位都涂成红色
        // stroke="#FFFFFF"
        // fillAll="#FFFFFF" // 把 svg 内所有可填充部位都涂成绿色
        // strokeAll="#FFFFFF" // 把 svg 内所有可描边部位都涂成红色
      />

      {/* 指定宽高 + 全部填充色 */}
      <ScreenSound
        width={48}
        height={48}
        // fill="#FF0000"   // 把 svg 内所有可填充部位都涂成红色
        // stroke="#FF0000"
        // fillAll="#FF0000" // 把 svg 内所有可填充部位都涂成绿色
        // strokeAll="#FF0000" // 把 svg 内所有可描边部位都涂成红色
      />

      {/* 指定宽高 + 只给 path stroke 上色 */}
      <ScreenSound
        width={64}
        height={64}
        // stroke="#0000FF"    // 只给默认的 stroke 上色
        // strokeAll="#00FF00" // 把 svg 内所有其他 stroke 都涂成绿色
      />
    </View>
  );
}
