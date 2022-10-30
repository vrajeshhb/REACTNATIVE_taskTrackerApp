import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text
        style={[
          {
            fontSize: 37,
            // alignItem: 'center',
            // justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
          },
          textStyle,
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = size =>
  StyleSheet.create({
    radius: {
      borderTopLeftRadius: size,
      borderTopEndRadius: size,
      borderBottomLeftRadius: size,
      borderBottomEndRadius: size,
      borderRadius: size,
      widht: size,
      height: size,
      borderColor: '#fff',
      borderWidth: 2,
    },
  });
