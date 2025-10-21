import {
  RNInstance,
  RNOHCoreContext,
  RNComponentContext,
  RNOHContext,
  buildRNComponentForTag,
  ComponentBuilderContext,
  MetroJSBundleProvider,
  AnyJSBundleProvider,
  ResourceJSBundleProvider
} from "@rnoh/react-native-openharmony";
import { createRNPackages } from '../rn/RNPackagesFactory';
import { buildCustomComponent, arkTsComponentNames } from './buildCustomComponent'

export default class RNInstaceManage {
  public metroInstance!: RNInstance;
  public BundleInstance!: RNInstance;
  public rnohCoreContext: RNOHCoreContext | undefined = AppStorage.get("RNOHCoreContext")
  public metroCtx!: RNComponentContext;
  public bundleCtx!: RNComponentContext;
  public isMetroAlive:boolean = false;

  public async loadMetroBundle(): Promise<boolean> {
    this.metroInstance = await this.getOrCreateRNInstance(this.rnohCoreContext!)
    this.metroCtx = new RNComponentContext(
      RNOHContext.fromCoreContext(this.rnohCoreContext!, this.metroInstance),
      wrapBuilder(buildCustomComponent),
      wrapBuilder(buildRNComponentForTag),
      new Map(),
    )
    const provide = new MetroJSBundleProvider();
    await this.metroInstance.runJSBundle(provide);
    const jsBundleExecutionStatus: string = this.metroInstance.getBundleExecutionStatus(provide.getURL()) as string;
    if (jsBundleExecutionStatus === 'DONE') {
      this.isMetroAlive = true
      return true;
    } else {
      this.isMetroAlive = false
      return false
    }
  }

  public async loadBasicBundle(): Promise<void> {
    this.BundleInstance = await this.getOrCreateRNInstance(this.rnohCoreContext!)
    this.bundleCtx = new RNComponentContext(
      RNOHContext.fromCoreContext(this.rnohCoreContext!, this.BundleInstance),
      wrapBuilder(buildCustomComponent),
      wrapBuilder(buildRNComponentForTag),
      new Map(),
    )
    const provide = new AnyJSBundleProvider([
      new ResourceJSBundleProvider(getContext().resourceManager, 'split/sdk.harmony.js')
    ]);
    await this.BundleInstance.runJSBundle(provide)
  }

  public async loadBussinessBundle(): Promise<boolean> {
    const provide = new AnyJSBundleProvider([
      new ResourceJSBundleProvider(getContext().resourceManager, 'split/bundle.harmony.js')
    ]);
    await this.BundleInstance.runJSBundle(provide)
    return true;
  }

  public getOrCreateRNInstance(rnohCoreContext: RNOHCoreContext): Promise<RNInstance>{
    return rnohCoreContext.createAndRegisterRNInstance({
      createRNPackages: createRNPackages,
      enableNDKTextMeasuring: true,
      enableBackgroundExecutor: false,
      enableCAPIArchitecture: true,
      arkTsComponentNames: arkTsComponentNames,
      // disableConcurrentRoot: true,
      backPressHandler: () => {}
    })
  }
}