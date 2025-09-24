import React from 'react'; // NECESSÁRIO para JSX
import { FamilyIcon } from '@/components/icons/FamilyIcon';
import { FriendIcon } from '@/components/icons/FriendIcon';
import { LoveIcon } from '@/components/icons/LoveIcon';
import { SportIcon } from '@/components/icons/SportIcon';
import { SleepIcon } from '@/components/icons/SleepIcon';
import { AppleIcon } from '@/components/icons/AppleIcon';
import { MovieIcon } from '@/components/icons/MovieIcon';
import NotebookIcon from '@/components/icons/NotebookIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import JobIcon from '@/components/icons/JobIcon';
import SmileIcon from '@/components/icons/SmileIcon';
import { DumbbellIcon } from '@/components/icons/DumbellIcon';
import GameIcon from '@/components/icons/GameIcon';
import MoonIcon from '@/components/icons/MoonIcon';

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
