# Git Version Control Guide

## First-time Git setup
### 1. Install [Git](https://git-scm.com/install/)

#### Windows
Open PowerShell or Command Prompt as an Administrator and run:
```
winget install --id Git.Git -e --source winget
```

#### MacOS
Open your terminal and run:
```xcode-select --install```

### 2. Link Git with your GitHub Account
```
git config --global user.name "Name"
git config --global user.email "you@example.com"
```

## Setting up the repository
**1. Install [Node.js](https://nodejs.org/), [pnpm](https://pnpm.io/installation), and [VS Code](https://code.visualstudio.com/download) (recommended code editor).**

**2. Clone the repo and install dependencies**
```
git clone https://github.com/UF-GDG-Projects/gdg-platform.git
cd gdg-platform
pnpm install
```

## Git Workflow
**1. Start from `main`:**
```
git switch main
git pull
```
**2. Create a branch:**
```
git switch -c feat/[descriptive-name]
```
**3. Make your changes and commit**
```
pnpm run lint                 # Make sure your code passes the linter
git status                    # See what changed
git add path/to/file          # Stage specific files
git commit -m "Add ..."
```
Commit messages should be short, *present tense*, and describe what the commit does. Try to make small, focused commits for easier review.

**4. Push your branch and its commits**
```
git push -u origin feat/[descriptive-name]
```
After the pushing your branch you can just run `git push`.

**5. Open a pull request and fill out the PR template.**

Main is protected so PR is required and direct commits are rejected.
Wait for a project lead to assess and merge your changes.

## Notes
- Run `git pull` frequently to ensure you are on latest branch.
- Never commit secrets, such as `.env` files.
- Commits should make sense and not have unrelated changes.
- To change the message of your last commit: `git commit --amend -m "New commit message"`
- To undo your last commit entirely (not pushed yet): `git reset --soft HEAD~1`.
- If your branch ever falls behind main run `git fetch origin && git merge origin/main`. If merge conflicts occur, I would use VS Code's interface.
