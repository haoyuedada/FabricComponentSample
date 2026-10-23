import React, { useState } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function App() {
  const [photo, setPhoto] = useState(null);

  const handlePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,      // 裁剪后宽度
        height: 300,     // 裁剪后高度
        cropping: true,  // 启用裁剪
        freeStyleCropEnabled:true
      });
      setPhoto(image.path);
    } catch (err) {
      // ....
    }
  };

  return (
    <View style={styles.container}>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <Button title="选择图片并裁剪" onPress={handlePick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
});
