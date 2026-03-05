from flask import Flask
from flask_cors import CORS
from backend.config import Config
import os

def create_app():
    app = Flask(__name__)
    CORS(app) # Enable CORS for all domains so Next.js on port 3000 can communicate with Flask on port 5000
    
    # Override template and static folder to be explicit if needed, 
    # but since __init__.py is in backend/app, default templates/static should work relative to it.
    
    app.config.from_object(Config)

    # Ensure upload directory exists
    # We need to make sure Config.UPLOAD_FOLDER is absolute or relative to root correctly
    if not os.path.isabs(app.config['UPLOAD_FOLDER']):
         # Assuming running from root, but let's be safe
         app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), app.config['UPLOAD_FOLDER'])
    
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    from backend.app.routes import main
    app.register_blueprint(main)

    return app
