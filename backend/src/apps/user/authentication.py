from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.http.request import HttpRequest

User = get_user_model()


class EmailBackend:
    """
    Backend de autenticação customizado que permite login usando o campo de e-mail.

    Este backend substitui o comportamento padrão do Django, que utiliza o nome
    de usuário (`username`), permitindo que os usuários se autentiquem por e-mail
    e senha. Ele também respeita a verificação de status ativo (`is_active`).

    Métodos principais:
        - authenticate(): Realiza a autenticação com base no e-mail e senha.
        - get_user(): Recupera um usuário a partir do ID.
        - user_can_authenticate(): Verifica se o usuário está ativo e pode autenticar.
    """

    def authenticate(
        self,
        request: HttpRequest,
        email: str | None = None,
        password: str | None = None,
        **kwargs: object,
    ) -> AbstractUser | None:
        """
        Autentica um usuário com base no e-mail e senha fornecidos.

        Args:
            request (HttpRequest): Objeto da requisição HTTP
            (pode ser None em alguns contextos).
            email (str | None): E-mail informado para autenticação.
            password (str | None): Senha informada para autenticação.
            **kwargs (object): Argumentos adicionais opcionais
            (compatibilidade com outros backends).

        Returns:
            AbstractUser | None:
                - Retorna o usuário autenticado se o e-mail e a senha forem válidos.
                - Retorna None se a autenticação falhar ou os dados forem inválidos.

        Observações:
            - A verificação `user_can_authenticate` garante que apenas usuários ativos
            possam logar.
            - Caso o e-mail não exista, uma senha fictícia é gerada para mitigar ataques
            de temporização.
        """
        if email is None:
            value = kwargs.get(AbstractUser.EMAIL_FIELD)
            if isinstance(value, str):
                email = value

        if not email or not password:
            return None

        try:
            user = User.objects.get(email=email)
        except AbstractUser.DoesNotExist:
            # Gera uma hash de senha sem salvar, apenas para evitar ataque de timing.
            AbstractUser().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id: int) -> AbstractUser | None:
        """
        Retorna um usuário a partir do seu ID (utilizado por sessões autenticadas).

        Args:
            user_id (int): ID do usuário a ser buscado.

        Returns:
            AbstractUser | None: Usuário encontrado, ou None se não existir.
        """
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def user_can_authenticate(self, user: AbstractUser) -> bool:
        """
        Verifica se o usuário está ativo e pode ser autenticado.

        Args:
            user (AbstractUser): Instância do usuário a ser verificada.

        Returns:
            bool: True se o usuário estiver ativo; False caso contrário.
        """
        return user.is_active
