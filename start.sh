#!/bin/bash

# Start the Flask backend using gunicorn on port 5000 (in the background)
echo "Starting Flask Backend..."
cd /app && gunicorn --chdir . "backend.app:create_app()" --bind 127.0.0.1:5000 --timeout 120 --workers 2 &
BACKEND_PID=$!

# Start the Next.js frontend on port 7860 (Hugging Face default)
echo "Starting Next.js Frontend..."
cd /app/cataract_front && PORT=7860 npm start &
FRONTEND_PID=$!

# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?
