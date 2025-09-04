// NativeCalculator.ts
import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  runJsBundle(path: string): void;
}

export default TurboModuleRegistry.get<Spec>(
  'RunJsBundleTurboModule',
);