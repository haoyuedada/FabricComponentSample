// Intentionally invalid native code for comparing OHOS ASan and ordinary
// cppcrash reports. Compiled only when -DASAN_CRASH_DEMO=ON is supplied.

namespace {

__attribute__((noinline)) void triggerUseAfterFreeThenSegv() {
  char *allocation = new char[32];
  volatile char *dangling = allocation;
  delete[] allocation;

  // ASan stops here and reports heap-use-after-free, including allocation and
  // free stacks. Without ASan this is undefined behaviour and normally passes.
  dangling[0] = 0x42;

  // Make the non-ASan run deterministic: it reaches this native SIGSEGV after
  // missing the UAF. ASan never reaches this statement.
  volatile int *nullPointer = nullptr;
  *nullPointer = 1;
}

} // namespace

extern "C" __attribute__((constructor)) void runAsanCrashDemoOnLibraryLoad() {
  triggerUseAfterFreeThenSegv();
}
