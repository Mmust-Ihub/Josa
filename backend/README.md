# MMUST-JOSA Backend

This project contains code for a postging web application that will enable users to easily share, express and publish content in the form of posts.

<div align="center">

**Things to take note of**

#### dev_base_url: http://164.92.165.41

#### prod_base_url: ""

</div>

### Technologies Used

- _python_
- _flask_

## Getting Started

### Installations

You can use the git clone command as follows:

```sh
user@username:~$ git clone https://github.com/BudhaBudha/Mmust-Jowa.git
user@username:~$ cd  Mmust-Jowa
user@username:~$ python -m venv my_venv # create a virtual env to manage your dependecies
user@username:~$ source my_venv/bin/activate  # for linux users
user@username:~$ pip3 install -r requirements.txt  #install all the dependecies used in this project
user@username:~$ flask run  # use this command to start the server
```

# USERS

## Home page of the post app

A limited number of posts from each category are displayed here . posts are displayed according to the time they were created with the latest post being the first.

- url: GET [{{dev_base_url}}/api/v1/user/]()

  ```json
  {
    "Business": [],
    "Entertainment": [],
    "News": [
      {
        "author": "Lila Walker",
        "headline": "Animi et officiis dolores. In praesentium enim quia voluptas enim exercitationem cupiditate voluptatibus. Temporibus ex dolores sed odio minima odio id. Ut quasi ea at.",
        "id": 2,
        "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728562068/Mmust-Josa_1728562067.jpg",
        "published_on": "Thu, 10 Oct 2024 11:55:06 GMT",
        "slug": "qui-ad-sed-unde.",
        "title": "Qui ad sed unde."
      }
    ],
    "Sports": []
  }
  ```

- Note: Only three posts per category are returned in the response

## News posts

when a user clicks on the news button on the navbar, the frontend sends a request to the backed which then returnes all posts associated with the news category.

- url: GET [{{dev_base_url}}/api/v1/user/news]()

- The response body is a list/array of all the news posts.
- ```json
  [
    {
      "headline": "Ipsa eum veniam aut in quam dicta. Qui est aliquam. Molestiae fugiat ut debitis. Quibusdam adipisci maiores aliquid ..",
      "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728561924/Mmust-Josa_1728561924.jpg",
      "published_on": "Thu, 10 Oct 2024 11:55:06 GMT",
      "slug": "rerum-laborum-rem.",
      "title": "Rerum laborum rem."
    }
  ]
  ```

## Business posts

when a user clicks on the business button on the navbar, the frontend sends a request to the backed which then returnes all posts associated with the business category.

- url: GET [{{dev_base_url}}/api/v1/user/business]()

- The response body is a list/array of all the business posts.

- ```json
  [
    {
      "headline": "Ipsa eum veniam aut in quam dicta. Qui est aliquam. Molestiae fugiat ut debitis. Quibusdam adipisci maiores aliquid ..",
      "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728561924/Mmust-Josa_1728561924.jpg",
      "published_on": "Thu, 10 Oct 2024 11:55:06 GMT",
      "slug": "rerum-laborum-rem.",
      "title": "Rerum laborum rem."
    }
  ]
  ```

## Sports posts

- url: GET [{{dev_base_url}}/api/v1/user/sports]()

- ```json
  [
    {
      "headline": "Ipsa eum veniam aut in quam dicta. Qui est aliquam. Molestiae fugiat ut debitis. Quibusdam adipisci maiores aliquid ..",
      "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728561924/Mmust-Josa_1728561924.jpg",
      "published_on": "Thu, 10 Oct 2024 11:55:06 GMT",
      "slug": "rerum-laborum-rem.",
      "title": "Rerum laborum rem."
    }
  ]
  ```

## Entertainment posts

- url: GET [{{dev_base_url}}/api/v1/user/entertainment]()
- ```json
  [
    {
      "headline": "Ipsa eum veniam aut in quam dicta. Qui est aliquam. Molestiae fugiat ut debitis. Quibusdam adipisci maiores aliquid ..",
      "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728561924/Mmust-Josa_1728561924.jpg",
      "published_on": "Thu, 10 Oct 2024 11:55:06 GMT",
      "slug": "rerum-laborum-rem.",
      "title": "Rerum laborum rem."
    }
  ]
  ```

## Single post

when a user clicks on a single post, the frontend sends a request with the image_id related to the post and the category of the post to the backed where the backend returns all the info related to the post. on the url below, replace CATEGORY with the the post category ie Business and imaged_id with the image id.

- url: GET [{{dev_base_url}}/api/v1/user/{category}/{slug}]()
- where the category is either news, business and the slug of the post

- ```json
  {
    "author": "Lila Walker",
    "author_image": "https://www.gravatar.com/avatar/cba1f2d695a5ca39ee6f343297a761a4?d=retro&s=80",
    "comments": [],
    "content": "Temporibus laudantium qui hic ut beatae. Dolor eligendi occaecati rem assumenda incidunt....",
    "headline": "Ipsa eum veniam aut in quam dicta. Qui est aliquam. ..",
    "id": 1,
    "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728561924/Mmust-Josa_1728561924.jpg",
    "published_on": "Thu, 10 Oct 2024 11:55:06 GMT",
    "slug": "rerum-laborum-rem.",
    "title": "Rerum laborum rem."
  }
  ```

## Latest post per category

- url: GET [{{dev_base_url}}/api/v1/user/post/latest]()

- ```json
  {
    "business": {
      "headline": "Alias odio laborum quae deleniti et atque tempora. Tenetur sit ea dolores quidem eligendi. Temporibus non est distinctio repellat eum.",
      "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728562422/Mmust-Josa_1728562422.jpg",
      "published_on": "Thu, 10 Oct 2024 12:10:53 GMT",
      "slug": "magnam-ducimus-similique-laborum-sit-velit-esse-molestias-vitae-ducimus.",
      "title": "Magnam ducimus similique laborum sit velit esse molestias vitae ducimus."
    }
  }
  ```

## User posts

This endpoint return all the post associated with the author.

- url: GET [{{dev_base_url}}/api/v1/user/authorposts/{fullname}]()

  - where fullname is the name of the author

- ```json
  {
    "total": 10,
    "posts": [
      {
        "headline": "Non corporis quas sit eveniet minima reprehenderit voluptas. Facilis sit nesciunt atque ut voluptatem.",
        "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1727279316/Mmust-Josa_1727279311.png",
        "published_on": "Wed, 25 Sep 2024 18:48:10 GMT",
        "slug": "quos-aut-eum-et.",
        "title": "Quos aut eum et."
      }
    ]
  }
  ```

* where 1 is the total number of posts writen by the author

## Create Comment

- url: POST [{{dev_base_url}}/api/v1/user/comment/{slug}]()

- ```json
    "content": "string"
    "is_anonymous": Boolean optional
  ```

  The status_code of the response == 201 if the comment was created successfully else a bad request error(400) error is thrown. user should ensure that comment textbox is filled.

# ADMIN

## Admin registration

#### Admin gets registered to the system by making a request to the endpoint below

- url: POST [{{dev_base_url}}/api/v1/auth/register]()

```json
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "confirm": "string"
```

The status_code of the response == 201 if the registration is successfull else returns a bad request error.(400).
user should double check the registration credentials.

## Admin Login

- url: POST [{{dev_base_url}}/api/v1/auth/login]()
  headers:
  Content-Type: application/json
  ```json
      "email": "string",
      "password": "string"
  ```

## Total posts

#### On the dashboard, admin is able to see the total number of posts. he/she has written.

- url: GET [{{dev_base_url}}/api/v1/admin/total/posts]()
- ```python
  headers:
    content-type: application/json
    Authorization: Bearer <token>
  ```
- ```json
  10
  ```

## Total Comments

#### On the dashboard, admin is able to see the total comments of the posts. he/she has written.

- url: GET [{{dev_base_url}}/api/v1/admin/total/comments]()
- ```python
  headers:
    content-type: application/json
    Authorization: Bearer <token>
  ```
- ```json
  10
  ```

## Latest Five News posts

#### On the dashboard, admin is able to see latest five news posts that he/she has written.

- url: GET [{{dev_base_url}}/api/v1/admin/news/latest]()
- ```python
  headers:
    content-type: application/json
    Authorization: Bearer <token>
  ```
- ```json
  [
    {
      "headline": "<p>Deputy President Rigathi Gachagua has strongly opposed the impeachment ....",
      "image_id": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728353580/Mmust-Josa_1728353578.jpg",
      "published_on": "Tue, 08 Oct 2024 05:12:48 GMT",
      "slug": "gachagua-denies-corruption-allegations,-cites-late-brother’s-assets-in-defense",
      "title": "Gachagua denies corruption allegations, cites late brother’s assets in defense",
      "total_comments": 0
    }
  ]
  ```

## Update News posts On the dashboard.

#### Since only the latest five news posts are displayed on the dahboard, the admin may need to upadate them.

- url: PUT [{{dev_base_url}}/api/v1/admin/news/latest/update/{slug}]()
- ```python
  headers:
    content-type: application/json
  ```
- ```json
  {
    "title": "This is an updated title",
    "slug": "This is an updated description",
    "body": "This is an updated body"
  }
  ```

  The status_code of the response == 202 if the post was updated successfully else a not found error(404) is thrown. user should ensure that the id provided is valid.

## Delete News posts On the Dashboard

#### Admin has the previledge to delete any of the latest news posts

- url: DELETE [{{dev_base_url}}/api/v1/admin/news/latest/delete/{slug}]()
- ```json
  headers:
    content-type: application/json
  ```

## Total count of posts in a specific category

- url: GET [{{dev_base_url}}/api/v1/admin/posts/total/{category}]()
- ```python
  headers:
    content-type: application/json
    Authorization: Bearer <token>
  ```
- ```json
  {
    "total_comments": 1,
    "total_posts": 6
  }
  ```

## All posts in a specific category

- url: GET [{{dev_base_url}}/api/v1/admin/posts/{category}]()
- ```python
  headers:
    content-type: application/json
    Authorization: Bearer <token>
  ```
- ```json
  [
    {
      "comments": [],
      "content": "<p>“In his will, my late brother bequeathed his properties, assets, and cash. Among them were ...",
      "headline": "<p>Deputy President Rigathi Gachagua has strongly ...",
      "image": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728353580/Mmust-Josa_1728353578.jpg",
      "published_on": "Tue, 08 Oct 2024 05:12:48 GMT",
      "slug": "gachagua-denies-corruption-allegations,-cites-late-brother’s-assets-in-defense",
      "title": "Gachagua denies corruption allegations, cites late brother’s assets in defense"
    }
  ]
  ```

## Create Post
> **Data should be sent as form data**
- url: POST [{{dev_base_url}}/api/v1/admin/createpost]()
- ```python
  headers:
    content-type: multipart/form-data
    Authorization: Bearer <token>
  ```
- ```json
     {
      "title": "Title of the post",
      "headline": "a brief description about the post",
      "content": "The content of the post",
      "image": "The image file",
      "category": "Either of the following: [news, business, sports, entertainment]"

     }
  ```

## Update posts
 > working on it ....

## Delete posts

#### Admin has the previledge to delete any of his/her posts

- url: DELETE [{{dev_base_url}}/api/v1/admin/posts/delete/{slug}]()
- ```python
  headers:
    Authorization: Bearer <token>
  ```
  <br>

# ADMIN PROFILE

## Updating admin profile

- url: PUT [{{dev_base_url}}/api/v1/admin/update/profile]()
- ```python
  headers:
    content-type: multipart/form-data
    Authorization: Bearer <token>
  ```
> **If the user wants to change the password, the old and the new password should be submitted *ie***
- ```json
  "old_password": "password",
  "new_password": "new password"
  ```
- example of a request body
- ```json
      "first_name": "string" optional
      "last_name": "string" optional
      "email": "string" optional
      "image": "image file of the user" optional
  ```

## Get Admin Profile Info

- url: GET [{{dev_base_url}}/api/v1/admin/get/profile]()
- ```python
  headers:
    content-type: application/json
    Authorization: Bearer <token>
  ```
- ```json
  {
    "email": "user@gmail.com",
    "first_name": "Antony",
    "last_name": "Kariuki",
    "image_id": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1728748240/Mmust-Josa_1728748238.jpg"
  }
  ```
