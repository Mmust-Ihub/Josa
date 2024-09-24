import os

def create_uploads_dir(app):
    UPLOAD_DIR = app.config.get("UPLOAD_DIR")
    try:
        if not os.path.exists(UPLOAD_DIR):
            os.makedirs(UPLOAD_DIR)
            return True
        else:
            pass
    except Exception as e:
        print('An error occured while creating the dir')
        return False