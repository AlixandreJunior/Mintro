from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import URLPattern, URLResolver, include, path

from apps.user.auth.views import (
    LoginView,
    LogoutView,
    RefreshView,
    VerifyView,
)

urlpatterns: list[URLResolver | URLPattern] = [
    path("admin/", admin.site.urls),
    path("api/diary/", include("apps.diary.urls")),
    path("api/health/", include("apps.health.urls")),
    path("api/user/", include("apps.user.urls")),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/logout/", LogoutView.as_view(), name="logout"),
    path("api/refresh/", RefreshView.as_view(), name="refresh"),
    path("api/verify/", VerifyView.as_view(), name="verify"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
