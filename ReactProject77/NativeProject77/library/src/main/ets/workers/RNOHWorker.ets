// entry/src/main/ets/worker/RNOHWorker.ets
import { setupRNOHWorker } from "@rnoh/react-native-openharmony/src/main/ets/setupRNOHWorker";
import { createRNPackages } from '../rn/RNPackagesFactory';

setupRNOHWorker({
  createWorkerRNInstanceConfig: (_rnInstanceName) => {
    return { thirdPartyPackagesFactory: createRNPackages }
  }
})