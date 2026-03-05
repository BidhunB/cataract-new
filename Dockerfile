FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies for OpenCV
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better Docker cache
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy the entire project
COPY backend/ ./backend/
COPY saved_models/ ./saved_models/

# Create upload directory
RUN mkdir -p /app/backend/app/static/uploads

# Expose port 7860 (Hugging Face Spaces default)
EXPOSE 7860

# Start gunicorn on HF's expected port
CMD ["gunicorn", "--chdir", ".", "backend.app:create_app()", "--bind", "0.0.0.0:7860", "--timeout", "120"]
