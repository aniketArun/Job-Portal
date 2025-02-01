# Job Portal

A job portal built using React, Material UI, Django REST Framework, and JWT authentication. This platform allows users to register, post jobs, apply for jobs, and manage job applications.

## Features

- **User Authentication**: Register/Login with JWT-based authentication.
- **Job Posting**: Users can post jobs and view applications received for their postings.
- **Job Applications**: Users can apply for jobs posted by others.
- **Application Management**: Users can view jobs they have applied for.
- **CRUD Operations**: Users can update or delete only the jobs they have posted.

## Tech Stack

- **Frontend**: React, Material UI
- **Backend**: Django REST Framework
- **Authentication**: JWT (JSON Web Token)
- **Database**: PostgreSQL / SQLite (as per configuration)

## Installation & Setup

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/aniketArun/Job-Portal.git
   cd Job-Portal/backend
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv env
   source env/bin/activate  # For Mac/Linux
   env\Scripts\activate  # For Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run database migrations:
   ```sh
   python manage.py migrate
   ```
5. Create a superuser:
   ```sh
   python manage.py createsuperuser
   ```
6. Start the Django development server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login (returns JWT tokens)
- `GET /api/jobs/` - Get all jobs
- `POST /api/jobs/` - Create a new job (authenticated users only)
- `GET /api/jobs/{id}/` - Get job details
- `PUT /api/jobs/{id}/` - Update job (only if posted by the user)
- `DELETE /api/jobs/{id}/` - Delete job (only if posted by the user)
- `POST /api/jobs/{id}/apply/` - Apply for a job
- `GET /api/jobs/applied/` - View jobs applied by the user
- `GET /api/jobs/posted/` - View jobs posted by the user
- `GET /api/jobs/{id}/applications/` - View applications for a job (only if posted by the user)

## Future Enhancements

- Job search and filters
- Notifications for job applications
- Resume upload and profile management
- Admin panel for user management



## Contributing

Pull requests are welcome! Feel free to open an issue for discussions.


