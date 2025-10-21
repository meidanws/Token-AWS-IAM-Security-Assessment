# Token AWS IAM Security Assessment

## Technologies Used

### Backend

- **Python 3.10+**
- **Flask**: Web framework for the API
- **Boto3**: AWS SDK for Python
- **JSON**: Data storage and exchange

### Frontend

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Node.js 16 or higher
- AWS Account with appropriate IAM permissions
- Git

### Quick Setup Using Make

This project includes a Makefile to simplify the setup and running process:

1. Set up the backend environment (creates virtual environment and installs dependencies):

   ```bash
   make setup
   ```

2. Create a .env file in the root directory (you can copy from .env.example):

   ```ini
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_preferred_region
   ```

3. Start the backend server:

   ```bash
   make run-backend
   ```

   The backend will start on http://localhost:5001

4. In a new terminal, start the frontend:
   ```bash
   make run-frontend
   ```
   The frontend will start on http://localhost:5173

### Manual Setup (Alternative)

If you prefer not to use Make, you can set up the project manually:

#### Backend Setup

1. Create a virtual environment:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r backend/requirements.txt
   ```

3. Run the backend:
   ```bash
   python backend/app.py
   ```

#### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

### Cleanup

To remove the virtual environment and cache files:

```bash
make clean
```

## Environment Variables

### Backend (.env)

Required environment variables for the backend:

```ini
AWS_ACCESS_KEY_ID=your_access_key_id        # Your AWS access key
AWS_SECRET_ACCESS_KEY=your_secret_access_key # Your AWS secret key
AWS_REGION=your_preferred_region            # e.g., us-east-1
PORT=5001                                   # Backend server port (optional, defaults to 5001)
```

## API Endpoints

- `GET /api/users`: List IAM users
- `POST /api/assess`: Run vulnerability scan
- `GET /api/report`: Download security report
