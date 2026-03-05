from flask import Flask
from flask_cors import CORS
from backend.config import Config
import os

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all domains, specifically allowing Vercel and local development
    CORS(app, resources={r"/*": {"origins": "*"}}) 

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
