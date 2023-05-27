from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('', views.getUser, name='user'),
    path('register/', views.registerUser, name='user-register'),
    path('profile/create/', views.createProfile, name='create-profile'),
    path('profile/update/', views.updateProfile, name='update-profile'),
    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/stores/', views.getStores, name='stores'),
]