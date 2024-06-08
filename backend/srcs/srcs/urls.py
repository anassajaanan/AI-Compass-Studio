from django.contrib import admin
from django.urls import include,path

urlpatterns = [
	path("api/", include("endpoint.urls")),
    # path('admin/', admin.site.urls),
	path("", include("endpoint.urls")),
]

# aboodytukka
# etip1oHamMlrXgJz
# mongodb+srv://aboodytukka:etip1oHamMlrXgJz@cluster0.dsxiqji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0