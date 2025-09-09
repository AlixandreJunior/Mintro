import React from 'react';

import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';



interface BaseCardProps {

  children: React.ReactNode;

  style?: StyleProp<ViewStyle>;

}



const BaseCard: React.FC<BaseCardProps> = ({ children, style }) => {

  return <View style={[styles.card, style]}>{children}</View>;

};



const styles = StyleSheet.create({

  card: {

    flex: 1,

    backgroundColor: 'rgba(255, 255, 255, 1)',

    borderRadius: 12,

    padding: 12,

  },

});



export default BaseCard;