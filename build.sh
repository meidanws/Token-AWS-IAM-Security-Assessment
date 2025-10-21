#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install Python dependencies
cd backend
pip install --upgrade pip
pip install -r requirements.txt

# Add additional dependencies for production
pip install gunicorn