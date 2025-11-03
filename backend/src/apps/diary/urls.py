from django.urls import URLPattern, URLResolver, include, path

from apps.diary.views import diary

app_name = "diary"

urlpatterns: list[URLPattern | URLResolver] = [
    path("activities", diary.ActivitiesListView.as_view(), name="activities"),
    path("diary/", include("apps.diary.endpoints.diary")),
    path("objective/", include("apps.diary.endpoints.objective")),
]
