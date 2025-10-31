from django.urls import URLPattern, path

from apps.diary.views import diary

app_name = "diary"

urlpatterns: list[URLPattern] = [
    path("", diary.DiaryListView.as_view(), name="list"),
    path("create/", diary.DiaryCreateView.as_view(), name="create"),
    path("detail/<int:id>/", diary.DiaryObjectView.as_view(), name="detail"),
    path("update/<int:id>/", diary.DiaryUpdateView.as_view(), name="update"),
    path("delete/<int:id>/", diary.DiaryDeleteView.as_view(), name="delet"),
]
