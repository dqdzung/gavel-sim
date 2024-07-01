import { Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Sound } from "expo-av/build/Audio";
import { Audio } from "expo-av";
import TIMINGS from "@/constants/Timings";

const PlusOne = () => {
	const animatedValue = useRef(
		new Animated.Value(TIMINGS.PLUS_ONE_START_POS)
	).current;
	const [appeared, setAppear] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(TIMINGS.HIDE));
	const [gavelSound, setGavelSound] = useState<Sound>();

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("@/assets/gavel-sfx.wav")
		);
		sound?.playAsync();
		setGavelSound(sound);
	};

	const moveUp = () => {
		Animated.timing(animatedValue, {
			toValue: TIMINGS.PLUS_ONE_FINISH_POS,
			duration: TIMINGS.PLUS_ONE_DURATION,
			useNativeDriver: false,
		}).start(fadeOut);
	};

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: TIMINGS.SHOW,
			duration: TIMINGS.PLUS_ONE_DURATION,
			useNativeDriver: false,
		}).start();
	};

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			delay: TIMINGS.PLUS_ONE_FADE_DELAY,
			toValue: TIMINGS.HIDE,
			duration: TIMINGS.PLUS_ONE_DURATION,
			useNativeDriver: false,
		}).start(() => setAppear(true));
	};

	const init = () => {
		moveUp();
		fadeIn();
		playSound();
	};

	useEffect(() => init(), []);
	useEffect(() => {
		return gavelSound
			? () => {
					gavelSound.unloadAsync();
			  }
			: undefined;
	}, [gavelSound]);

	if (appeared) return null;

	return (
		<Animated.View
			style={{
				...styles.animationWrapper,
				opacity: appeared ? TIMINGS.HIDE : fadeAnim,
			}}
		>
			<Animated.Text
				style={{
					...styles.text,
					transform: [{ translateY: animatedValue }],
				}}
			>
				+1
			</Animated.Text>
		</Animated.View>
	);
};

export default PlusOne;

const styles = StyleSheet.create({
	animationWrapper: {
		position: "absolute",
	},
	text: {
		color: "#00D100",
		fontSize: 35,
		fontWeight: "bold",
	},
});
