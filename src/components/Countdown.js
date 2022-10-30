import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fontSize} from '../utils/sizes';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import {Timing} from '../features/timer/Timing.js';

const minutesToMillis = min => min * 1000 * 60;
const formatTime = time => (time < 10 ? `0${time}` : time);
//setInterval()

export const Countdown = ({minutes, isPaused, onEnd}) => {
  const interval = React.useRef(null);

  const countDown = () => {
    setmillis(time => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;

      onProgress(timeLeft / minutesToMillis(minutes)); //send progress
      return timeLeft;
    });
  };
  const onProgress = progress => {
    setProgress(progress);
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setmillis(minutesToMillis(minutes));
    setProgress(1);
  }, [minutes]);

  const [millis, setmillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const secondes = Math.floor(millis / 1000) % 60;
  const [progress, setProgress] = useState(1);

  return (
    <>
      <Text style={styles.text}>
        {formatTime(minute)} : {formatTime(secondes)}
      </Text>
      <ProgressBar progress={progress} color={MD3Colors.error50} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: '#fff',
    padding: 24,
    backgroundColor: 'rgba(94,132,226,0.3)',
    textAlign: 'center',
  },
});
