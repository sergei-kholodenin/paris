from django.urls import path
from base.views import admin_views as views


urlpatterns = [
    path('', views.getStoresInfo, name='stores-info'),
    

    path('stores/create/', views.createStore, name='create-store'),
    path('stores/update/', views.updateStoreName, name='update-store-name'),
    path('stores/delete/<str:pk>/', views.deleteStore, name='delete-store'),

    path('positions/get/', views.getPositionsInfo, name='positions'),
    path('positions/create/', views.createPosition, name='create-position'),
    path('positions/update/', views.updatePositionName, name='update-position-name'),
    path('positions/delete/<str:pk>/', views.deletePosition, name='delete-position'),

    path('tests/get/', views.getTestsInfo, name='tests'),
    path('tests/create/', views.createTest, name='create-test'),
    path('tests/update/', views.updateTest, name='update-test'),
    path('tests/delete/<str:pk>/', views.deleteTest, name='delete-test'),

    path('questions/create/', views.createQuestion, name='create-question'),
    path('questions/create/multi/', views.createQuestions, name='create-questions'),
    path('questions/update/', views.updateQuestion, name='update-question'),
    path('questions/delete/<str:pk>/', views.deleteQuestion, name='delete-question'),
    path('questions/get/<str:pk>/', views.getQuestions, name='questions'),

    path('variants/delete/<str:pk>/', views.deleteVariant, name='delete-variant'),

    path('users/get/', views.getUsersList, name='users'),
    path('users/create/', views.createUser, name='user-create'),
    path('users/update/', views.updateAdmin, name='user-update-admin'),
    path('users/delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('users/profile/create/', views.createUserProfile, name='user-profile-create'),
    path('users/profile/update/', views.updateUserProfile, name='user-profile-update'),
    path('users/profile/<str:pk>/', views.getProfile, name='user-profile-edit'),
    path('users/profiles/all/', views.getListProfiles, name='all-profiles'),
    path('users/profiles/update/', views.updateStorePos, name='update-profiles'),
    
    path('results/users/<str:pk>/', views.getUserResults, name='user-results'),
    path('results/<str:pk>/', views.getUserResultsById, name='result-id')
    # path('results/create/', views.postResult, name='create-result'),
]