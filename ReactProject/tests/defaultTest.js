// App.js
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LanguageTest } from "./config/LangsTest";

function requireLangTest() {
  import("./config/dle4jz/LangsTest.js").then((module) => {
    console.log("imported module:", module);
  }).catch((error) => {
    console.error("Error importing module:", error);
  });
}
async function loadCfg(){
  let langFnTest = LanguageTest["madv.cateye.dle4jz"];
  let langTest = await langFnTest()
  console.log("chy langTest:", langTest)
}

export default function App() {
  loadCfg();
  requireLangTest();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>查看日志，比较 import/require 下 default 行为差异</Text>
    </View>
  );
}
