import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "native-base";
import { Image as GifImage } from "expo-image";
import { Sound } from "expo-av/build/Audio";
import { Audio } from "expo-av";
import TIMINGS from "@/constants/Timings";
import LINKS from "@/constants/URLs";

const GifSection = () => {
	const [gallerySound, setGallerySound] = useState<Sound>();

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("@/assets/gallery-sfx.wav")
		);
		sound?.setIsLoopingAsync(true);
		sound?.playAsync();
		setGallerySound(sound);
	};

	useEffect(() => {
		playSound();
	}, []);

	useEffect(() => {
		return gallerySound
			? () => {
					gallerySound.unloadAsync();
			  }
			: undefined;
	}, [gallerySound]);

	return (
		<View style={styles.gifWrapper}>
			<GifImage
				source={LINKS.PW_GIF}
				style={styles.image}
				transition={TIMINGS.IMAGE_TRANSITION}
			/>
			<GifImage
				source={LINKS.ME_GIF}
				style={styles.image}
				transition={TIMINGS.IMAGE_TRANSITION}
			/>
		</View>
	);
};

export default GifSection;

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1.65,
		flex: 1,
	},
	gifWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		position: "absolute",
		width: "100%",
		top: 170,
	},
});
