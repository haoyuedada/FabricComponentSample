import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from 'react-native-slider';

const SliderTest = () => {
    const [value, setValue] = useState(50);

    return (

<View style={styles.container}>

<Text style={styles.label}>Value: {value}</Text>

<Slider

style={styles.slider}

minimumValue={0}

maximumValue={100}

step={1}

value={value}

onValueChange={setValue}

minimumTrackTintColor="#1fb28a"

maximumTrackTintColor="#d3d3d3"

thumbTintColor="#b9e4c9"

/>

</View>
    );
};

const styles = StyleSheet.create({
    container: {

flex: 1,

justifyContent: 'center',

alignItems: 'center'
    },
    label: {

fontSize: 18,

marginBottom: 20
    },
    slider: {

width: 300,

height: 40
    }
});

export default SliderTest