import os, uuid
from flask import Blueprint, jsonify, request, current_app
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity, jwt_required
from src.utils.upload import upload_image_to_cloud
from src.models.database import Post, Comment
from src.celery.task import get_status, upload_image
from werkzeug.utils import secure_filename
from decouple import config

admin = Blueprint(
    "admin",
    __name__,
)
UPLOAD_DIR = config("UPLOAD_DIR")


@admin.route("/total/posts")
@cross_origin()
@jwt_required()
def get_admin_total_posts():
    """An endpoint to get the total number of posts owned by admin"""
    user_id = get_jwt_identity()
    total_posts = get_total_number_of_post(user_id)
    if total_posts:
        return total_posts, 200

    return 0, 200


@admin.route("/total/comments")
@cross_origin()
@jwt_required()
def get_admin_total_comments():
    """An endpoint to get the total number of comments owned by admin"""
    user_id = get_jwt_identity()
    news_comments = get_posts_and_comments("news", user_id)[1]
    business_comments = get_posts_and_comments("business", user_id)[1]
    sports_comments = get_posts_and_comments("sports", user_id)[1]
    entertainment_comments = get_posts_and_comments("entertainment", user_id)[1]
    total_comments = (
        news_comments + business_comments + sports_comments + entertainment_comments
    )

    return str(total_comments), 200


@admin.route("/news/latest")
@cross_origin()
@jwt_required()
def get_latest_five_news_posts():
    """An endpoint to get the latest five news posts"""
    user_id = get_jwt_identity()
    latest_posts = (
        Post.query.filter_by(user_id=user_id)
        .order_by(Post.id.desc())
        .paginate(page=1, per_page=5, error_out=False)
    )
    serialized = []
    for post in latest_posts:
        total_comments = len(post.comments)
        serialized.append(
            {
                "title": post.title,
                "slug": post.slug,
                "headline": post.headline,
                "image_id": post.image,
                "published_on": post.published_on,
                "total_comments": total_comments,
            }
        )

    return serialized


@admin.route("/posts/update/<string:slug>", methods=["PUT"])
@cross_origin()
def update_post_in_latest_news(slug):
    """An endpoint to update the posts based on the category dashboard"""
    success_msg = "post updated successfully"
    error_msg = "invalid id passed"
    data = request.get_json()
    response = update_post(slug, data)
    if response:
        jsonify({"success": success_msg}), 202
    else:
        return jsonify({"error": error_msg}), 404


@admin.route("/news/latest/delete/<string:slug>", methods=["DELETE"])
@cross_origin()
def delete_post_in_latest(slug):
    """An endpoint to delete the five latest posts in admin homepage"""
    post = Post.query.filter_by(slug=slug).first()
    if post:
        post.remove_from_db()
        return jsonify({"success": "Image deleted succesfully"}), 204

    return {"error": f"Image with id {id} not found"}, 404


@admin.route("/total/news")
@cross_origin()
@jwt_required()
def get_admin_total_news_posts():
    """An endpoint to get the total number of news posts owned by author"""
    user_id = get_jwt_identity()
    news_and_comments = get_posts_and_comments(user_id)

    return news_and_comments, 200


@admin.route("/posts/<string:category>")
@cross_origin()
@jwt_required()
def get_all_user_news__posts(category):
    """An endpoint to get all the posts written by admin in a specific category"""
    user_id = get_jwt_identity()
    user_posts = (
        Post.query.filter_by(category=category, user_id=user_id)
        .order_by(Post.id.desc())
        .all()
    )
    seliarized_posts = seliarize_user_posts(user_posts)
    return seliarized_posts, 200


@admin.route("/total/business")
@cross_origin()
@jwt_required()
def get_admin_total_business_posts():
    """An endpoint to get the total number of business posts owned by author"""
    user_id = get_jwt_identity()
    business_and_comments = get_posts_and_comments(user_id)

    return business_and_comments, 200


@admin.route("/total/sports")
@cross_origin()
@jwt_required()
def get_admin_total_sports_posts():
    """An endpoint to get the total number of sports posts owned by author"""
    user_id = get_jwt_identity()
    sports_and_comments = get_posts_and_comments(user_id)

    return sports_and_comments, 200


@admin.route("/total/entertainment")
@cross_origin()
@jwt_required()
def get_admin_total_entertainment_posts():
    user_id = get_jwt_identity()
    entertainment_and_comments = get_posts_and_comments(user_id=user_id)

    return entertainment_and_comments, 200

@admin.post("/createpost")
@cross_origin()
@jwt_required()
def create_new_post():
    """ An endpoint to create  a post """
    try:
        user_id = get_jwt_identity()
        data = request.form.to_dict(flat=True)
        file = request.files.get("image")
        status, message = validate_post_data(data)
        if status and file:
            file_extension = os.path.splitext(file.filename)[1].lower()
            filename = secure_filename(os.path.join(str(uuid.uuid1()), file_extension))
            filepath = os.path.join(UPLOAD_DIR, filename)
            file.save(filepath)
            data["user_id"] = user_id
            task = upload_image.apply_async(args=[data, filepath])
            return jsonify({"status": "success", "task_id": task.id}), 202
        else:
            return make_response("failed", message, 400)
    except Exception as e:
        return make_response("failed", str(e), 400)



@admin.route("/posts/delete/<string:slug>", methods=["DELETE"])
def delete_post(slug):
    """An endpoint to delete a post based on the category"""
    if delete_post(slug):
        return " ", 204

    return jsonify({"failed": "double check the image_id"}), 404


@admin.route("/task/<string:task_id>")
def check_task_status(task_id):
    """
    An endpoint to check the status of a task
    """
    response = get_status(task_id)
    return jsonify(response), 200


def validate_post_data(post_input) -> bool:
    required = {"title", "headline", "content", "category"}
    data_fields = set(post_input.keys())
    if required == data_fields:
        return True, None
    else:
        missing = required - data_fields
        extra = data_fields - required
        if missing:
            return False, f"Validation failed: Missing fields - {missing}"
        if extra:
            return False, f"Validation failed: Unexpected fields - {missing}"


""" A function to seliarize all posts owned by admin according to posts passed"""


def seliarize_user_posts(user_posts) -> list:
    seliarized = []
    for post in user_posts:
        selialized_comments = []
        post_comments = (
            Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
        )
        for comment in post_comments:
            selialized_comments.append(
                {
                    "comment": comment.comment,
                    "is_anonymous": comment.is_anonymous,
                    "commented_on": comment.date_created,
                }
            )
        seliarized.append(
            {
                "title": post.title,
                "slug": post.slug,
                "headline": post.headline,
                "image": post.image,
                "content": post.content,
                "published_on": post.published_on,
                "comments": selialized_comments,
            }
        )

    return seliarized


def delete_post(slug) -> bool:
    """
    A function to delete a post
    """
    data = Post.query.filter_by(slug=slug).first()
    if data:
        data.remove_from_db()
        return True

    return False


""" A function to update  a post """


def update_post(slug, data) -> bool:
    data = Post.query.filter_by(slug=slug).first()
    if data:
        data.title = data.get("title")
        data.slug = data.title.lower().replace(" ", "-")
        data.headline = data.get("headline")
        data.content = data.get("body")
        data.image = data.image
        data.update()
        return True

    return False


""" A function to get the number of posts and associated comments """


def get_posts_and_comments(category, user_id: int) -> str:
    posts = Post.query.filter_by(user_id=user_id, category=category).all()
    total_news = len(posts)
    comments = 0
    for post in posts:
        comments += len(post.comments)

    return [total_news, comments]


""" A fucntion  to get the total number of post owner by user """


def get_total_number_of_post(user_id: int) -> str:
    news_posts = get_posts_and_comments("news", user_id)[0]
    business_posts = get_posts_and_comments("business", user_id)[0]
    sports_posts = get_posts_and_comments("sports", user_id)[0]
    enta_posts = get_posts_and_comments("entertainment", user_id)[0]
    total_posts = news_posts + business_posts + sports_posts + enta_posts
    return str(total_posts)


def make_response(status, message, status_code):
    return jsonify({"status": status, "message": message}), status_code
