from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
	path("api/seo_opt", views.seo_opt, name="seo_opt"),

	path("api/translate", views.translate, name="translate"),

]
