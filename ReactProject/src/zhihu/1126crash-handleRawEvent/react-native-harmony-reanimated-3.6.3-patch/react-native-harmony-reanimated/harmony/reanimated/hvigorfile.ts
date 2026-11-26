// Script for compiling build behavior. It is built in the build plug-in and cannot be modified currently.
import { harTasks } from '@ohos/hvigor-ohos-plugin'
import { reactPlugin } from '@cfe/omni_plugin'

export default {
  system: harTasks,
  plugins: [
    reactPlugin({
      moduleName: 'react-native-reanimated',
    }),
  ],
}
