from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
	# path("", views.login_42, name="index"),
	path("api/say_hello", views.say_hello, name="say_hello"),
	path("api/seo_opt", views.seo_opt, name="seo_opt"),

	path("api/translate", views.translate, name="translate"),
	path('api/create_thumbnail', views.create_thumbnail, name='create_thumbnail'),

]
