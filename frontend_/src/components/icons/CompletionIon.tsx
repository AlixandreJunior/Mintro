import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface CompletionIconProps {
  size?: number;
  checkmarkColor?: string;
  circleFill?: string;
  circleStroke?: string;
  circleStrokeWidth?: number;
}

const CompletionIcon: React.FC<CompletionIconProps> = ({
  size = 26,
  checkmarkColor = '#8C8D8F',
  circleFill = 'white',
  circleStroke = '#E5E7EB',
  circleStrokeWidth = 1.5,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Circle
        cx={13}
        cy={13}
        r={12.25}
        fill={circleFill}
        stroke={circleStroke}
        strokeWidth={circleStrokeWidth}
      />
      <Path
        d="M10.4343 18.6971L5.2343 13.4971C4.9219 13.1847 4.9219 12.6781 5.2343 12.3657L6.36565 11.2343C6.67806 10.9219 7.18462 10.9219 7.49703 11.2343L11 14.7372L18.503 7.2343C18.8154 6.9219 19.3219 6.9219 19.6344 7.2343L20.7657 8.36568C21.0781 8.67809 21.0781 9.18462 20.7657 9.49706L11.5657 18.6971C11.2532 19.0095 10.7467 19.0095 10.4343 18.6971Z"
        fill={checkmarkColor}
      />
    </Svg>
  );
};

export default CompletionIcon;
