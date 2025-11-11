from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import URLPattern, URLResolver, include, path

urlpatterns: list[URLResolver | URLPattern] = [
    path("admin/", admin.site.urls),
    path("api/diary/", include("apps.diary.urls")),
    path("api/health/", include("apps.health.urls")),
    path("api/user/", include("apps.user.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
