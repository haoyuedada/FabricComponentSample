/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');
const {ProgressBarAndroid: ProgressBar} = require('react-native');
const RNTesterBlock = require('../../components/RNTesterBlock');
const RNTesterPage = require('../../components/RNTesterPage');

import type {ProgressBarAndroidProps} from 'react-native/Libraries/Components/ProgressBarAndroid/ProgressBarAndroid';

type MovingBarProps = $ReadOnly<{|
  ...$Diff<
    ProgressBarAndroidProps,
    {
      progress: ?number,
    },
  >,
  indeterminate: false,
|}>;

type MovingBarState = {
  progress: number,
};

class MovingBar extends React.Component<MovingBarProps, MovingBarState> {
  _intervalID: ?IntervalID = null;

  state = {
    progress: 0,
  };

  componentDidMount() {
    this._intervalID = setInterval(() => {
      const progress = (this.state.progress + 0.02) % 1;
      this.setState({progress});
    }, 50);
  }

  componentWillUnmount() {
    if (this._intervalID != null) {
      clearInterval(this._intervalID);
    }
  }

  render() {
    return <ProgressBar progress={this.state.progress} {...this.props} />;
  }
}

class ProgressBarAndroidExample extends React.Component<{}> {
  render() {
    return (
      <RNTesterPage title="ProgressBar Examples4">
        <RNTesterBlock title="水平不确定进度条,属性值为Horizontal">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="inverse" />
        </RNTesterBlock>
        <RNTesterBlock title="水平不确定进度条,属性值为Normal">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="Normal" />
        </RNTesterBlock>
        <RNTesterBlock title="水平不确定进度条,属性值为Small">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="Small" />
        </RNTesterBlock>
        <RNTesterBlock title="水平不确定进度条,属性值为Large">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="Large" />
        </RNTesterBlock>
        <RNTesterBlock title="水平不确定进度条,属性值为inverse">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="inverse" />
        </RNTesterBlock>
        <RNTesterBlock title="水平不确定进度条,属性值为SmallInverse">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="SmallInverse" />
        </RNTesterBlock>
        <RNTesterBlock title="水平不确定进度条,属性值为LargeInverse">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="LargeInverse" />
        </RNTesterBlock>

        <RNTesterBlock title="水平进度条">
          <MovingBar styleAttr="Horizontal" indeterminate={false} />
        </RNTesterBlock>

        <RNTesterBlock title="水平黑色不确定进度条">
          {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */}
          <ProgressBar styleAttr="Horizontal" color="black" />
        </RNTesterBlock>

        <RNTesterBlock title="水平蓝色进度条">
          <MovingBar
            styleAttr="Horizontal"
            indeterminate={false}
            color="blue"
          />
        </RNTesterBlock>
      </RNTesterPage>
    );
  }
}

exports.title = '<ProgressBarAndroid>';
exports.description = 'Horizontal bar to show the progress of some operation.';
exports.examples = [
  {
    title: 'Simple progress bar',
    render: function (): React.Element<typeof ProgressBarAndroidExample> {
      return <ProgressBarAndroidExample />;
    },
  },
];
