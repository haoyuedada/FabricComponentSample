import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MJRefresh, { ScrollView } from "react-native-mjrefresh";

interface State {
  text: string,
  refreshing: Boolean,
}

export default class MjRefreshDemo extends Component<{}, State> {
  constructor(props: any) {
    super(props);
  }

  state = {
    text: "下拉刷新",
    refreshing: false
  }
  _mjrefresh: any = null;
  _hw = {
    finishRefresh: () => {}
  }

  _onRefresh = () => {
    setTimeout(() => {
      this._hw && this._hw.finishRefresh();
    }, 1000);
  }
  render() {
    return (
      <ScrollView
        refreshControl={
          <MJRefresh
            ref={(ref: any) => this._mjrefresh = ref}
            onRefresh={
              () => {
                this.setState({
                  text: '正在刷新'
                })
                console.log('onRefresh')
                setTimeout(() => {
                  this._mjrefresh && this._mjrefresh.finishRefresh();
                }, 1000)
              }
            }
            onRefreshIdle={() => console.log('onRefreshIdle')}
            onReleaseToRefresh={() => {
              this.setState({
                text: '释放刷新'
              })
            }}
            onPulling={(e: any) => {
              console.log('cbdtest onPulling:' + e.nativeEvent.percent)
              if (e.nativeEvent.percent < 0.1) {
                this.setState({
                  text: '下拉刷新'
                })
              }
            }}
          >
            {/* <View style={{
              height: 100, backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center', flexDirection: 'row'
            }}>
              <Text>{this.state.text}</Text>
            </View> */}
            <ScrollView
                style={styles.smallScrollView}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.smallScrollContent}>
                {Array.from({ length: 100 }).map((_, index) => (
                    <View key={index} style={styles.scrollItem}>
                        <Text style={styles.scrollItemText}>Item {index + 1}</Text>
                    </View>
                ))}
            </ScrollView>
          </MJRefresh>
        }
      >
        <Text>{"mjRefresh TEST mjRefresh TEST mjRefresh TEST mjRefresh TEST mjRefresh TEST"}</Text>
      </ScrollView>
    )
  };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    smallScrollViewWrapper: {
        height: 50,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 2,
    },
    smallScrollView: {
        height: 50,
    },
    smallScrollContent: {
        paddingVertical: 8,
    },
    scrollItem: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        height: 34,
        justifyContent: 'center',
    },
    scrollItemText: {
        fontSize: 14,
        color: '#333',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    panHeader: {
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#ccc',
        borderRadius: 2,
        marginBottom: 8,
    },
    panTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 4,
    },
    panFooter: {
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
});