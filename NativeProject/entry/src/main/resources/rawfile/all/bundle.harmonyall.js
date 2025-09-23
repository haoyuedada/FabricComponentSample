var __BUNDLE_START_TIME__=this.nativePerformanceNow?nativePerformanceNow():Date.now(),__DEV__=true,process=this.process||{},__METRO_GLOBAL_PREFIX__='',__requireCycleIgnorePatterns=[/(^|\/|\\)node_modules($|\/|\\)/];process.env=process.env||{};process.env.NODE_ENV=process.env.NODE_ENV||"development";
(function (global) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   *
   * @format
   * @oncall react_native
   * @polyfill
   */

  "use strict";

  /* eslint-disable no-bitwise */
  // A simpler $ArrayLike<T>. Not iterable and doesn't have a `length`.
  // This is compatible with actual arrays as well as with objects that look like
  // {0: 'value', 1: '...'}
  global.__r = metroRequire;
  global[`${__METRO_GLOBAL_PREFIX__}__d`] = define;
  global.__c = clear;
  global.__registerSegment = registerSegment;
  var modules = clear();

  // Don't use a Symbol here, it would pull in an extra polyfill with all sorts of
  // additional stuff (e.g. Array.from).
  var EMPTY = {};
  var CYCLE_DETECTED = {};
  var _ref = {},
    hasOwnProperty = _ref.hasOwnProperty;
  if (__DEV__) {
    global.$RefreshReg$ = function () {};
    global.$RefreshSig$ = function () {
      return function (type) {
        return type;
      };
    };
  }
  function clear() {
    modules = Object.create(null);

    // We return modules here so that we can assign an initial value to modules
    // when defining it. Otherwise, we would have to do "let modules = null",
    // which will force us to add "nullthrows" everywhere.
    return modules;
  }
  if (__DEV__) {
    var verboseNamesToModuleIds = Object.create(null);
    var initializingModuleIds = [];
  }
  function define(factory, moduleId, dependencyMap) {
    if (modules[moduleId] != null) {
      if (__DEV__) {
        // (We take `inverseDependencies` from `arguments` to avoid an unused
        // named parameter in `define` in production.
        var inverseDependencies = arguments[4];

        // If the module has already been defined and the define method has been
        // called with inverseDependencies, we can hot reload it.
        if (inverseDependencies) {
          global.__accept(moduleId, factory, dependencyMap, inverseDependencies);
        }
      }

      // prevent repeated calls to `global.nativeRequire` to overwrite modules
      // that are already loaded
      return;
    }
    var mod = {
      dependencyMap: dependencyMap,
      factory: factory,
      hasError: false,
      importedAll: EMPTY,
      importedDefault: EMPTY,
      isInitialized: false,
      publicModule: {
        exports: {}
      }
    };
    modules[moduleId] = mod;
    if (__DEV__) {
      // HMR
      mod.hot = createHotReloadingObject();

      // DEBUGGABLE MODULES NAMES
      // we take `verboseName` from `arguments` to avoid an unused named parameter
      // in `define` in production.
      var verboseName = arguments[3];
      if (verboseName) {
        mod.verboseName = verboseName;
        verboseNamesToModuleIds[verboseName] = moduleId;
      }
    }
  }
  function metroRequire(moduleId) {
    if (__DEV__ && typeof moduleId === "string") {
      var verboseName = moduleId;
      moduleId = verboseNamesToModuleIds[verboseName];
      if (moduleId == null) {
        throw new Error(`Unknown named module: "${verboseName}"`);
      } else {
        console.warn(`Requiring module "${verboseName}" by name is only supported for ` + "debugging purposes and will BREAK IN PRODUCTION!");
      }
    }

    //$FlowFixMe: at this point we know that moduleId is a number
    var moduleIdReallyIsNumber = moduleId;
    if (__DEV__) {
      var initializingIndex = initializingModuleIds.indexOf(moduleIdReallyIsNumber);
      if (initializingIndex !== -1) {
        var cycle = initializingModuleIds.slice(initializingIndex).map(function (id) {
          return modules[id] ? modules[id].verboseName : "[unknown]";
        });
        if (shouldPrintRequireCycle(cycle)) {
          cycle.push(cycle[0]); // We want to print A -> B -> A:
          console.warn(`Require cycle: ${cycle.join(" -> ")}\n\n` + "Require cycles are allowed, but can result in uninitialized values. " + "Consider refactoring to remove the need for a cycle.");
        }
      }
    }
    var module = modules[moduleIdReallyIsNumber];
    return module && module.isInitialized ? module.publicModule.exports : guardedLoadModule(moduleIdReallyIsNumber, module);
  }

  // We print require cycles unless they match a pattern in the
  // `requireCycleIgnorePatterns` configuration.
  function shouldPrintRequireCycle(modules) {
    var regExps = global[__METRO_GLOBAL_PREFIX__ + "__requireCycleIgnorePatterns"];
    if (!Array.isArray(regExps)) {
      return true;
    }
    var isIgnored = function isIgnored(module) {
      return module != null && regExps.some(function (regExp) {
        return regExp.test(module);
      });
    };

    // Print the cycle unless any part of it is ignored
    return modules.every(function (module) {
      return !isIgnored(module);
    });
  }
  function metroImportDefault(moduleId) {
    if (__DEV__ && typeof moduleId === "string") {
      var verboseName = moduleId;
      moduleId = verboseNamesToModuleIds[verboseName];
    }

    //$FlowFixMe: at this point we know that moduleId is a number
    var moduleIdReallyIsNumber = moduleId;
    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedDefault !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedDefault;
    }
    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedDefault = exports && exports.__esModule ? exports.default : exports;

    // $FlowFixMe The metroRequire call above will throw if modules[id] is null
    return modules[moduleIdReallyIsNumber].importedDefault = importedDefault;
  }
  metroRequire.importDefault = metroImportDefault;
  function metroImportAll(moduleId) {
    if (__DEV__ && typeof moduleId === "string") {
      var verboseName = moduleId;
      moduleId = verboseNamesToModuleIds[verboseName];
    }

    //$FlowFixMe: at this point we know that moduleId is a number
    var moduleIdReallyIsNumber = moduleId;
    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedAll !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedAll;
    }
    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedAll;
    if (exports && exports.__esModule) {
      importedAll = exports;
    } else {
      importedAll = {};

      // Refrain from using Object.assign, it has to work in ES3 environments.
      if (exports) {
        for (var key in exports) {
          if (hasOwnProperty.call(exports, key)) {
            importedAll[key] = exports[key];
          }
        }
      }
      importedAll.default = exports;
    }

    // $FlowFixMe The metroRequire call above will throw if modules[id] is null
    return modules[moduleIdReallyIsNumber].importedAll = importedAll;
  }
  metroRequire.importAll = metroImportAll;

  // The `require.context()` syntax is never executed in the runtime because it is converted
  // to `require()` in `metro/src/ModuleGraph/worker/collectDependencies.js` after collecting
  // dependencies. If the feature flag is not enabled then the conversion never takes place and this error is thrown (development only).
  metroRequire.context = function fallbackRequireContext() {
    if (__DEV__) {
      throw new Error("The experimental Metro feature `require.context` is not enabled in your project.\nThis can be enabled by setting the `transformer.unstable_allowRequireContext` property to `true` in your Metro configuration.");
    }
    throw new Error("The experimental Metro feature `require.context` is not enabled in your project.");
  };

  // `require.resolveWeak()` is a compile-time primitive (see collectDependencies.js)
  metroRequire.resolveWeak = function fallbackRequireResolveWeak() {
    if (__DEV__) {
      throw new Error("require.resolveWeak cannot be called dynamically. Ensure you are using the same version of `metro` and `metro-runtime`.");
    }
    throw new Error("require.resolveWeak cannot be called dynamically.");
  };
  var inGuard = false;
  function guardedLoadModule(moduleId, module) {
    if (!inGuard && global.ErrorUtils) {
      inGuard = true;
      var returnValue;
      try {
        returnValue = loadModuleImplementation(moduleId, module);
      } catch (e) {
        // TODO: (moti) T48204692 Type this use of ErrorUtils.
        global.ErrorUtils.reportFatalError(e);
      }
      inGuard = false;
      return returnValue;
    } else {
      return loadModuleImplementation(moduleId, module);
    }
  }
  var ID_MASK_SHIFT = 16;
  var LOCAL_ID_MASK = ~0 >>> ID_MASK_SHIFT;
  function unpackModuleId(moduleId) {
    var segmentId = moduleId >>> ID_MASK_SHIFT;
    var localId = moduleId & LOCAL_ID_MASK;
    return {
      segmentId: segmentId,
      localId: localId
    };
  }
  metroRequire.unpackModuleId = unpackModuleId;
  function packModuleId(value) {
    return (value.segmentId << ID_MASK_SHIFT) + value.localId;
  }
  metroRequire.packModuleId = packModuleId;
  var moduleDefinersBySegmentID = [];
  var definingSegmentByModuleID = new Map();
  function registerSegment(segmentId, moduleDefiner, moduleIds) {
    moduleDefinersBySegmentID[segmentId] = moduleDefiner;
    if (__DEV__) {
      if (segmentId === 0 && moduleIds) {
        throw new Error("registerSegment: Expected moduleIds to be null for main segment");
      }
      if (segmentId !== 0 && !moduleIds) {
        throw new Error("registerSegment: Expected moduleIds to be passed for segment #" + segmentId);
      }
    }
    if (moduleIds) {
      moduleIds.forEach(function (moduleId) {
        if (!modules[moduleId] && !definingSegmentByModuleID.has(moduleId)) {
          definingSegmentByModuleID.set(moduleId, segmentId);
        }
      });
    }
  }
  function loadModuleImplementation(moduleId, module) {
    if (!module && moduleDefinersBySegmentID.length > 0) {
      var _definingSegmentByMod;
      var segmentId = (_definingSegmentByMod = definingSegmentByModuleID.get(moduleId)) != null ? _definingSegmentByMod : 0;
      var definer = moduleDefinersBySegmentID[segmentId];
      if (definer != null) {
        definer(moduleId);
        module = modules[moduleId];
        definingSegmentByModuleID.delete(moduleId);
      }
    }
    var nativeRequire = global.nativeRequire;
    if (!module && nativeRequire) {
      var _unpackModuleId = unpackModuleId(moduleId),
        _segmentId = _unpackModuleId.segmentId,
        localId = _unpackModuleId.localId;
      nativeRequire(localId, _segmentId);
      module = modules[moduleId];
    }
    if (!module) {
      throw unknownModuleError(moduleId);
    }
    if (module.hasError) {
      throw module.error;
    }
    if (__DEV__) {
      var Systrace = requireSystrace();
      var Refresh = requireRefresh();
    }

    // We must optimistically mark module as initialized before running the
    // factory to keep any require cycles inside the factory from causing an
    // infinite require loop.
    module.isInitialized = true;
    var _module = module,
      factory = _module.factory,
      dependencyMap = _module.dependencyMap;
    if (__DEV__) {
      initializingModuleIds.push(moduleId);
    }
    try {
      if (__DEV__) {
        // $FlowIgnore: we know that __DEV__ is const and `Systrace` exists
        Systrace.beginEvent("JS_require_" + (module.verboseName || moduleId));
      }
      var moduleObject = module.publicModule;
      if (__DEV__) {
        moduleObject.hot = module.hot;
        var prevRefreshReg = global.$RefreshReg$;
        var prevRefreshSig = global.$RefreshSig$;
        if (Refresh != null) {
          var RefreshRuntime = Refresh;
          global.$RefreshReg$ = function (type, id) {
            RefreshRuntime.register(type, moduleId + " " + id);
          };
          global.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
        }
      }
      moduleObject.id = moduleId;

      // keep args in sync with with defineModuleCode in
      // metro/src/Resolver/index.js
      // and metro/src/ModuleGraph/worker.js
      factory(global, metroRequire, metroImportDefault, metroImportAll, moduleObject, moduleObject.exports, dependencyMap);

      // avoid removing factory in DEV mode as it breaks HMR
      if (!__DEV__) {
        // $FlowFixMe: This is only sound because we never access `factory` again
        module.factory = undefined;
        module.dependencyMap = undefined;
      }
      if (__DEV__) {
        // $FlowIgnore: we know that __DEV__ is const and `Systrace` exists
        Systrace.endEvent();
        if (Refresh != null) {
          registerExportsForReactRefresh(Refresh, moduleObject.exports, moduleId);
        }
      }
      return moduleObject.exports;
    } catch (e) {
      module.hasError = true;
      module.error = e;
      module.isInitialized = false;
      module.publicModule.exports = undefined;
      throw e;
    } finally {
      if (__DEV__) {
        if (initializingModuleIds.pop() !== moduleId) {
          throw new Error("initializingModuleIds is corrupt; something is terribly wrong");
        }
        global.$RefreshReg$ = prevRefreshReg;
        global.$RefreshSig$ = prevRefreshSig;
      }
    }
  }
  function unknownModuleError(id) {
    var message = 'Requiring unknown module "' + id + '".';
    if (__DEV__) {
      message += " If you are sure the module exists, try restarting Metro. " + "You may also want to run `yarn` or `npm install`.";
    }
    return Error(message);
  }
  if (__DEV__) {
    // $FlowFixMe[prop-missing]
    metroRequire.Systrace = {
      beginEvent: function beginEvent() {},
      endEvent: function endEvent() {}
    };
    // $FlowFixMe[prop-missing]
    metroRequire.getModules = function () {
      return modules;
    };

    // HOT MODULE RELOADING
    var createHotReloadingObject = function createHotReloadingObject() {
      var hot = {
        _acceptCallback: null,
        _disposeCallback: null,
        _didAccept: false,
        accept: function accept(callback) {
          hot._didAccept = true;
          hot._acceptCallback = callback;
        },
        dispose: function dispose(callback) {
          hot._disposeCallback = callback;
        }
      };
      return hot;
    };
    var reactRefreshTimeout = null;
    var metroHotUpdateModule = function metroHotUpdateModule(id, factory, dependencyMap, inverseDependencies) {
      var mod = modules[id];
      if (!mod) {
        if (factory) {
          // New modules are going to be handled by the define() method.
          return;
        }
        throw unknownModuleError(id);
      }
      if (!mod.hasError && !mod.isInitialized) {
        // The module hasn't actually been executed yet,
        // so we can always safely replace it.
        mod.factory = factory;
        mod.dependencyMap = dependencyMap;
        return;
      }
      var Refresh = requireRefresh();
      var refreshBoundaryIDs = new Set();

      // In this loop, we will traverse the dependency tree upwards from the
      // changed module. Updates "bubble" up to the closest accepted parent.
      //
      // If we reach the module root and nothing along the way accepted the update,
      // we know hot reload is going to fail. In that case we return false.
      //
      // The main purpose of this loop is to figure out whether it's safe to apply
      // a hot update. It is only safe when the update was accepted somewhere
      // along the way upwards for each of its parent dependency module chains.
      //
      // We perform a topological sort because we may discover the same
      // module more than once in the list of things to re-execute, and
      // we want to execute modules before modules that depend on them.
      //
      // If we didn't have this check, we'd risk re-evaluating modules that
      // have side effects and lead to confusing and meaningless crashes.

      var didBailOut = false;
      var updatedModuleIDs;
      try {
        updatedModuleIDs = topologicalSort([id],
        // Start with the changed module and go upwards
        function (pendingID) {
          var pendingModule = modules[pendingID];
          if (pendingModule == null) {
            // Nothing to do.
            return [];
          }
          var pendingHot = pendingModule.hot;
          if (pendingHot == null) {
            throw new Error("[Refresh] Expected module.hot to always exist in DEV.");
          }
          // A module can be accepted manually from within itself.
          var canAccept = pendingHot._didAccept;
          if (!canAccept && Refresh != null) {
            // Or React Refresh may mark it accepted based on exports.
            var isBoundary = isReactRefreshBoundary(Refresh, pendingModule.publicModule.exports);
            if (isBoundary) {
              canAccept = true;
              refreshBoundaryIDs.add(pendingID);
            }
          }
          if (canAccept) {
            // Don't look at parents.
            return [];
          }
          // If we bubble through the roof, there is no way to do a hot update.
          // Bail out altogether. This is the failure case.
          var parentIDs = inverseDependencies[pendingID];
          if (parentIDs.length === 0) {
            // Reload the app because the hot reload can't succeed.
            // This should work both on web and React Native.
            performFullRefresh("No root boundary", {
              source: mod,
              failed: pendingModule
            });
            didBailOut = true;
            return [];
          }
          // This module can't handle the update but maybe all its parents can?
          // Put them all in the queue to run the same set of checks.
          return parentIDs;
        }, function () {
          return didBailOut;
        } // Should we stop?
        ).reverse();
      } catch (e) {
        if (e === CYCLE_DETECTED) {
          performFullRefresh("Dependency cycle", {
            source: mod
          });
          return;
        }
        throw e;
      }
      if (didBailOut) {
        return;
      }

      // If we reached here, it is likely that hot reload will be successful.
      // Run the actual factories.
      var seenModuleIDs = new Set();
      for (var i = 0; i < updatedModuleIDs.length; i++) {
        var updatedID = updatedModuleIDs[i];
        if (seenModuleIDs.has(updatedID)) {
          continue;
        }
        seenModuleIDs.add(updatedID);
        var updatedMod = modules[updatedID];
        if (updatedMod == null) {
          throw new Error("[Refresh] Expected to find the updated module.");
        }
        var prevExports = updatedMod.publicModule.exports;
        var didError = runUpdatedModule(updatedID, updatedID === id ? factory : undefined, updatedID === id ? dependencyMap : undefined);
        var nextExports = updatedMod.publicModule.exports;
        if (didError) {
          // The user was shown a redbox about module initialization.
          // There's nothing for us to do here until it's fixed.
          return;
        }
        if (refreshBoundaryIDs.has(updatedID)) {
          // Since we just executed the code for it, it's possible
          // that the new exports make it ineligible for being a boundary.
          var isNoLongerABoundary = !isReactRefreshBoundary(Refresh, nextExports);
          // It can also become ineligible if its exports are incompatible
          // with the previous exports.
          // For example, if you add/remove/change exports, we'll want
          // to re-execute the importing modules, and force those components
          // to re-render. Similarly, if you convert a class component
          // to a function, we want to invalidate the boundary.
          var didInvalidate = shouldInvalidateReactRefreshBoundary(Refresh, prevExports, nextExports);
          if (isNoLongerABoundary || didInvalidate) {
            // We'll be conservative. The only case in which we won't do a full
            // reload is if all parent modules are also refresh boundaries.
            // In that case we'll add them to the current queue.
            var parentIDs = inverseDependencies[updatedID];
            if (parentIDs.length === 0) {
              // Looks like we bubbled to the root. Can't recover from that.
              performFullRefresh(isNoLongerABoundary ? "No longer a boundary" : "Invalidated boundary", {
                source: mod,
                failed: updatedMod
              });
              return;
            }
            // Schedule all parent refresh boundaries to re-run in this loop.
            for (var j = 0; j < parentIDs.length; j++) {
              var parentID = parentIDs[j];
              var parentMod = modules[parentID];
              if (parentMod == null) {
                throw new Error("[Refresh] Expected to find parent module.");
              }
              var canAcceptParent = isReactRefreshBoundary(Refresh, parentMod.publicModule.exports);
              if (canAcceptParent) {
                // All parents will have to re-run too.
                refreshBoundaryIDs.add(parentID);
                updatedModuleIDs.push(parentID);
              } else {
                performFullRefresh("Invalidated boundary", {
                  source: mod,
                  failed: parentMod
                });
                return;
              }
            }
          }
        }
      }
      if (Refresh != null) {
        // Debounce a little in case there are multiple updates queued up.
        // This is also useful because __accept may be called multiple times.
        if (reactRefreshTimeout == null) {
          reactRefreshTimeout = setTimeout(function () {
            reactRefreshTimeout = null;
            // Update React components.
            Refresh.performReactRefresh();
          }, 30);
        }
      }
    };
    var topologicalSort = function topologicalSort(roots, getEdges, earlyStop) {
      var result = [];
      var visited = new Set();
      var stack = new Set();
      function traverseDependentNodes(node) {
        if (stack.has(node)) {
          throw CYCLE_DETECTED;
        }
        if (visited.has(node)) {
          return;
        }
        visited.add(node);
        stack.add(node);
        var dependentNodes = getEdges(node);
        if (earlyStop(node)) {
          stack.delete(node);
          return;
        }
        dependentNodes.forEach(function (dependent) {
          traverseDependentNodes(dependent);
        });
        stack.delete(node);
        result.push(node);
      }
      roots.forEach(function (root) {
        traverseDependentNodes(root);
      });
      return result;
    };
    var runUpdatedModule = function runUpdatedModule(id, factory, dependencyMap) {
      var mod = modules[id];
      if (mod == null) {
        throw new Error("[Refresh] Expected to find the module.");
      }
      var hot = mod.hot;
      if (!hot) {
        throw new Error("[Refresh] Expected module.hot to always exist in DEV.");
      }
      if (hot._disposeCallback) {
        try {
          hot._disposeCallback();
        } catch (error) {
          console.error(`Error while calling dispose handler for module ${id}: `, error);
        }
      }
      if (factory) {
        mod.factory = factory;
      }
      if (dependencyMap) {
        mod.dependencyMap = dependencyMap;
      }
      mod.hasError = false;
      mod.error = undefined;
      mod.importedAll = EMPTY;
      mod.importedDefault = EMPTY;
      mod.isInitialized = false;
      var prevExports = mod.publicModule.exports;
      mod.publicModule.exports = {};
      hot._didAccept = false;
      hot._acceptCallback = null;
      hot._disposeCallback = null;
      metroRequire(id);
      if (mod.hasError) {
        // This error has already been reported via a redbox.
        // We know it's likely a typo or some mistake that was just introduced.
        // Our goal now is to keep the rest of the application working so that by
        // the time user fixes the error, the app isn't completely destroyed
        // underneath the redbox. So we'll revert the module object to the last
        // successful export and stop propagating this update.
        mod.hasError = false;
        mod.isInitialized = true;
        mod.error = null;
        mod.publicModule.exports = prevExports;
        // We errored. Stop the update.
        return true;
      }
      if (hot._acceptCallback) {
        try {
          hot._acceptCallback();
        } catch (error) {
          console.error(`Error while calling accept handler for module ${id}: `, error);
        }
      }
      // No error.
      return false;
    };
    var performFullRefresh = function performFullRefresh(reason, modules) {
      /* global window */
      if (typeof window !== "undefined" && window.location != null && typeof window.location.reload === "function") {
        window.location.reload();
      } else {
        var Refresh = requireRefresh();
        if (Refresh != null) {
          var _modules$source$verbo, _modules$source, _modules$failed$verbo, _modules$failed;
          var sourceName = (_modules$source$verbo = (_modules$source = modules.source) == null ? void 0 : _modules$source.verboseName) != null ? _modules$source$verbo : "unknown";
          var failedName = (_modules$failed$verbo = (_modules$failed = modules.failed) == null ? void 0 : _modules$failed.verboseName) != null ? _modules$failed$verbo : "unknown";
          Refresh.performFullRefresh(`Fast Refresh - ${reason} <${sourceName}> <${failedName}>`);
        } else {
          console.warn("Could not reload the application after an edit.");
        }
      }
    };

    // Modules that only export components become React Refresh boundaries.
    var isReactRefreshBoundary = function isReactRefreshBoundary(Refresh, moduleExports) {
      if (Refresh.isLikelyComponentType(moduleExports)) {
        return true;
      }
      if (moduleExports == null || typeof moduleExports !== "object") {
        // Exit if we can't iterate over exports.
        return false;
      }
      var hasExports = false;
      var areAllExportsComponents = true;
      for (var key in moduleExports) {
        hasExports = true;
        if (key === "__esModule") {
          continue;
        }
        var desc = Object.getOwnPropertyDescriptor(moduleExports, key);
        if (desc && desc.get) {
          // Don't invoke getters as they may have side effects.
          return false;
        }
        var exportValue = moduleExports[key];
        if (!Refresh.isLikelyComponentType(exportValue)) {
          areAllExportsComponents = false;
        }
      }
      return hasExports && areAllExportsComponents;
    };
    var shouldInvalidateReactRefreshBoundary = function shouldInvalidateReactRefreshBoundary(Refresh, prevExports, nextExports) {
      var prevSignature = getRefreshBoundarySignature(Refresh, prevExports);
      var nextSignature = getRefreshBoundarySignature(Refresh, nextExports);
      if (prevSignature.length !== nextSignature.length) {
        return true;
      }
      for (var i = 0; i < nextSignature.length; i++) {
        if (prevSignature[i] !== nextSignature[i]) {
          return true;
        }
      }
      return false;
    };

    // When this signature changes, it's unsafe to stop at this refresh boundary.
    var getRefreshBoundarySignature = function getRefreshBoundarySignature(Refresh, moduleExports) {
      var signature = [];
      signature.push(Refresh.getFamilyByType(moduleExports));
      if (moduleExports == null || typeof moduleExports !== "object") {
        // Exit if we can't iterate over exports.
        // (This is important for legacy environments.)
        return signature;
      }
      for (var key in moduleExports) {
        if (key === "__esModule") {
          continue;
        }
        var desc = Object.getOwnPropertyDescriptor(moduleExports, key);
        if (desc && desc.get) {
          continue;
        }
        var exportValue = moduleExports[key];
        signature.push(key);
        signature.push(Refresh.getFamilyByType(exportValue));
      }
      return signature;
    };
    var registerExportsForReactRefresh = function registerExportsForReactRefresh(Refresh, moduleExports, moduleID) {
      Refresh.register(moduleExports, moduleID + " %exports%");
      if (moduleExports == null || typeof moduleExports !== "object") {
        // Exit if we can't iterate over exports.
        // (This is important for legacy environments.)
        return;
      }
      for (var key in moduleExports) {
        var desc = Object.getOwnPropertyDescriptor(moduleExports, key);
        if (desc && desc.get) {
          // Don't invoke getters as they may have side effects.
          continue;
        }
        var exportValue = moduleExports[key];
        var typeID = moduleID + " %exports% " + key;
        Refresh.register(exportValue, typeID);
      }
    };
    global.__accept = metroHotUpdateModule;
  }
  if (__DEV__) {
    // The metro require polyfill can not have module dependencies.
    // The Systrace and ReactRefresh dependencies are, therefore, made publicly
    // available. Ideally, the dependency would be inversed in a way that
    // Systrace / ReactRefresh could integrate into Metro rather than
    // having to make them publicly available.

    var requireSystrace = function requireSystrace() {
      return (
        // $FlowFixMe[prop-missing]
        global[__METRO_GLOBAL_PREFIX__ + "__SYSTRACE"] || metroRequire.Systrace
      );
    };
    var requireRefresh = function requireRefresh() {
      return (
        // $FlowFixMe[prop-missing]
        global[__METRO_GLOBAL_PREFIX__ + "__ReactRefresh"] || metroRequire.Refresh
      );
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @polyfill
   * @nolint
   * @format
   */

  /* eslint-disable no-shadow, eqeqeq, curly, no-unused-vars, no-void, no-control-regex  */

  /**
   * This pipes all of our console logging functions to native logging so that
   * JavaScript errors in required modules show up in Xcode via NSLog.
   */
  var inspect = function () {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    //
    // https://github.com/joyent/node/blob/master/lib/util.js

    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        formatValueCalls: 0,
        stylize: stylizeNoColor
      };
      return formatValue(ctx, obj, opts.depth);
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function (val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      ctx.formatValueCalls++;
      if (ctx.formatValueCalls > 200) {
        return `[TOO BIG formatValueCalls ${ctx.formatValueCalls} exceeded limit of 200]`;
      }

      // Primitive types cannot have properties
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }

      // Look up the keys of the object.
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);

      // IE doesn't make error fields non-enumerable
      // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }

      // Some type of object without properties can be shortcutted.
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = '',
        array = false,
        braces = ['{', '}'];

      // Make Array say that they are Array
      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }

      // Make functions say that they are functions
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }

      // Make RegExps say that they are RegExps
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }

      // Make dates with properties first say the date
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }

      // Make error with message first say the error
      if (isError(value)) {
        base = ' ' + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function (key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value)) return ctx.stylize('' + value, 'number');
      if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
      // For some reason typeof null is "object", so special case here.
      if (isNull(value)) return ctx.stylize('null', 'null');
    }
    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
      };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function (line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function (line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }
      return name + ': ' + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function (prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }
      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray(ar) {
      return Array.isArray(ar);
    }
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    function isNull(arg) {
      return arg === null;
    }
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    function isString(arg) {
      return typeof arg === 'string';
    }
    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }
    function isUndefined(arg) {
      return arg === void 0;
    }
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    function isError(e) {
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    return inspect;
  }();
  var OBJECT_COLUMN_NAME = '(index)';
  var LOG_LEVELS = {
    trace: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  var INSPECTOR_LEVELS = [];
  INSPECTOR_LEVELS[LOG_LEVELS.trace] = 'debug';
  INSPECTOR_LEVELS[LOG_LEVELS.info] = 'log';
  INSPECTOR_LEVELS[LOG_LEVELS.warn] = 'warning';
  INSPECTOR_LEVELS[LOG_LEVELS.error] = 'error';

  // Strip the inner function in getNativeLogFunction(), if in dev also
  // strip method printing to originalConsole.
  var INSPECTOR_FRAMES_TO_SKIP = __DEV__ ? 2 : 1;
  function getNativeLogFunction(level) {
    return function () {
      var str;
      if (arguments.length === 1 && typeof arguments[0] === 'string') {
        str = arguments[0];
      } else {
        str = Array.prototype.map.call(arguments, function (arg) {
          return inspect(arg, {
            depth: 10
          });
        }).join(', ');
      }

      // TRICKY
      // If more than one argument is provided, the code above collapses them all
      // into a single formatted string. This transform wraps string arguments in
      // single quotes (e.g. "foo" -> "'foo'") which then breaks the "Warning:"
      // check below. So it's important that we look at the first argument, rather
      // than the formatted argument string.
      var firstArg = arguments[0];
      var logLevel = level;
      if (typeof firstArg === 'string' && firstArg.slice(0, 9) === 'Warning: ' && logLevel >= LOG_LEVELS.error) {
        // React warnings use console.error so that a stack trace is shown,
        // but we don't (currently) want these to show a redbox
        // (Note: Logic duplicated in ExceptionsManager.js.)
        logLevel = LOG_LEVELS.warn;
      }
      if (global.__inspectorLog) {
        global.__inspectorLog(INSPECTOR_LEVELS[logLevel], str, [].slice.call(arguments), INSPECTOR_FRAMES_TO_SKIP);
      }
      if (groupStack.length) {
        str = groupFormat('', str);
      }
      global.nativeLoggingHook(str, logLevel);
    };
  }
  function repeat(element, n) {
    return Array.apply(null, Array(n)).map(function () {
      return element;
    });
  }
  function consoleTablePolyfill(rows) {
    // convert object -> array
    if (!Array.isArray(rows)) {
      var data = rows;
      rows = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var row = data[key];
          row[OBJECT_COLUMN_NAME] = key;
          rows.push(row);
        }
      }
    }
    if (rows.length === 0) {
      global.nativeLoggingHook('', LOG_LEVELS.info);
      return;
    }
    var columns = Object.keys(rows[0]).sort();
    var stringRows = [];
    var columnWidths = [];

    // Convert each cell to a string. Also
    // figure out max cell width for each column
    columns.forEach(function (k, i) {
      columnWidths[i] = k.length;
      for (var j = 0; j < rows.length; j++) {
        var cellStr = (rows[j][k] || '?').toString();
        stringRows[j] = stringRows[j] || [];
        stringRows[j][i] = cellStr;
        columnWidths[i] = Math.max(columnWidths[i], cellStr.length);
      }
    });

    // Join all elements in the row into a single string with | separators
    // (appends extra spaces to each cell to make separators  | aligned)
    function joinRow(row, space) {
      var cells = row.map(function (cell, i) {
        var extraSpaces = repeat(' ', columnWidths[i] - cell.length).join('');
        return cell + extraSpaces;
      });
      space = space || ' ';
      return cells.join(space + '|' + space);
    }
    var separators = columnWidths.map(function (columnWidth) {
      return repeat('-', columnWidth).join('');
    });
    var separatorRow = joinRow(separators, '-');
    var header = joinRow(columns);
    var table = [header, separatorRow];
    for (var i = 0; i < rows.length; i++) {
      table.push(joinRow(stringRows[i]));
    }

    // Notice extra empty line at the beginning.
    // Native logging hook adds "RCTLog >" at the front of every
    // logged string, which would shift the header and screw up
    // the table
    global.nativeLoggingHook('\n' + table.join('\n'), LOG_LEVELS.info);
  }
  var GROUP_PAD = "\u2502"; // Box light vertical
  var GROUP_OPEN = "\u2510"; // Box light down+left
  var GROUP_CLOSE = "\u2518"; // Box light up+left

  var groupStack = [];
  function groupFormat(prefix, msg) {
    // Insert group formatting before the console message
    return groupStack.join('') + prefix + ' ' + (msg || '');
  }
  function consoleGroupPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_OPEN, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupCollapsedPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupEndPolyfill() {
    groupStack.pop();
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE), LOG_LEVELS.info);
  }
  function consoleAssertPolyfill(expression, label) {
    if (!expression) {
      global.nativeLoggingHook('Assertion failed: ' + label, LOG_LEVELS.error);
    }
  }
  if (global.nativeLoggingHook) {
    var originalConsole = global.console;
    // Preserve the original `console` as `originalConsole`
    if (__DEV__ && originalConsole) {
      var descriptor = Object.getOwnPropertyDescriptor(global, 'console');
      if (descriptor) {
        Object.defineProperty(global, 'originalConsole', descriptor);
      }
    }
    global.console = {
      error: getNativeLogFunction(LOG_LEVELS.error),
      info: getNativeLogFunction(LOG_LEVELS.info),
      log: getNativeLogFunction(LOG_LEVELS.info),
      warn: getNativeLogFunction(LOG_LEVELS.warn),
      trace: getNativeLogFunction(LOG_LEVELS.trace),
      debug: getNativeLogFunction(LOG_LEVELS.trace),
      table: consoleTablePolyfill,
      group: consoleGroupPolyfill,
      groupEnd: consoleGroupEndPolyfill,
      groupCollapsed: consoleGroupCollapsedPolyfill,
      assert: consoleAssertPolyfill
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });

    // If available, also call the original `console` method since that is
    // sometimes useful. Ex: on OS X, this will let you see rich output in
    // the Safari Web Inspector console.
    if (__DEV__ && originalConsole) {
      Object.keys(console).forEach(function (methodName) {
        var reactNativeMethod = console[methodName];
        if (originalConsole[methodName]) {
          console[methodName] = function () {
            originalConsole[methodName].apply(originalConsole, arguments);
            reactNativeMethod.apply(console, arguments);
          };
        }
      });

      // The following methods are not supported by this polyfill but
      // we still should pass them to original console if they are
      // supported by it.
      ['clear', 'dir', 'dirxml', 'profile', 'profileEnd'].forEach(function (methodName) {
        if (typeof originalConsole[methodName] === 'function') {
          console[methodName] = function () {
            originalConsole[methodName].apply(originalConsole, arguments);
          };
        }
      });
    }
  } else if (!global.console) {
    var stub = function stub() {};
    var log = global.print || stub;
    global.console = {
      debug: log,
      error: log,
      info: log,
      log: log,
      trace: log,
      warn: log,
      assert: function assert(expression, label) {
        if (!expression) {
          log('Assertion failed: ' + label);
        }
      },
      clear: stub,
      dir: stub,
      dirxml: stub,
      group: stub,
      groupCollapsed: stub,
      groupEnd: stub,
      profile: stub,
      profileEnd: stub,
      table: stub
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @format
   * 
   * @polyfill
   */

  var _inGuard = 0;
  /**
   * This is the error handler that is called when we encounter an exception
   * when loading a module. This will report any errors encountered before
   * ExceptionsManager is configured.
   */
  var _globalHandler = function onError(e, isFatal) {
    throw e;
  };

  /**
   * The particular require runtime that we are using looks for a global
   * `ErrorUtils` object and if it exists, then it requires modules with the
   * error handler specified via ErrorUtils.setGlobalHandler by calling the
   * require function with applyWithGuard. Since the require module is loaded
   * before any of the modules, this ErrorUtils must be defined (and the handler
   * set) globally before requiring anything.
   */
  var ErrorUtils = {
    setGlobalHandler: function setGlobalHandler(fun) {
      _globalHandler = fun;
    },
    getGlobalHandler: function getGlobalHandler() {
      return _globalHandler;
    },
    reportError: function reportError(error) {
      _globalHandler && _globalHandler(error, false);
    },
    reportFatalError: function reportFatalError(error) {
      // NOTE: This has an untyped call site in Metro.
      _globalHandler && _globalHandler(error, true);
    },
    applyWithGuard: function applyWithGuard(fun, context, args,
    // Unused, but some code synced from www sets it to null.
    unused_onError,
    // Some callers pass a name here, which we ignore.
    unused_name) {
      try {
        _inGuard++;
        /* $FlowFixMe[incompatible-call] : TODO T48204745 (1) apply(context,
         * null) is fine. (2) array -> rest array should work */
        /* $FlowFixMe[incompatible-type] : TODO T48204745 (1) apply(context,
         * null) is fine. (2) array -> rest array should work */
        return fun.apply(context, args);
      } catch (e) {
        ErrorUtils.reportError(e);
      } finally {
        _inGuard--;
      }
      return null;
    },
    applyWithGuardIfNeeded: function applyWithGuardIfNeeded(fun, context, args) {
      if (ErrorUtils.inGuard()) {
        /* $FlowFixMe[incompatible-call] : TODO T48204745 (1) apply(context,
         * null) is fine. (2) array -> rest array should work */
        /* $FlowFixMe[incompatible-type] : TODO T48204745 (1) apply(context,
         * null) is fine. (2) array -> rest array should work */
        return fun.apply(context, args);
      } else {
        ErrorUtils.applyWithGuard(fun, context, args);
      }
      return null;
    },
    inGuard: function inGuard() {
      return !!_inGuard;
    },
    guard: function guard(fun, name, context) {
      var _ref;
      // TODO: (moti) T48204753 Make sure this warning is never hit and remove it - types
      // should be sufficient.
      if (typeof fun !== 'function') {
        console.warn('A function must be passed to ErrorUtils.guard, got ', fun);
        return null;
      }
      var guardName = (_ref = name != null ? name : fun.name) != null ? _ref : '<generated guard>';
      /* $FlowFixMe[missing-this-annot] The 'this' type annotation(s) required by
       * Flow's LTI update could not be added via codemod */
      function guarded() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return ErrorUtils.applyWithGuard(fun, context != null ? context : this, args, null, guardName);
      }
      return guarded;
    }
  };
  global.ErrorUtils = ErrorUtils;
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @format
   * @polyfill
   * @nolint
   */

  (function () {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Returns an array of the given object's own enumerable entries.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
     */
    if (typeof Object.entries !== 'function') {
      Object.entries = function (object) {
        // `null` and `undefined` values are not allowed.
        if (object == null) {
          throw new TypeError('Object.entries called on non-object');
        }
        var entries = [];
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            entries.push([key, object[key]]);
          }
        }
        return entries;
      };
    }

    /**
     * Returns an array of the given object's own enumerable entries.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     */
    if (typeof Object.values !== 'function') {
      Object.values = function (object) {
        // `null` and `undefined` values are not allowed.
        if (object == null) {
          throw new TypeError('Object.values called on non-object');
        }
        var values = [];
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            values.push(object[key]);
          }
        }
        return values;
      };
    }
  })();
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {},0,[],"index.js");
__r(0);