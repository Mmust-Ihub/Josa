from flask import Blueprint, request, jsonify, Response, json
from src.models.database import User, Post, Comment
from flask_cors import cross_origin
from decouple import config

posts = Blueprint(
    "view",
    __name__,
)


@posts.route("/")
@cross_origin()
def home_page():
    page = request.args.get("page", int(config("page")), type=int)
    per_page = request.args.get("pages", int(config("per_page")), type=int)
    news_per_page = int(config("news_per_page"))
    response = Response(
        response=json.dumps(
            {
                "News": get_brief_home_news(page, news_per_page),
                "Business": get_brief_home_news(page, per_page),
                "Sports": get_brief_home_news(page, per_page),
                "Entertainment": get_brief_home_news(page, per_page),
            }
        ),
        status=200,
        mimetype="application/json",
    )

    return response


@posts.route("/news")
@cross_origin()
def get_all_news_posts():

    all_news = get_all_posts_with_category("news")
    return all_news, 200


""" An endpoint to get all the business posts in the database """


@posts.route("/business")
@cross_origin()
def get_all_business_posts():

    all_business = get_all_posts_with_category("business")

    return all_business, 200


""" An endpoint to get all the Sports posts in the database """


@posts.route("/sports")
@cross_origin()
def get_all_sports_posts():

    all_sports = get_all_posts_with_category("sports")

    return all_sports, 200


""" An endpoint to get all the entertainment posts in the database """


@posts.route("/entertainment")
@cross_origin()
def get_all_entertainment_posts():

    all_entertainment = get_all_posts_with_category("entertainment")

    return all_entertainment, 200


"""  An endpoint to get the data associated with the id presented  """


@posts.route("/<string:category>/<string:slug>")
@cross_origin()
def get_all_post_info(category, slug):
    error_message = {"error": f"{category} Image with id {id} does not exist"}
    post_data = get_post_info(slug)
    if post_data:
        return post_data, 200
    return jsonify(error_message), 404


"""  An endpoint to get the latest post in each category"""


@posts.route("/post/latest")
@cross_origin()
def latest_post_per_category() -> str:
    response = Response(
        response=json.dumps(
            {
                "news": get_latest_post_per_category("news"),
                "business": get_latest_post_per_category("business"),
                "sports": get_latest_post_per_category("sports"),
                "entertainment": get_latest_post_per_category("entertainment"),
            }
        ),
        status=200,
        mimetype="application/json",
    )

    return response, 200


""" An endpoint to get all the posts written by the current user """


@posts.route("/authorposts/<string:fullname>")
@cross_origin()
def get_all_user_posts(fullname):
    first_name = fullname.split(" ")[0]
    all_posts = User.query.filter_by(first_name=first_name).first()
    if all_posts:
        news_posts = get_user_posts_based_on_category(all_posts.news)
        business_posts = get_user_posts_based_on_category(all_posts.business)
        sports_posts = get_user_posts_based_on_category(all_posts.sports)
        entertainment_posts = get_user_posts_based_on_category(all_posts.entertainment)
        combined_posts = (
            news_posts + business_posts + sports_posts + entertainment_posts
        )
        total_posts = (
            len(news_posts)
            + len(business_posts)
            + len(sports_posts)
            + len(entertainment_posts)
        )
        return [total_posts, combined_posts], 200
    else:
        return {"error": f"No user with username {first_name}"}, 400


""" An endpoint to create comment associated with a post """


@posts.post("/comment/<string:slug>")
@cross_origin()
def create_comment(slug):
    success_message = f"new comment added successfully"
    error_message = f"Failed to create a new comment. check the image id provided"
    data = request.get_json()
    response = create_comment(slug, data)
    if response:
        return jsonify({"success": success_message}), 201
    else:
        return jsonify({"Error": "content required"}), 400

""" This is a function to query and return the 
    brief news found in the home page         """

def get_brief_home_news(page, per_page):
    try:
        posts = Post.query.order_by(Post.id.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
        serialized = []
        for post in posts:
            serialized.append(
                {
                    "id": post.id,
                    "title": post.title,
                    "slug": post.slug,
                    "headline": post.headline,
                    "image": post.image,
                    "author": get_the_user_based_on_author_id(post.user_id),
                    "published_on": post.date_created,
                }
            )
        return serialized
    except Exception:
        return []


""" A function to get the user associated with posts in the home page """


def get_the_user_based_on_author_id(author_id):
    user = User.query.filter_by(id=author_id).first()
    if user:
        return f"{user.first_name} {user.last_name}"

    return None


""" This is a function to query and return all 
    the posts associated with a certain category   """


def get_all_posts_with_category(category) -> list:
    all_posts = Post.query.filter_by(category=category).order_by(Post.id.desc()).all()
    serialized = []
    for post in all_posts:
        serialized.append(
            {
                "id": post.id,
                "title": post.title,
                "slug": post.slug,
                "headline": post.headline,
                "image": post.image,
                "published_on": post.date_created,
            }
        )

    return serialized


""" A function to get the all the data of an post  """


def get_post_info(slug):
    data = Post.query.filter_by(slug=slug).first()
    if data:
        post_comments = (
            Comment.query.filter_by(post_id=data.id).order_by(Comment.id.desc()).all()
        )

        selialized_comments = []
        for comment in post_comments:
            selialized_comments.append(
                {"comment": comment.comment, "commented_on": comment.date_created}
            )
        author = User.query.filter_by(id=data.user_id).first()
        return jsonify(
            {
                "id": data.id,
                "title": data.title,
                "slug": data.slug,
                "headline": data.headline,
                "image": data.image,
                "content": data.content,
                "author": f"{author.first_name} {author.last_name}",
                "published_on": data.date_created,
                "author_image": author.image,
                "comments": selialized_comments,
            }
        )
    else:
        return False


""" A function to get the latest post per category """


def get_latest_post_per_category(category):
    try:
        post = Post.query.filter_by(category=category).order_by(Post.id.desc()).first()
        serialized = {
            "title": post.title,
            "slug": post.slug,
            "headline": post.headline,
            "image": post.image,
            "published_on": post.date_created,
        }

        return serialized
    except Exception as e:
        return []


""" A function to loop through a specific user posts """


def get_user_posts_based_on_category(posts):
    serialized = []
    for post in posts:
        serialized.append(
            {
                "title": post.title,
                "slug": post.slug,
                "headline": post.headline,
                "image": post.image,
                "published_on": post.published_on,
            }
        )

    return serialized


""" A function to create a comment"""


def create_comment(slug, data):
    post = Post.query.filter_by(slug=slug).first()
    if post:
        data = {"comment": data["content"], "post_id": post.id}
        Comment(**data)
        return True

    return False
