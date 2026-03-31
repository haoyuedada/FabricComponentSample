# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is **FabricComponentSample** - a demonstration project for creating custom Fabric components (CAPI and ArkTS) for React Native OpenHarmony applications. The repository contains multiple parallel React Native project versions showcasing custom Fabric components and TurboModules integration with OpenHarmony OS.

## Project Structure

- `ReactProject/` - React Native 0.72 project
- `ReactProject77/` - React Native 0.77 project (maintained version)
- `ReactProject82/` - React Native 0.82 project (latest version)
- `fabric-component-sample-package/` - Reusable custom Fabric component library (npm package)
- `Turbo-module/` - Custom TurboModule implementation
- `patch/` - Patch files for external dependencies
- `screenshots/` - Project screenshots

Each ReactProject directory contains:
- `harmony/` - OpenHarmony native project with ArkTS/C++ code
- `src/` - JavaScript/TypeScript React Native source
- Standard React Native config files (metro.config.js, babel.config.js, etc.)

## Common Commands

### Install Dependencies
```bash
npm install
```

### Start Metro Bundler
```bash
# All projects
npm run start
```

### Code Generation (generate bridge code)
```bash
npm run codegen
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

### Bundling (ReactProject/ReactProject77)
```bash
npm run bundle:dev          # Development bundle
npm run bundle:prod          # Production bundle
npm run listen               # Forward port 8081 with hdc
```

### Bundling (ReactProject82)
```bash
npm run dev                  # Development bundle (codegen + bundle)
```

### Building Custom Packages
When modifying `fabric-component-sample-package` or `Turbo-module`:
```bash
cd fabric-component-sample-package
npm pack                     # Creates .tgz for consumption
```

## Architecture

- **Custom Fabric Components**: Defined in `fabric-component-sample-package/src/` with specs in `specs/v1/` and `specs/v2/` supporting both C++ (CAPI) and ArkTS implementations
- **TurboModule**: Custom native modules in `Turbo-module/` providing JavaScript to native communication
- **OpenHarmony Integration**: Each React Native project has a `harmony/` directory with:
  - `entry/` - Main entry ability with ArkTS pages
  - `library/` - Shared library with generated C++/ArkTS code
- **Codegen**: React Native OpenHarmony bridge code generation from component specs
- **Patch System**: Custom patches for third-party dependencies in `patch/`

## Key Notes

- This project demonstrates React Native integration with OpenHarmony OS - use DevEco Studio for native OpenHarmony development
- The custom Fabric component package is consumed as a local `.tgz` file dependency after `npm pack`
- Port forwarding is required for development: `hdc rport tcp:8081 tcp:8081`
- Three parallel React Native versions are maintained (0.72, 0.77, 0.82)
