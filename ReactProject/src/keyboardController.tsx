import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView, KeyboardProvider } from "react-native-keyboard-controller";

function App() {
    return (
        <KeyboardProvider>
            <KeyboardAvoidingView style={{
                padding: 22,
                flex: 1,
                justifyContent: "space-between",
            }}>
                <Text style={{
                    color: "black",
                    fontSize: 25,
                    marginTop: 100,
                    fontWeight: "500"
                }}>react-native-keyboard-controller</Text>
                <View>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#7C7C7C"
                        style={{
                            height: 45,
                            borderColor: "#000000",
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 36,
                            paddingLeft: 10,
                        }}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#7C7C7C"
                        style={{
                            height: 45,
                            borderColor: "#000000",
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 36,
                            paddingLeft: 10,
                        }}
                    />
                    <TouchableOpacity style={{
                        marginTop: 40,
                        height: 45,
                        borderRadius: 10,
                        backgroundColor: "rgb(40, 64, 147)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: 16,
                            color: "white",
                        }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </KeyboardProvider>
    );
}
export default App;
