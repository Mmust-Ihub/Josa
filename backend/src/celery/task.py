import os, tinify
from celery.result import AsyncResult
from celery import shared_task
from src.utils.upload import upload_image_to_cloud
from src.models.database import Post
# , compress_image

@shared_task(name="upload_image", bind=True, ignore_result=False, autoretry_for=(Exception,), retry_kwargs={'max_retries': 3, 'countdown': 5})
def upload_image(self, data, filepath):
    self.update_state(state="PROGRESS", meta={"remaining": 1, "completed": 0, "message": "task started successfully"})
    # compress_image(filepath)
    response = upload_image_to_cloud(filepath)
    resp = {**data, "image": response}
    new_post = Post(**resp)
    new_post.__post_init__()
    os.remove(filepath)
    return {"remaining": 0,"completed": 1, "result": "All tasks completed",}


# check the status of a task (reusable view function)
def get_status(task_id):
    task = AsyncResult(task_id)
    if task.state == "PENDING":
        # The task is not started yet
        response = {
            "state": task.state,
            "remaining": 1,
            "completed": 0,
            "status": "Pending ...."
        }

    elif task.state != "FAILURE":
        response = {
            "state": task.state,
            "remaining": task.info.get("remaining"),
            "completed": task.info.get("completed"),
            "message": task.info.get("message", "")
        }
        if "result" in task.info:
            response["result"] = task.info["result"]

    else:
        response = {
            "state": task.state,
            "remaining": 1,
            "completed": 0,
            "status": str(task.info)
        }
    return response