import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Block = ({ title, expect, actual, children }): React.Node => {
    return (
        <View
            style={{
                backgroundColor: '#f6f7f8',
                borderWidth: 1,
                borderColor: '#d6d7da',
                margin: 10,
                marginBottom: 5,
                height: 'auto',
                width: 'auto',
                padding: 10
            }}
        >
            <View >
                {title && (
                    <Text style={styles.title}>
                        {title}
                    </Text>
                )}
                {expect && (
                    <Text
                        style={styles.texts}>
                        {expect}
                    </Text>
                )}
                {expect && (
                    <Text
                        style={styles.texts}>
                        {actual}
                    </Text>
                )}
            </View>
            <View style={styles.children}>{children}</View>
        </View >
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    texts: {
        marginBottom: 5
    }
});

module.exports = Block;