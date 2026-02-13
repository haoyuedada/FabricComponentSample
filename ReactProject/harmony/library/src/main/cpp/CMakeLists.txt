# Copyright (c) 2024 Huawei Technologies Co., Ltd.
#
# This source code is licensed under the MIT license found in the
# LICENSE-MIT file in the root directory of this source tree.

project(rnapp)
cmake_minimum_required(VERSION 3.4.1)
set(CMAKE_SKIP_BUILD_RPATH TRUE)
set(RNOH_APP_DIR "${CMAKE_CURRENT_SOURCE_DIR}")
set(NODE_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../../../node_modules")
set(RNOH_CPP_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules/@rnoh/react-native-openharmony/src/main/cpp")
set(RNOH_GENERATED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/generated")
set(LOG_VERBOSITY_LEVEL 1)
set(CMAKE_ASM_FLAGS "-Wno-error=unused-command-line-argument -Qunused-arguments")
#set(CMAKE_CXX_FLAGS "-fstack-protector-strong -Wl,-z,relro,-z,now,-z,noexecstack -fPIE -pie")
set(WITH_HITRACE_SYSTRACE 1) # for other CMakeLists.txt files to use
set(OH_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
set(USE_HERMES 0)
add_compile_definitions(WITH_HITRACE_SYSTRACE)

add_subdirectory("${RNOH_CPP_DIR}" ./rn)

add_compile_definitions(USE_HERMES=${USE_HERMES})
# RNOH_BEGIN: manual_package_linking_1
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/rnc" ./fabric_component)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-fast-image/src/main/cpp" ./fast-image)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-gesture-handler/src/main/cpp" ./gesture-handler)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-safe-area-context/src/main/cpp" ./safe-area)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-view-shot/src/main/cpp" ./view-shot)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-svg/src/main/cpp" ./svg)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/lottie-react-native/src/main/cpp" ./lottie)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-pager-view/src/main/cpp" ./pager_view)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-video/src/main/cpp" ./video)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-webview/src/main/cpp" ./webview)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-reanimated/src/main/cpp" ./reanimated)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-skia/src/main/cpp" ./skia)
add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/netinfo/src/main/cpp" ./netinfo)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-keyboard-controller/src/main/cpp" ./keyboard-controller)
add_subdirectory("${OH_MODULES}/@react-native-ohos/flash-list/src/main/cpp" ./flash-list)
# RNOH_END: manual_package_linking_1

file(GLOB GENERATED_CPP_FILES "./generated/*.cpp")

add_library(rnoh_app SHARED
    ${GENERATED_CPP_FILES}
    "./PackageProvider.cpp"
    "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
)

target_link_libraries(rnoh_app PUBLIC rnoh)

# RNOH_BEGIN: manual_package_linking_2
target_link_libraries(rnoh_app PUBLIC fabric_component)
target_link_libraries(rnoh_app PUBLIC rnoh_fast_image)
target_link_libraries(rnoh_app PUBLIC rnoh_gesture_handler)
target_link_libraries(rnoh_app PUBLIC rnoh_safe_area)
target_link_libraries(rnoh_app PUBLIC rnoh_view_shot)
target_link_libraries(rnoh_app PUBLIC rnoh_svg)
target_link_libraries(rnoh_app PUBLIC rnoh_lottie)
target_link_libraries(rnoh_app PUBLIC rnoh_pager_view)
target_link_libraries(rnoh_app PUBLIC rnoh_video)
target_link_libraries(rnoh_app PUBLIC rnoh_webview)
target_link_libraries(rnoh_app PUBLIC rnoh_reanimated)
target_link_libraries(rnoh_app PUBLIC rnoh_skia)
target_link_libraries(rnoh_app PUBLIC rnoh_netinfo)
target_link_libraries(rnoh_app PUBLIC rnoh_keyboard_controller)
target_link_libraries(rnoh_app PUBLIC rnoh_flash_list)
# RNOH_END: manual_package_linking_2
