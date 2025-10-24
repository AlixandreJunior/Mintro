from django.urls import path

from apps.diary.views import diary, objetives

app_name = "diary"

urlpatterns = [
    path("diary/", diary.DiaryListView.as_view(), name="diary_list"),
    path(
        "diary/detail/<int:id>/", diary.DiaryObjectView.as_view(), name="diary_object"
    ),
    path(
        "diary/detail/<int:id>/delete/",
        diary.DiaryDeleteView.as_view(),
        name="diary_delete",
    ),
    path(
        "diary/detail/<int:id>/update/",
        diary.DiaryUpdateView.as_view(),
        name="diary_update",
    ),
    path("diary/create/", diary.DiaryCreateView.as_view(), name="diary_create"),  #
    path("objective/", objetives.ObjectiveListView.as_view(), name="objective"),
    path(
        "objective/create/",
        objetives.ObjectiveCreateView.as_view(),
        name="objective_create",
    ),
    path(
        "objective/detail/<int:id>/",
        objetives.ObjectiveDetailView.as_view(),
        name="objective_detail",
    ),
    path(
        "objective/detail/<int:id>/update/",
        objetives.ObjectiveUpdateView.as_view(),
        name="objective_update",
    ),
    path(
        "objective/detail/<int:id>/delete/",
        objetives.ObjectiveDeleteView.as_view(),
        name="objective_delete",
    ),
    path("activities", diary.ActivitiesListView.as_view(), name="activities"),
]
