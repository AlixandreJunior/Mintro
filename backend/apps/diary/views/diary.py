from apps.diary.models.diary import Activity, Diary
from apps.diary.serializers.diary import (
    ActivitySerializer,
    DiaryReadSerializer,
    DiaryWriteSerializer,
)
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from utils.check_achievement import check_narrador_da_propria_historia


class ActivitiesListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = Activity.objects.all()

        if not queryset.exists():
            raise NotFound("Atividades não encontradas.")
        return queryset


class DiaryListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiaryReadSerializer

    def get_queryset(self):
        user = self.request.user
        search = self.request.GET.get("search")
        month = self.request.GET.get("month")
        year = self.request.GET.get("year")

        queryset = Diary.objects.filter(user=user)

        if search:
            queryset = queryset.filter(title__icontains=search)

        if month and year:
            try:
                month = int(month)
                year = int(year)
                queryset = queryset.filter(
                    datetime__month=month, datetime__year=year
                ).order_by("-datetime")
            except ValueError:
                raise NotFound("Parâmetros de mês ou ano inválidos.")

        if not queryset.exists():
            raise NotFound("Diários não encontrados.")
        return queryset


class DiaryObjectView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiaryReadSerializer

    def get_object(self):
        id = self.kwargs.get("id")
        try:
            return Diary.objects.get(user=self.request.user, id=id)
        except Diary.DoesNotExist:
            raise NotFound("Diário não encontrado.")


class DiaryDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        id = self.kwargs.get("id")
        try:
            return Diary.objects.get(user=self.request.user, id=id)
        except Diary.DoesNotExist:
            raise NotFound("Diário não encontrado.")


class DiaryUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiaryWriteSerializer

    def get_object(self):
        id = self.kwargs.get("id")
        try:
            return Diary.objects.get(user=self.request.user, id=id)
        except Diary.DoesNotExist:
            raise NotFound("Diário não encontrado.")

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(
            {"detail": "Diario atualizado com sucesso."}, status=status.HTTP_200_OK
        )


class DiaryCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiaryWriteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)

            unlocked_achievements = check_narrador_da_propria_historia(request.user)

            return Response(
                {
                    "detail": "Diário criado com sucesso.",
                    "unlocked_achievements": unlocked_achievements,
                },
                status=status.HTTP_201_CREATED,
            )
        except ValidationError as e:
            return Response({"detail": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(
                {"detail": "Erro interno no servidor."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
