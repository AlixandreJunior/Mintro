from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.http import HttpRequest

User = get_user_model()


class EmailBackend:
    """
    Backend de autenticação customizado que permite login usando o campo de e-mail.

    Este backend substitui o comportamento padrão do Django, que autentica
    usuários com o campo `username`, possibilitando login com `email` e `password`.
    """

    def authenticate(
        self,
        request: HttpRequest,
        email: str,
        password: str,
        **kwargs: object,
    ) -> AbstractUser | None:
        """
        Tenta autenticar um usuário com base no e-mail e senha fornecidos.

        Args:
            request (HttpRequest): Objeto da requisição atual (pode ser None).
            email (str): E-mail informado para login.
            password (str): Senha correspondente ao e-mail.
            **kwargs (object): Argumentos adicionais opcionais.

        Returns:
            AbstractUser | None:
                - Retorna o usuário autenticado se as credenciais forem válidas.
                - Retorna None se o usuário não existir ou a senha estiver incorreta.
        """
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None

    def get_user(self, user_id: int | str) -> AbstractUser | None:
        """
        Retorna um usuário a partir do seu ID.

        Este método é usado internamente pelo Django para recuperar o usuário
        autenticado em sessões persistentes.

        Args:
            user_id (int | str): Identificador único do usuário.

        Returns:
            AbstractUser | None:
                - Usuário correspondente ao ID, se existir.
                - None caso não seja encontrado.
        """
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def user_can_authenticate(self, user: AbstractUser) -> bool:
        """
        Verifica se o usuário pode ser autenticado.

        Normalmente, apenas usuários com `is_active=True` são considerados
        válidos para autenticação.

        Args:
            user (AbstractUser): Instância do usuário a ser verificada.

        Returns:
            bool: True se o usuário estiver ativo; False caso contrário.
        """
        return user.is_active
