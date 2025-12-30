import * as React from 'react';
import { ViewStyle } from 'react-native';

export interface SignatureInputProps {
  /** Color of the signature pen. Default: "black" */
  color?: string;
  /** Thickness of the pen stroke. Default: 3 */
  strokeWidth?: number;
  /** Height of the drawing area. Default: 200 */
  height?: number | string;
  /** Width of the drawing area. Default: "100%" */
  width?: number | string;
  /** Background color of the pad. Default: "#f5f5f5" */
  backgroundColor?: string;
  /** Custom container style */
  style?: ViewStyle;
  /** Callback when the user lifts their finger */
  onEnd?: () => void;
  /** Callback when the paths array changes */
  onChange?: (paths: string[]) => void;
}

export interface SignatureInputRef {
  /** Clears the signature pad */
  clear: () => void;
  /** Returns the array of SVG path strings */
  getPaths: () => string[];
  /** Returns the complete SVG XML string */
  getSVG: () => string;
  /** Returns true if no signature has been drawn */
  isEmpty: () => boolean;
}

declare const SignatureInput: React.ForwardRefExoticComponent<
  SignatureInputProps & React.RefAttributes<SignatureInputRef>
>;

export default SignatureInput;