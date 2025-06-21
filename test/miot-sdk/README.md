# MIOT SDK
A MIOT SDK for react-native plugin program of ios and android

## 编码说明
### 插件入口调用示例
```js
import React from 'react'
import {StyleSheet, Text, View, Image} from "react-native";
import {Entrance, Package, Device, Service, Host...} from 'miot'

class App extends React.Component{

    render(){
        return <View>
            <Text>device model is : {Device.model}</Text>
        </View>
    }

}

switch(Package.entrance){

    case Entrance.Main:
        Package.entry(App, _=>{
            //do something when the App is ready but not loaded 
            ...
        })
        break;

    default:
        break;

}

```




### Promise 使用特别说明
MIOT SDK 在所有的回调场合, 都尽量使用 Promise 方式返回, 在没有特殊说明的情况下, 返回的 Promise, then(data=>{...})则表示调用成功,并返回正确数据, 而 catch(err=>{...})表示调用失败 
例如:
```js
import {Device} from 'miot'

Device.owner.load().then(account=>{

    let email = account.email;
    ...

}).catch(err=>{

    ...

})

```



### 第三方库使用说明
    
    1, 除了根目录下 package.json 引用的第三方库之外, 插件开发者只能使用纯 js 的第三方库

    2, 不允许修改根目录下的 package.json, 自己引用的第三方纯 js 库, 必须放在自己项目的 package.json 里

    3, 如果发现根目录下 package.json 引用的第三方库存在 bug, 请及时提交 ISSUE 并联系米家修改




