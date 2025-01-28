from django.urls import path
from .views import JobListCreate, JobDetail, ApplicationListCreate, JobApplication, RegisterUser, JobListAccess

urlpatterns = [
    path('jobs/', JobListCreate.as_view(), name='job-list-create'),
    path('jobs/posts/', JobListAccess.as_view(), name='job-list-access'),
    path('jobs/<int:pk>/', JobDetail.as_view(), name='job-detail'),
    path('applications/', ApplicationListCreate.as_view(), name='application-list-create'),
    path('jobs/<int:job_id>/applications/', JobApplication.as_view(), name='job-applications'),
     path('register/', RegisterUser.as_view(), name='register')
]
