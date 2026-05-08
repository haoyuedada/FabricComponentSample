import Animated, { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { useEffect } from "react"

export default function PageA() {
  const x = useSharedValue(0)
  useEffect(() => {
    x.value = withRepeat(withTiming(100, { duration: 16 }), -1, true)
  }, [])
  return <Animated.View style={{ transform: [{ translateX: x }] }} />
}