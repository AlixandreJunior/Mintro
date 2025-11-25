import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  progress: number | string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

const ProgressCircle: React.FC<Props> = ({
  progress,
  size = 100,
  strokeWidth = 10,
  color = '#4A90E2',
  backgroundColor = '#E6EAF2',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference * (1 - Number(progress));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Fundo */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progresso */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
};

export default ProgressCircle;
