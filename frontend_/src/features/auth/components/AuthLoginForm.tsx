import React from 'react';
import { Mail, Lock } from 'lucide-react-native';
import { EntryInput } from '@/share/components/ui/inputs/EntryInput';

const iconProps = { size: 20, color: '#9CA3AF', style: { marginRight: 12 } };

interface AuthLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthLoginForm: React.FC<AuthLoginFormProps> = ({
  email,
  password,
  showPassword,
  setEmail,
  setPassword,
  setShowPassword,
}) => {
  return (
    <>
      <EntryInput
        labelText="Email"
        keyboardType="email-address"
        onChange={setEmail}
        value={email}
        placeholder="Digite seu email"
        icon={<Mail {...iconProps} />}
      />

      <EntryInput
        labelText="Senha"
        keyboardType="default"
        onChange={setPassword}
        value={password}
        placeholder="Digite sua senha"
        secureText={{
          showSecureText: showPassword,
          setShowSecureText: () => setShowPassword((prev) => !prev),
        }}
        icon={<Lock {...iconProps} />}
      />
    </>
  );
};

export default AuthLoginForm;
