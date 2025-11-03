from django.urls import URLPattern, path

from apps.diary.views import objetives

app_name = "objective"

urlpatterns: list[URLPattern] = [
    path("", objetives.ObjectiveListView.as_view(), name="list"),
    path("create/", objetives.ObjectiveCreateView.as_view(), name="create"),
    path("detail/<int:id>/", objetives.ObjectiveDetailView.as_view(), name="detail"),
    path("update/<int:id>/", objetives.ObjectiveUpdateView.as_view(), name="update"),
    path("delete/<int:id>/", objetives.ObjectiveDeleteView.as_view(), name="delete"),
]
