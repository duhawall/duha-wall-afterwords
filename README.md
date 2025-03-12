# Afterwords.

## Overview

The app allows users to create notes or journal entries for their loved ones, meant for them to have access to after they pass away.
The aim is to provide them the type of intimate comfort and support they can only get from them during the early stages of grief.
To encourage healthy coping, the user will have a limit of 31 entries, providing a meaningful yet balanced way to stay connected without turning into a coping mechanism.

### Problem Space

Passing away and grief are deeply personal experiences, yet they are often left unspoken due to their intimate nature.
After my grandmother passed away, and as a cancer survivor, I have become more aware of mortality. So I started looking for ways to connect technology with deeper meaning to support each other.
It got me thinking, how can we create ways to support our loved ones even after we're gone?

### User Profile

The app is designed for two or more users at different points in time: the primary user (who initiates the experience), and the secondary user(s) (their loved ones) who access it later.
The primary user creates up to 31 entries per person over time and shares a unique identifier code (UIC) with their loved ones.
After a lifetime of cherished moments, the secondary user(s) can retrieve these messages using the UIC linked to their entries.

At this stage, the app relies on long-term trust and safekeeping, ensuring that entries are accessed only when the time is right.
However, recognizing the extended period before use for the secondary user(s), the app also aims to explore additional authentication methods in case of UIC loss.

# Afterwords.

## Overview

The app allows users to create notes or journal entries for their loved ones, meant for them to have access to after they pass away.
The aim is to provide them the type of intimate comfort and support they can only get from them during the early stages of grief.
To encourage healthy coping, the user will have a limit of 31 entries, providing a meaningful yet balanced way to stay connected without turning into a coping mechanism.

### Problem Space

Passing away and grief are deeply personal experiences, yet they are often left unspoken due to their intimate nature.
After losing my grandmother and surviving cancer, I have become more aware of mortality. So I started looking for ways to connect technology with deeper meaning to support each other.
It got me thinking, how can we create ways to support our loved ones even after we're gone?

### User Profile

The app is designed for two or more users at different points in time: the primary user (who initiates the experience), and the secondary user(s) (their loved ones) who access it later.
The primary user creates up to 31 entries per person over time and shares a unique identifier code (UIC) with their loved ones.
After a lifetime of cherished moments, the secondary user(s) can retrieve these messages using the UIC linked to their entries.

At this stage, the app relies on long-term trust and safekeeping, ensuring that entries are accessed only when the time is right.
However, recognizing the extended period before use for the secondary user(s), the app also aims to explore additional authentication methods in case of UIC loss.

### Features

User registration and setup
Entry creation/management
Secure text storage and access
Trust and authentication

## Implementation

### Tech Stack

Frontend:
React
SASS

Backend:
Node
Express
MySQL
JSON Web Token (JWT) - authenticating users maybe not if there's no time
bcrypt? maybe not if there's no time

Storage/Security:
Firebase - authentication instead of JWT? if there's time
AES-256 - encryption of data if there's time
UUID - creating unique ids for data and users' loved ones entries

### APIs

Express.js - server environment
JWT - authenticating users
Firebase - authenticating and storing data instead of mySQL?

### Sitemap

Homepage - (user login, code access, about section, how-to section)
Logged in - add loved one, create/read/update/delete user/loved ones/entries
Code access - access entries

### Mockups

#### Home Page

![](AfterwordsProposal/Design-2.JPG)

#### About Page

![](AfterwordsProposal/Design-2-About.JPG)

#### How To Page

![](AfterwordsProposal/Design-2-How-to.JPG)

#### Login Page

![](AfterwordsProposal/Design-2-Login.JPG)

#### Add Loved One Page

![](AfterwordsProposal/Design-2-Add.JPG)

#### Adding Loved One Info Page

![](AfterwordsProposal/Design-2-Adding.JPG)

#### Adding Entry Page

![](AfterwordsProposal/Design-2-Entry.JPG)

### Data

username/user email and password linked to data created > entries < loved ones linked to their UCI

### Endpoints

Primary user
**GET /about**
**GET /how-to**
**POST /register**
**GET /login**
**GET /user/:id**
**POST /user/:id/create-loved-one**
**POST /user/:id/loved-one/:id/create-entry**
**GET /user/:id/loved-one/:id/entries**
**GET /user/:id/loved-one/:id/entry/:id**
**PUT /user/:id**
**PUT /user/:id/loved-one/:id**
**PUT /user/:id/loved-one/:id/entry/:id**
**DELETE /user/:id**
**DELETE /user/:id/loved-one/:id**
**DELETE /user/:id/loved-one/:id/entry/:id**

Loved One
**GET /UCI**

<!-- **GET /loved-one/:id/entries** -->

**GET /loved-one/:id/entry/:id**

**GET /about**

- fetch the about component to learn more about the platform

**GET /how-to**

- fetch the how to component to understand how the platform works

**GET /user**

- log in to fetch user data saved with loved ones list and entries

Response:

```
[
    {
        "email": "duhaemousa@gmail.com",
        "password": "@tchoBlessYou",
    },
    ...
]
```

**GET /loved-one/:id/entries**

- fetch a specific loved one and their data

Response:

```
[
    {
        "id": 1,
        "email": "duhaemousa@gmail.com",
        "lovedOne": "Tony",
        "loved-one_id": 1,
        "entries": [
    "Hey there love, I just thought of when we went on our first date. I cannot believe it has been 20 years, and I get to wake up to your beautiful face today. I feel so blessed and I want you to know I cherish your presence and laughter. You warm my heart so much, and my life feels and smells the best, even with your farts. I love you to all my bits and yours",
    "Travelling without you sucks. I miss holding you at night. Surprisingly, it feels too quiet without you snoring here. I hope you are warm and the kiddos are having a blast at the camp! Counting the days till I get home and hold you all my love. Four more... Happy Valentine's Day babes",
  ],
    },
    ...
]
```

**GET /loved-one/:id/entry/:id**

- fetch a specific loved one and a specific entry

Response:

```
[
    {
        "id": 1,
        "email": "duhaemousa@gmail.com",
        "lovedOne": "Tony",
        "entries": [
    "Hey there love, I just thought of when we went on our first date. I cannot believe it has been 20 years, and I get to wake up to your beautiful face today. I feel so blessed and I want you to know I cherish your presence and laughter. You warm my heart so much, and my life feels and smells the best, even with your farts. I love you to all my bits and yours",
    "Travelling without you sucks. I miss holding you at night. Surprisingly, it feels too quiet without you snoring here. I hope you are warm and the kiddos are having a blast at the camp! Counting the days till I get home and hold you all my love. Four more... Happy Valentine's Day babes",
  ],
    },
    ...
]
```

**POST /register**

- create a new primary user account

Response:

```
[
    {
        "id": 1,
        "email": "duhaemousa@gmail.com",
        "password": "@tchoBlessYou",
        "confirmPassword": "@tchoBlessYou",
    },
    ...
]
```

**POST /login**

- login to user account

Response:

```
[
    {
        "email": "duhaemousa@gmail.com",
        "password": "@tchoBlessYou",
    },
    ...
]
```

**POST /user/create-loved-one**

- create a new loved one profile + a UCI

Response:

```
[
    {
        "lovedOne": "Tony",
        "UCI": "a7e0ee39-dc18-4f6b-8d69-d6770f8835f7",
    },
    ...
]
```

**POST /loved-one-entry**

- create a new entry for a specific loved one

Response:

```
[
    {
        "lovedOne": "Tony",
        "newEntry": "",
    },
    ...
]
```

**PUT /loved-one-entry/:id**

- update a specific loved one's entry

Response:

```
[
    {
        "lovedOne": "Tony",
        "newEntry": "",
    },
    ...
]
```

## Roadmap

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Deploy client and server projects so all commits will be reflected in production

- Feature: Home page

- Feature: About page

  - Implement register page + form
  - Create GET /about endpoint

- Feature: How To page

  - Implement how to page
  - Create GET /howTo endpoint

- Feature: Add a Loved One

  - Implement add loved one page
  - Store given name and UCI in the backend
  - Create GET /addLovedOne/ endpoint

- Feature: Add an Entry to Loved One

  - Implement view loved ones page
  - Create GET /lovedOne/:id/entry/:id

- Feature: Login to account

  - Implement login page + form
  - Create POST /users/login endpoint

- DEMO DAY

## Future Implementations

- Feature: Create account

  - Implement registeration page with authentication
  - Create POST /users/register endpoint

- Feature: Implement JWT tokens
  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

# duha-wall-afterwords-proposal
