import { StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "native-base";
import PlusOne from "@/components/PlusOne";
import GifSection from "@/components/GifSection";
import Gavel from "@/components/Gavel";
import TIMINGS from "@/constants/Timings";
import utils from "@/utils";
import { Sound } from "expo-av/build/Audio";
import { Audio } from "expo-av";

const AceAttorneyScreen = () => {
	const [arr, setArr] = useState<string[]>([]);
	const [_, setTimer] = useState<number>(TIMINGS.TIMER_COUNT);
	const [init, setInit] = useState(false);
	const [gavelSound, setGavelSound] = useState<Sound>();

	const isArguing = useMemo(() => init && arr.length === 0, [arr, init]);

	const playSound = async () => {
		if (!gavelSound) {
			const { sound } = await Audio.Sound.createAsync(
				require("@/assets/gavel-sfx.wav")
			);
			sound?.playAsync();
			setGavelSound(sound);
		} else gavelSound.replayAsync();
	};

	const handleFinish = () => {
		playSound();
		setArr((prev) => [...prev, utils.uuid()]);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setInit(true);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (!arr.length) return;
		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev === 0) {
					setArr([]);
					return TIMINGS.TIMER_COUNT;
				} else {
					return prev - 1;
				}
			});
		}, 1000); //each count lasts for a second
		return () => clearInterval(interval); //cleanup the interval on complete
	}, [arr]);

	useEffect(() => {
		return gavelSound
			? () => {
					gavelSound.unloadAsync();
			  }
			: undefined;
	}, [gavelSound]);

	return (
		<View style={styles.container}>
			{arr.map((uuid) => (
				<PlusOne key={uuid} />
			))}

			{isArguing && <GifSection />}

			<Gavel onFinish={handleFinish} />
		</View>
	);
};

export default AceAttorneyScreen;

const styles = StyleSheet.create({
	container: {
		// borderColor: 'red',
		// borderWidth: 1,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
