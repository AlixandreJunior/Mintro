import HeaderWithOptions from '@/components/layout/HeaderWithOptions';

const HydrationHeader = ({}) => {
  return (
    <HeaderWithOptions
      title="Hidratação"
      options={[
        {
          label: 'Lembrete',
          onPress: () => console.log('Lembrete'),
        },
      ]}
    />
  );
};

export default HydrationHeader;
