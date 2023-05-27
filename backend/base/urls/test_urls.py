from django.urls import path
from base.views import test_views as views


urlpatterns = [
    path('', views.getTests, name='tests'),
    path('results/create/', views.postResult, name='create-result'),
    path('results/get/', views.getResults, name='get-results'),
    path('results/get/<str:pk>/', views.getResultById, name='get-result'),
    path('<str:pk>/', views.getTest, name='test'),
]