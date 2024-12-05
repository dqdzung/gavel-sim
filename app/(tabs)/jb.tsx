import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "native-base";
import GifSection from "@/components/GifSection";
import Ordah from "@/components/Ordah";

const JohnBercowScreen = () => {
	const [init, setInit] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setInit(true);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<View style={styles.container}>
			{init && <GifSection />}

			{isPlaying && (
				<Ordah
					onFinish={() => {
						setIsPlaying(false);
						!init &&
							setTimeout(() => {
								setInit(true);
							}, 1500);
					}}
				/>
			)}

			<Button
				style={styles.button}
				size="md"
				colorScheme="secondary"
				onPress={() => {
					setInit(false);
					setIsPlaying(true);
				}}
				// disabled={isPlaying || !init}
			>
				<Text fontSize={"lg"} color={"white"}>
					ORDAHHHHH!
				</Text>
			</Button>
		</View>
	);
};

export default JohnBercowScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: 150,
		height: 50,
	},
});
