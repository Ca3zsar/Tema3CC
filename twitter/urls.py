from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tweet-url', views.tweet, name='tweet-post'),
    path('register', views.register, name='register')
]