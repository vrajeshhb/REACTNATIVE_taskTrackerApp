import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export const Timing = ({onChangeTime}) => {
  return (
    <View style={styles.minsButtonsContainer}>
      {/* <Text>Timing</Text> */}
      <TouchableOpacity
        onPress={() => onChangeTime(10)}
        style={styles.minsButtons}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          10
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChangeTime(15)}
        style={styles.minsButtons}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          15
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChangeTime(20)}
        style={styles.minsButtons}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          20
        </Text>
      </TouchableOpacity>
      {/* <Text>hello im the timing comp</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  minsButtonsContainer: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
  },
  minsButtons: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderTopLeftRadius: 50,
    borderTopEndRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomEndRadius: 50,
    //   borderRadius: size,
    widht: 50,
    height: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
});
