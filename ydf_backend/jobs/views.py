from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

class JobListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            # Automatically set `posted_by` to the authenticated user
            serializer.save(posted_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobDetail(APIView):
    permission_classes = [IsAuthenticated]
    # Fetch a list of jobs posted by the user or a specific job
    def get(self, request, pk=None):
        if pk:
            # Fetch a specific job
            job = Job.objects.get(pk=pk)
            serializer = JobSerializer(job)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Fetch all jobs posted by the user
            jobs = Job.objects.filter(posted_by=request.user)
            serializer = JobSerializer(jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            job = Job.objects.get(pk=pk)
            if job.posted_by == request.user:
                job.delete()
                return Response({'message': 'Job deleted'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, pk):
            try:
                job = Job.objects.get(pk=pk)
                if job.posted_by != request.user:
                    return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
                
                serializer = JobSerializer(job, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Job.DoesNotExist:
                return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
            
class ApplicationListCreate(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        applications = Application.objects.filter(applicant=request.user)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)    

    def post(self, request):
        data = request.data.copy()  # Create a mutable copy of request data
        data['applicant'] = request.user.id  # Add the applicant field
        serializer = ApplicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # No need to explicitly save applicant; it's already in data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobApplication(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        try:
            # Ensure the job belongs to the logged-in user
            job = get_object_or_404(Job, id=job_id, posted_by=request.user)
            applications = Application.objects.filter(job=job)
            serializer = ApplicationSerializer(applications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Job.DoesNotExist:
            return Response({"error": "Job not found or not authorized."}, status=status.HTTP_404_NOT_FOUND)
        

class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, first_name = first_name, last_name = last_name)
        user.set_password(password)
        user.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


#API for job posted by that user only
class JobListAccess(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        jobs = Job.objects.filter(posted_by = request.user)
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)