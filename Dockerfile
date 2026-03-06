# Start backend
FROM python:3.11-slim AS backend

# Set working directory for backend
WORKDIR /app

# Install system dependencies for OpenCV and nodejs for frontend
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (needed for Next.js)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# ==== BACKEND SETUP ====
# Copy requirements first for better Docker cache
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy the Python project pieces
COPY backend/ ./backend/
COPY saved_models/ ./saved_models/

# Create upload directory
RUN mkdir -p /app/backend/app/static/uploads

# ==== FRONTEND SETUP ====
COPY cataract_front/package*.json ./cataract_front/
WORKDIR /app/cataract_front
RUN npm ci

COPY cataract_front/ ./
ENV NEXT_PUBLIC_API_URL=/api
RUN npm run build

# ==== FINAL RUN SETUP ====
WORKDIR /app

# Expose port (Hugging Face Spaces default)
EXPOSE 7860

# We need a start script to run both Next.js and Flask
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
