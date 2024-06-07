from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
	# path("", views.login_42, name="index"),
	path("seo_opt", views.seo_opt, name="seo_opt"),
	path("say_hello", views.say_hello, name="say_hello"),

]
