import HeaderWithOptions from '@/components/layout/HeaderWithOptions';

interface HydrationHeaderProps {
  onOpenReminderModal: () => void;
}

const HydrationHeader = ({ onOpenReminderModal }: HydrationHeaderProps) => {
  return (
    <HeaderWithOptions
      title="Hidratação"
      options={[
        {
          label: 'Lembrete',
          onPress: onOpenReminderModal, // abre o modal
        },
      ]}
    />
  );
};

export default HydrationHeader;
