import React from 'react'; // NECESSÁRIO para JSX
import { FamilyIcon } from '@/share/components/icons/FamilyIcon';
import { FriendIcon } from '@/share/components/icons/FriendIcon';
import { LoveIcon } from '@/share/components/icons/LoveIcon';
import { SportIcon } from '@/share/components/icons/SportIcon';
import { SleepIcon } from '@/share/components/icons/SleepIcon';
import { AppleIcon } from '@/share/components/icons/AppleIcon';
import { MovieIcon } from '@/share/components/icons/MovieIcon';
import NotebookIcon from '@/share/components/icons/NotebookIcon';
import { CartIcon } from '@/share/components/icons/CartIcon';
import JobIcon from '@/share/components/icons/JobIcon';
import SmileIcon from '@/share/components/icons/SmileIcon';
import { DumbbellIcon } from '@/share/components/icons/DumbellIcon';
import GameIcon from '@/share/components/icons/GameIcon';
import MoonIcon from '@/share/components/icons/MoonIcon';

export function getActivityIconName(
  activityName: string,
  iconSize?: number
): React.ReactNode {
  // Tipo de retorno é React.ReactNode
  const lowerCaseName = activityName?.toLowerCase() || '';
  const size = iconSize; // Tamanho padrão para os ícones, ajuste conforme necessário
  const iconColor = '#000'; // Cor padrão para os ícones, ajuste conforme necessário

  switch (lowerCaseName) {
    case 'família':
      return <FamilyIcon size={size} color={iconColor} />;
    case 'amigos':
      return <FriendIcon size={size} color={iconColor} />;
    case 'encontro':
      return <LoveIcon size={size} color={iconColor} />;
    case 'atividade física':
      return <DumbbellIcon size={size} color={iconColor} />;
    case 'esporte':
      return <SportIcon size={size} color={iconColor} />;
    case 'dormir cedo':
      return <MoonIcon size={size} color={iconColor} />;
    case 'alimentação saudável':
      return <AppleIcon size={size} color={iconColor} />;
    case 'descanso': // Se descanso tiver um ícone diferente de dormir cedo
      return <SleepIcon size={size} color={iconColor} />; // Ou um novo icon para Descanso
    case 'filmes':
      return <MovieIcon size={size} color={iconColor} />;
    case 'ler':
      return <NotebookIcon size={size} color={iconColor} />;
    case 'jogos':
      return <GameIcon size={size} color={iconColor} />;
    case 'compras':
      return <CartIcon size={size} color={iconColor} />;
    case 'trabalho':
      return <JobIcon size={size} />;
    default:
      return <SmileIcon size={size} color={iconColor} />; // Ícone padrão
  }
}
