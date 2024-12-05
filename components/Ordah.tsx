import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "native-base";
import { Image as GifImage } from "expo-image";
import { Sound } from "expo-av/build/Audio";
import { Audio } from "expo-av";
import TIMINGS from "@/constants/Timings";
import LINKS from "@/constants/URLs";

const Ordah = ({ onFinish }: { onFinish?: () => void }) => {
	const [voice, setVoice] = useState<Sound>();

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("@/assets/ordah-sfx.mp3")
		);
		await sound?.playAsync();
		setVoice(sound);
	};

	useEffect(() => {
		playSound();
		const timeout = setTimeout(() => {
			onFinish?.();
		}, 1600);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		return voice
			? () => {
					voice.unloadAsync();
			  }
			: undefined;
	}, [voice]);

	return (
		<View style={styles.gifWrapper}>
			<GifImage
				source={LINKS.ORDAH_GIF}
				style={styles.image}
				transition={TIMINGS.IMAGE_TRANSITION}
			/>
		</View>
	);
};

export default Ordah;

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1.65,
		flex: 1,
	},
	gifWrapper: {
		position: "absolute",
		width: "100%",
		top: 100,
	},
});
