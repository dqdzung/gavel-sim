import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "blue",
				tabBarLabelPosition: "beside-icon",
				unmountOnBlur: true,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Ace Attorney",
					tabBarIcon: () => null,
				}}
			/>
			<Tabs.Screen
				name="jb"
				options={{
					title: "John Bercow",
					tabBarIcon: () => null,
				}}
			/>
		</Tabs>
	);
}
