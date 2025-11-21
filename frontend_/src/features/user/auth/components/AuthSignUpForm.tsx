import React from 'react';
import { StyleSheet } from 'react-native';
import { Lock, Mail } from 'lucide-react-native';
import { EntryInput } from '@/share/components/ui/inputs/EntryInput';

interface SignUpFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthSignUpForm: React.FC<SignUpFormProps> = ({
  name,
  email,
  password,
  showPassword,
  setName,
  setEmail,
  setPassword,
  setShowPassword,
}) => {
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <>
      <EntryInput
        labelText="Nome de Usuário"
        keyboardType="default"
        onChange={setName}
        value={name}
        placeholder="Digite seu nome completo"
      />
      <EntryInput
        labelText="Email"
        keyboardType="email-address"
        onChange={setEmail}
        value={email}
        placeholder="Digite seu email"
        icon={<Mail size={20} color="#9CA3AF" style={styles.inputIcon} />}
      />
      <EntryInput
        labelText="Senha"
        keyboardType="default"
        onChange={setPassword}
        value={password}
        placeholder="Digite sua senha"
        secureText={{
          showSecureText: showPassword,
          setShowSecureText: togglePasswordVisibility,
        }}
        icon={<Lock size={20} color="#9CA3AF" style={styles.inputIcon} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginRight: 12,
  },
});

export default AuthSignUpForm;
