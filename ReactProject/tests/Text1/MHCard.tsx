import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Styles } from './Styles'
const ARROW_SIZE = Platform.select({
    ios: 24,
    android: 26
});

class MHCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Initialize state if needed
        };
    }
    render() {
        let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
        if (titleLine < 1)  titleLine = 0;

        return (
            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <Text style={[Styles.common.title, this.props.unlimitedHeightEnable ? {
                        height: undefined,
                        lineHeight: undefined
                    } : {}, this.props.titleStyle]} numberOfLines={titleLine}>
                        {this.props.title || ''}
                    </Text>
                    {this.props.subtitle ? <Text style={[styles.subtitle, {
                        color: theme.colorGrayNormal
                    }, this.props.unlimitedHeightEnable ? {
                        height: undefined,
                        lineHeight: undefined
                    } : {}, this.props.subtitleStyle]} numberOfLines={subtitleLine}>
                        {this.props.subtitle}
                    </Text> : null}
                </View>
                {this.props.rightText ? <View style={{
                    maxWidth: '33%'
                }}>
                    <Text style={[styles.rightText, {
                        color: theme.colorBlack
                    }, this.props.unlimitedHeightEnable ? {
                        height: undefined,
                        lineHeight: undefined
                    } : {}, this.props.rightTextStyle]} allowFontScaling={this.props.allowFontScaling} numberOfLines={rightTextLine}>
                        {this.props.rightText || ''}
                    </Text>
                </View> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16
  },
  rightText: {
    paddingLeft: 10,
    textAlign: 'right',
    fontSize: 16
  },
  arrow: {
    width: ARROW_SIZE,
    height: ARROW_SIZE
  }
});