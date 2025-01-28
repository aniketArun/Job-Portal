# from rest_framework import serializers
# from .models import Job, Application

# class JobSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Job
#         fields = ['id', 'title', 'description', 'location', 'salary', 'posted_by']
#         read_only_fields = ['posted_by']  # Make `posted_by` read-only

# class ApplicationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Application
#         fields = '__all__'


from rest_framework import serializers
from .models import Job, Application

class JobSerializer(serializers.ModelSerializer):
    posted_by_name = serializers.CharField(source='posted_by.username', read_only=True)  # Add this field

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'location', 'salary', 'created_at', 'posted_by', 'posted_by_name', 'company_name']
        read_only_fields = ['posted_by']  # Keep `posted_by` read-only

class ApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.CharField(source='applicant.username', read_only=True)  # Add this field for applicant
    job_details = JobSerializer(source='job', read_only=True)  # Add nested serializer for job
    class Meta:
        model = Application
        fields = ['id', 'job', 'applicant', 'applicant_name', 'cover_letter', 'applied_at', 'job_details']
