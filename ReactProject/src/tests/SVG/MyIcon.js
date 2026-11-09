import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MyIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path fill="#000" d="M12 2L2 7l10 5 10-5z" />
  </Svg>
);

export default MyIcon;