from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from typing import Optional, final, Union
from datetime import datetime
from hashlib import md5
from dataclasses import dataclass

from src.utils.errors import JosaException
from src.utils.password import hash_pwd, verify_password

db = SQLAlchemy()
migrate = Migrate()

# CONSTANTS
TIMESTAMP_FORMAT = "%Y-%m-%d %H:%M:%S"
PER_PAGE = 5
PAGE = 1


class Helper(object):
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def remove_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        try:
            db.session.commit()
            return True
        except exc.IntegrityError as e:
            db.session.rollback()
            return False


@final
class User(db.Model, Helper):
    __tablename__ = "user"
    id = db.Column(db.Integer(), primary_key=True, index=True, autoincrement=True)
    first_name = db.Column(db.String(100), nullable=False, default="anonymous")
    last_name = db.Column(db.String(100), nullable=False, default="anonymous")
    email = db.Column(db.String(500), nullable=False, unique=True)
    _password = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(500), default=lambda: User.generate_image_avatar())
    verified = db.Column(db.Boolean(), default=False)
    date_created = db.Column(db.DateTime(), default=datetime.now(), nullable=False)
    date_updated = db.Column(
        db.DateTime(), default=datetime.now(), onupdate=datetime.now(), nullable=False
    )
    posts = db.relationship(
        "Post",
        backref=db.backref("user", lazy="joined"),
        passive_deletes=True,
        lazy="dynamic",
    )

    def __init__(self, *args, **kwargs):
            self.first_name = kwargs.get("first_name")
            self.last_name = kwargs.get("last_name")
            self.email = kwargs.get("email")
            self.password = kwargs.get("password")
            self.image = self.generate_image_avatar()
            self.save_to_db()

    @property
    def password(self) -> bytes:
        return self._password

    @password.setter
    def password(self, password) -> bytes:
        if len(password) > 6 and type(password) == str:
            self._password = hash_pwd(password)
        else:
            raise JosaException("Invalid password")

    def generate_image_avatar(self, size: Optional[int] = 80) -> str:
        """Generates an image for the user using the gravatar api"""
        digest = md5(self.email.lower().encode("utf-8")).hexdigest()
        url = f"https://www.gravatar.com/avatar/{digest}?d=retro&s={size}"
        return url

    @classmethod
    def get_user(cls, id):
        """get the user according to id passed"""
        user = cls.query.filter_by(id=int(id)).first()
        if user:
            return user
        else:
            return False

    @classmethod
    def get_user_by_email(cls, email) -> Union[object, bool]:
        """get the user according email passed"""
        user = cls.query.filter_by(email=email).first()
        if user:
            return user
        else:
            return False

    @classmethod
    def login_user(cls, data: dict):
        user = cls.get_user_by_email(data.get("email"))
        if user and verify_password(data.get("password"), user.password):
            return user
        return None

    def to_json(self) -> dict:
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "image": self.image,
            "date_created": self.date_created,
        }

    def __eq__(self, __value: object) -> bool:
        return self.id == __value.id and self.email == __value.email

    def __str__(self):
        return f"<Username: {self.username}>"


@dataclass
class Post(db.Model, Helper):
    __tablename__ = "post"
    id: int = db.Column(db.Integer(), primary_key=True, index=True)
    title: str = db.Column(db.Text(), nullable=False, unique=True)
    slug: str = db.Column(db.Text(), nullable=False, unique=True)
    headline: str = db.Column(db.Text(), nullable=False)
    content: str = db.Column(db.Text(), nullable=False)
    category: str = db.Column(db.Text(), nullable=False, default="news")
    image: str = db.Column(db.Text(), nullable=False)
    user_id: int = db.Column(
        db.Integer(), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )
    date_created = db.Column(db.DateTime(), default=datetime.now(), nullable=False)
    date_updated = db.Column(db.DateTime(), default=datetime.now())
    posts = db.relationship(
        "Comment",
        backref=db.backref("post", lazy="joined"),
        passive_deletes=True,
        lazy="dynamic",
    )

    def __post_init__(self) -> None:
        if not self.slug:
            self.slug = self.generate_slug(self.title)
        self.save_to_db()

    def generate_slug(self, title: str):
        return title.lower().replace(" ", "-").replace(",", "")

    @classmethod
    def paginate(cls, page: Optional[int] = PAGE, per_page: Optional[int] = PER_PAGE):
        return cls.query.order_by(Post.id.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )

    @classmethod
    def get_by_id(cls, id: int):
        return cls.query.filter_by(id=id).first_or_404()

    def to_json(self):
        return {
            "transcript": self.transcript,
            "summary": self.summary,
            "audio_url": self.audio_url,
            "date_created": self.date_created,
        }

    def __str__(self) -> str:
        return "<note id: {0}>".format(self.id)


@dataclass
class Comment(db.Model, Helper):
    __tablename__ = "comment"
    id: int = db.Column(db.Integer(), primary_key=True, index=True)
    comment: str = db.Column(db.Text(), nullable=False)
    post_id: int = db.Column(
        db.Integer(), db.ForeignKey("post.id", ondelete="CASCADE"), nullable=False
    )
    date_created = db.Column(db.DateTime(), default=datetime.now(), nullable=False)
    date_updated = db.Column(
        db.DateTime(), default=datetime.now(), onupdate=datetime.now(), nullable=False
    )
    def __init__(self, *args, **kwargs):
        self.comment = kwargs.get("comment")
        self.post_id = kwargs.get("post_id")
        self.save_to_db()

    def to_json(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "post_id": self.post_id,
            "date_created": self.date_created,
        }