import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import AchievementSection from '@/components/AchievementSection';

export default function AchievementScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>

      <Header avatarChar="A" />

      <HeaderWithOptions title="Conquistas" />

      <AchievementSection/>

    </SafeAreaView>
  );
}


