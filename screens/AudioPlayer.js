import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const AudioPlayer = () => {

    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState(null);

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../assets/let-not.mp3'));
        setSound(sound);

        // track progress
        sound.setOnPlaybackStatusUpdate((status) => {
            setPosition(status.positionMillis);
        });

        console.log('Playing Sound');
        await sound.playAsync();
        setIsPlaying(true);
        const Status = await sound.getStatusAsync();
        setDuration(Status.durationMillis);
        setPosition(Status.positionMillis);
    }

    async function pauseSound() {
        console.log('pausing sound');
        await sound.pauseAsync();
        setIsPlaying(false);
    }

    const onPlayPausePress = () => {
        if (isPlaying) {
            pauseSound();
        } else {
            playSound();
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const getProgress = () => {
        if (sound === null || duration === null || position === null) {
            return 0;
        }
        return (position / duration) * 100;
    }

    const myProgress = getProgress();

    return (
        <View>
            <View style={styles.player}>

                <View style={[styles.progress, { width: `${getProgress()}%` }]} />
                <View style={styles.row}>
                    <View style={styles.iconsContainer}>
                        <Text style={styles.description}>Duration: {duration} </Text>
                        <TouchableOpacity>
                            <FontAwesome name={isPlaying ? 'pause' : 'play'} onPress={onPlayPausePress} size={30} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.slidercontainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="tomato"
                    maximumTrackTintColor="lightgrey"
                    value={myProgress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    player: {
        backgroundColor: 'tomato',
        width: '100%',
        height: 120,
        marginTop: 60,
    },
    progress: {
        height: 10,
        backgroundColor: '#bcbcbc'
    },
    description: {
        color: 'white',
        fontWeight: 'bold'
    },
    row: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slidercontainer: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    slider: {
        width: 300,
        height: 40,
        marginTop: 40,
    },
})

export default AudioPlayer;