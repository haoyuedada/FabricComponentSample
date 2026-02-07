/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import * as React from 'react';
import { Alert, StyleSheet, Text, Pressable, View, Button } from 'react-native';

/**
 * Simple alert examples.
 */

const AlertWithDefaultButton = () => {
  const alertMessage = 'Alert Message';

  return (
    <View>
      <Text>属性:alert-with-default-button</Text>
      <Text>预期结果：</Text>
      <Text>点击下方按钮，页面弹出带有标题和信息的弹框以及一个默认按钮"ok"，点击"ok"弹框关闭</Text>
      <Button
        title='AlertWithDefaultButton'
        style={styles.wrapper}
        onPress={() => Alert.alert('Alert', alertMessage)}>
      </Button>
    </View>
  );
};

const AlertWithTwoButtons = () => {
  const [message, setMessage] = React.useState('');

  const alertMessage = 'Your subscription has expired!';

  return (
    <View>
      <Text>属性:alert-with-two-buttons</Text>
      <Text>预期结果：</Text>
      <Text>点击下方按钮，页面弹出弹框，弹框具有"ignore"和"renew"两个按钮，点击"ignore"按钮,实际结果下方展示"ignore Pressed!",
        点击"renew"按钮,实际结果下方展示"renew Pressed!"
      </Text>
      <Button
        title='AlertWithTwoButtons'
        style={styles.wrapper}
        onPress={() =>
          Alert.alert('Action Required!', alertMessage, [
            { text: 'Ignore', onPress: () => setMessage('Ignore Pressed!') },
            { text: 'Renew', onPress: () => setMessage('Renew Pressed!') },
          ])
        }>
      </Button>
      <Text style={{ marginTop: 10 }}>实际结果:</Text>
      <Text style={{ marginTop: 10 }}>{message}</Text>
    </View>
  );
};

const AlertWithThreeButtons = () => {
  const [message, setMessage] = React.useState('');
  const alertMessage = 'Do you want to save your changes?';

  return (
    <View>
      <Text>属性:alert-with-three-buttons</Text>
      <Text>预期结果：</Text>
      <Text>点击下方按钮，页面弹出弹框，弹框具有"Cancel"、"No"、"Yes"三个按钮，点击"Cancel"按钮,实际结果下方展示"Cancel Pressed!",
        点击"No"按钮,实际结果下方展示"No Pressed!"，点击"Yes"按钮,实际结果下方展示"Yes Pressed!"
      </Text>
      <Button
        title='AlertWithThreeButtons'
        style={styles.wrapper}
        onPress={() =>
          Alert.alert('Unsaved Changes!', alertMessage, [
            { text: 'Cancel', onPress: () => setMessage('Cancel Pressed!') },
            { text: 'No', onPress: () => setMessage('No Pressed!') },
            { text: 'Yes', onPress: () => setMessage('Yes Pressed!') },
          ])
        }>
      </Button>
      <Text style={{ marginTop: 10 }}>实际结果:</Text>
      <Text style={{ marginTop: 10 }}>{message}</Text>
    </View>
  );
};

// const AlertWithManyButtons = () => {
//   const [message, setMessage] = React.useState('');

//   const alertMessage = 'Alert Message';

//   return (
//     <View>
//       <Text>属性:alert-with-many-buttons</Text>
//       <Text>预期结果：</Text>
//       <Text>点击下方按钮，页面弹出弹框，弹框具有4个按钮,点击各按钮，
//         实际结果下方展示对应信息(如点击Button1，展示Button1 Pressed!)
//       </Text>
//       <Button
//         title='AlertWithManyButtons'
//         style={styles.wrapper}
//         onPress={() =>
//           Alert.alert(
//             'Foo Title',
//             alertMessage,
//             '....'.split('').map((_dot, index) => ({
//               text: 'Button ' + index,
//               onPress: () => setMessage(`Button ${index} Pressed!`),
//             })),
//           )
//         }>
//       </Button>
//       <Text style={{ marginTop: 10 }}>实际结果:</Text>
//       <Text style={{ marginTop: 10 }}>{message}</Text>
//     </View>
//   );
// };

const AlertWithCancelableTrue = () => {
  const [message, setMessage] = React.useState('');

  const alertMessage = 'Tapping outside this dialog will dismiss this alert.';

  return (
    <View>
      <Text>属性:cancelable_is_true</Text>
      <Text>预期结果：</Text>
      <Text>点击下方按钮，页面弹出弹框，点击弹框外的区域弹框关闭，
        实际结果下方展示“This alert was dismissed by tapping outside of the alert dialog.”
      </Text>
      <Button
        title='AlertWithCancelableTrue'
        style={styles.wrapper}
        onPress={() =>
          Alert.alert(
            'Alert Title',
            alertMessage,
            [{ text: 'OK', onPress: () => { } }],
            {
              cancelable: true,
              onDismiss: () =>
                setMessage(
                  'This alert was dismissed by tapping outside of the alert dialog.',
                ),
            },
          )
        }>
      </Button>
      <Text style={{ marginTop: 10 }}>实际结果:</Text>
      <Text style={{ marginTop: 10 }}>{message}</Text>
    </View>
  );
};

const AlertWithCancelableFalse = () => {

  const alertMessage = 'Alert Message';

  return (
    <View>
      <Text>属性:cancelable_is_false</Text>
      <Text>预期结果：</Text>
      <Text>点击下方按钮，页面弹出弹框，点击弹框外的区域弹框不关闭</Text>
      <Button
        title='AlertWithCancelableFalse'
        style={styles.wrapper}
        onPress={() =>
          Alert.alert(
            'Alert Title',
            alertMessage,
            [{ text: 'OK', onPress: () => { } }],
            {
              cancelable: false,
              onDismiss: () => { }
            },
          )
        }>
      </Button>
    </View>
  );
};

const AlertWithStyles = () => {
  const [message, setMessage] = React.useState('');

  const alertMessage = 'Look at the button styles!';

  return (
    <View>
      <Pressable
        style={styles.wrapper}
        onPress={() =>
          Alert.alert('Styled Buttons!', alertMessage, [
            {
              text: 'Default',
              onPress: () => setMessage('Default Pressed!'),
              style: 'default',
            },
            {
              text: 'Cancel',
              onPress: () => setMessage('Cancel Pressed!'),
              style: 'cancel',
            },
            {
              text: 'Destructive',
              onPress: () => setMessage('Destructive Pressed!'),
              style: 'destructive',
            },
          ])
        }>
        <View style={styles.button}>
          <Text>Tap to view alert</Text>
        </View>
      </Pressable>
      <Log message={message} />
    </View>
  );
};

const AlertWithStylesPreferred = () => {
  const [message, setMessage] = React.useState('');

  const alertMessage =
    "The Preferred button is styled with 'preferred', so it is emphasized over the cancel button.";

  return (
    <View>
      <Pressable
        style={styles.wrapper}
        onPress={() =>
          Alert.alert('Foo Title', alertMessage, [
            {
              text: 'Preferred',
              isPreferred: true,
              onPress: () => setMessage('Preferred Pressed!'),
            },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setMessage('Cancel Pressed!'),
            },
          ])
        }>
        <View style={styles.button}>
          <Text>Tap to view alert</Text>
        </View>
      </Pressable>
      <Log message={message} />
    </View>
  );
};

const PromptOptions = () => {
  const [promptValue, setPromptValue] = React.useState < string > ('');

  const customButtons = [
    {
      text: 'Custom OK',
      onPress: setPromptValue,
    },
    {
      text: 'Custom Cancel',
      style: 'cancel',
    },
  ];

  return (
    <View>
      <Text style={styles.promptValue}>
        <Text style={styles.bold}>Prompt value:</Text> {promptValue}
      </Text>

      <Pressable
        style={styles.wrapper}
        onPress={() => Alert.prompt('Type a value', null, setPromptValue)}>
        <View style={styles.button}>
          <Text>prompt with title & callback</Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.wrapper}
        onPress={() => Alert.prompt('Type a value', null, customButtons)}>
        <View style={styles.button}>
          <Text>prompt with title & custom buttons</Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.wrapper}
        onPress={() =>
          Alert.prompt(
            'Type a phone number',
            null,
            null,
            'plain-text',
            undefined,
            'phone-pad',
          )
        }>
        <View style={styles.button}>
          <Text>prompt with title & custom keyboard</Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.wrapper}
        onPress={() =>
          Alert.prompt(
            'Type a value',
            null,
            setPromptValue,
            undefined,
            'Default value',
          )
        }>
        <View style={styles.button}>
          <Text>prompt with title, callback & default value</Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.wrapper}
        onPress={() =>
          Alert.prompt(
            'Type a value',
            null,
            customButtons,
            'login-password',
            'admin@site.com',
          )
        }>
        <View style={styles.button}>
          <Text>
            prompt with title, custom buttons, login/password & default value
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const PromptTypes = () => {
  return (
    <View>
      <View style={{ marginBottom: 5 }}>
        <Button
          title="plain-text"
          style={styles.wrapper}
          onPress={() => Alert.prompt('Plain Text Entry')}
        />
      </View>

      <View style={{ marginBottom: 5 }}>
        <Button
          title="secure-text"
          style={styles.wrapper}
          onPress={() => Alert.prompt('Secure Text', null, null, 'secure-text')}
          style={{ marginBottom: 5 }}
        />
      </View>

      <View style={{ marginBottom: 5 }}>
        <Button
          title="login-password"
          style={styles.wrapper}
          onPress={() =>
            Alert.prompt('Login & Password', null, null, 'login-password')
          }
          style={{ marginBottom: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  logContainer: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  promptValue: {
    marginBottom: 10,
  },
});

export const examples = [
  {
    title: '1.Alert with default Button',
    description:
      "It can be used to show some information to user that doesn't require an action.",
    render(): React.Node {
      return <AlertWithDefaultButton />;
    },
  },
  {
    title: '2.Alert with two Buttons',
    description: 'It can be used when an action is required from the user.',
    render(): React.Node {
      return <AlertWithTwoButtons />;
    },
  },
  {
    title: '3.Alert with three Buttons',
    description: 'It can be used when there are three possible actions',
    render(): React.Node {
      return <AlertWithThreeButtons />;
    },
  },
  // {
  //   title: '4.Alert with many Buttons',
  //   description: 'It can be used when more than three actions are required.',
  //   render(): React.Node {
  //     return <AlertWithManyButtons />;
  //   },
  // },
  {
    title: '5.Alert with cancelable={true}',
    render(): React.Node {
      return <AlertWithCancelableTrue />;
    },
  },
  {
    title: '6.Alert with cancelable={false}',
    render(): React.Node {
      return <AlertWithCancelableFalse />;
    },
  },
  {
    title: '7.Prompt Types',
    platform: 'ios',
    render(): React.Node {
      return <PromptTypes />;
    },
  },
  {
    title: '8.Prompt Options',
    platform: 'ios',
    render(): React.Node {
      return <PromptOptions />;
    },
  },
  {
    title: '9.Alert with styles',
    platform: 'ios',
    description:
      "Alert buttons can be styled. There are three button styles - 'default' | 'cancel' | 'destructive'.",
    render(): React.Node {
      return <AlertWithStyles />;
    },
  },
  {
    title: '10.Alert with styles + preferred',
    platform: 'ios',
    description:
      "Alert buttons with 'isPreferred' will be emphasized, even over cancel buttons",
    render(): React.Node {
      return <AlertWithStylesPreferred />;
    },
  },
];

export default ({
  framework: 'React',
  title: 'Alert Example',
  category: 'UI',
  documentationURL: 'https://reactnative.dev/docs/alert',
  description:
    'Alerts display a concise and informative message and prompt the user to make a decision.',
  examples,
}: RNTesterModule);
