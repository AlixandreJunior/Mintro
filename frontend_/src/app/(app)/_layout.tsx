import { View } from "react-native"
import { Slot} from "expo-router"
import Header from "@/components/layout/Header"

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Header/>
      <Slot/>
    </View>
  )
}
