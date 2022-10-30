import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Countdown} from '../../components/Countdown';
import {fontSize} from '../../utils/sizes';
import {Timing} from './Timing.js';
const DEFAULT_TIME = 1;
export const Timer = ({focusSubject, onTimerEnd, onStopTask}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(0.2);

  const ChangeTime = min => {
    setMinutes(min);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === `ios`) {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    //setMinutes(DEFAULT_TIME);
    //setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown isPaused={!isStarted} minutes={minutes} onEnd={onEnd} />
        <Timing onChangeTime={ChangeTime} />
      </View>
      <View style={{padding: 24}}>
        <Text style={styles.title}>TASK </Text>
        <Text style={styles.task}> {focusSubject}</Text>
        {/* <Text style={styles.task}> {isStarted}</Text> */}
      </View>

      <View>
        {isStarted ? (
          <TouchableOpacity
            style={[styles.timeControlButton, {marginTop: fontSize.md}]}
            size={50}
            onPress={() => {
              setIsStarted(false);
            }}>
            <Text style={styles.timeControlButtonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.timeControlButton}
            onPress={() => {
              setIsStarted('true');
            }}>
            <Text style={styles.timeControlButtonText}>Start</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.timeControlButtonClear}
          onPress={() => {
            onStopTask();
          }}>
          <Text style={styles.timeControlButtonTextClear}>CLEAR </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  task: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize.xl,
  },
  title: {
    color: '#9ff',
    textAlign: 'center',
    fontSize: fontSize.lg,
  },
  countdown: {
    flex: 0.5,
    alignItem: 'center',
    justifyContent: 'center',
  },
  timeControlButton: {
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomEndRadius: 40,
    //  borderRadius: size,
    widht: 100,
    height: 50,
    borderColor: '#fff',
    borderWidth: 2,
  },
  timeControlButtonText: {
    textAlign: 'center',
    alignItem: 'center',
    fontSize: fontSize.lg,
    padding: fontSize.sm,
    color: '#fff',
  },
  timeControlButtonClear: {
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomEndRadius: 40,
    //  borderRadius: size,
    widht: 100,
    height: 50,
    borderColor: '#ff0',
    borderWidth: 2,
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeControlButtonTextClear: {
    textAlign: 'center',
    alignItem: 'center',
    fontSize: fontSize.lg,
    padding: fontSize.sm,
    color: '#ff0',
  },
});
