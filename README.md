# CURAGAN

![](https://res.cloudinary.com/djudfrj8s/image/upload/v1699534150/curagan/curagan_Phone_i1noo3.png)

## Table of Content

- [About the Project](#about-the-project)
  - [Key Features](#Key-Features)
  - [Links](#Links)
  - [Team](#Team)
- [Our process](#Our-process)
  - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Important Scripts](#important-scripts)
  - [Details](#details)
- [Author](#author)

## About the Project

Curagan is your bridge to hassle-free healthcare consultations. This web platform connects patients with doctors, enabling easy scheduling of appointments for timely medical advice and check-ups.
Curagan aims to streamline the process of health consultations, making it more accessible and efficient for everyone involved.

### Key Features

- **User-Friendly Appointment Booking:** Patients can browse through doctor profiles and schedule appointments with ease.
- **Real-Time Availability:** See which doctors are available in real-time and choose a slot that suits your schedule.
- **Virtual Consultations:** Secure and private online consultation rooms for patients and doctors.
- **Notifications:** Automated notification appointments status.

### Links

https://curagan-frontend-personal.vercel.app/beranda

### Team

| Name           | Role                       |
| :------------- | :------------------------- |
| Okky Anggoro   | Frontend Developer & UI UX |
| Derian Melvin  | Frontend Developer & UI UX |
| Arya Immanuel  | Frontend Developer         |
| Yanky Hermawan | Backend Developer          |
| Mahdi Harish   | Backend Developer          |

### Tech Stack

The following technologies were used to build this project:

- **Typescript**
- **NextJS**
- **Tailwind**
- **Vercel**
- **Express**
- **Python**
- **Railway**
- **Postgres**

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

First, make sure that you have the following installed on your machine:

- Node.js (version 16 or later)

> I recommend you have installed `nvm` in order to set the right node version to run this project
>
> ```sh
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
> ```

### Installation

1. Clone the repository to your local machine.
2. Run `npm i` in the project directory to install the necessary dependencies.
3. Put your own ENV in .ENV
4. Run `npm dev` to start the application in development mode.

### Important Scripts

```sh
git clone https://github.com/curagan/curagan-frontend # Clone the repository
npm  i # Install all dependencies
npm run dev # Start the application in development mode
```

###Details

#### Commit Message Guidelines

Our project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages to ensure consistency and clarity. The project also utilize tooling like Husky and Commitizen to assist and enforce this.

#### Format

Each commit message consists of a **header**, **body**, and **footer**. The header is mandatory, while the body and footer are optional.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

#### Header

The header is the most crucial part of the commit message:

- **type**: This represents the nature of the change and can be one of the following:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation-only changes
  - `style`: Changes that don't affect the meaning of the code (white-space, formatting, etc.)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `test`: Adding or modifying tests
  - `chore`: Changes to the build process or auxiliary tools/libraries/documentation

#### Body

This is where you can provide a more detailed description of the change. You can explain the motivation for the change, contrast this with previous behavior, or even reasons for certain parts of the change.

#### Footer

This is where you can reference any issues related to this commit (e.g., `Closes #42` or `Related to #57`).

### Using Commitizen

---

To make crafting these commit messages easier, we've integrated Commitizen:

1. Stage your changes: `git add .`
2. Run: `npm run commit`
3. Follow the interactive prompts to craft your commit message.

### Manual Commits

---

If you prefer not to use Commitizen:

1. Stage your changes: `git add .`
2. Commit your changes: `git commit -m "type(scope): subject"`
3. Ensure your commit message follows the Conventional Commits format.

### Commit Linting

We use `commitlint` to ensure that commit messages adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format. If your commit message doesn't meet the standard, the commit will fail. Adjust the message accordingly and try again.

## Author

- **Okky Anggoro**
  <a href="https://github.com/anggr" target="blank"><img align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="okky-anggoro" height="30" width="100" /></a>
- **Derian Melvin**
  <a href="https://github.com/DerianMelvin" target="blank"><img align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="okky-anggoro" height="30" width="100" /></a>
- **Arya Immanuel**
  <a href="https://github.com/aryaimmanuel" target="blank"><img align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="okky-anggoro" height="30" width="100" /></a>
- **Yanky Hermawan**
  <a href="https://github.com/yankyhermawan" target="blank"><img align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="okky-anggoro" height="30" width="100" /></a>
- **Mahdi Harish**
  <a href="https://github.com/mahdiharish" target="blank"><img align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="okky-anggoro" height="30" width="100" /></a>
