import { FavoriteDiarySection } from '@/components/FavoriteDiarySection';
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import { useDiary } from '@/hooks/useDiary';
import { SafeAreaView, ScrollView } from 'react-native';

export default function FavoritePage() {
  const { diaries, loading, error } = useDiary(new Date());

  return (
    <SafeAreaView>
      <Header avatarChar='A'/>
      <HeaderWithOptions title='Favoritos'/>
      <ScrollView style={{flex: 1}}>
        <FavoriteDiarySection
          diaries={diaries}
          loading={loading}
          error={error}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
