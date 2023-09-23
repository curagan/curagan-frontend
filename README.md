# Curagan

## Commit Message Guidelines

Our project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages to ensure consistency and clarity. The project also utilize tooling like Husky and Commitizen to assist and enforce this.

### Format

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
