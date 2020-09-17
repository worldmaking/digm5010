# git notes

- Go to your github.com/[username] 
  - (Make sure you are signed in)
- Repositories tab
  - Green button "new"
    - Name: `digm5010`
    - Public
    - Add Readme
    - Add .gitignore, template `Node`
    - Choose license appropriately
    - Create Repository
- Code Tab
  - Branches drop-down window
  - Find or create a branch...
    - Type `gh-pages` (enter)
  - Your website is now published at https://[username].github.io/digm5010

- See Green `Code` tab
  - Copy the URL under "Clone with HTTPS" (or "Clone with SSH" if you have [set up SSH keys](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account))
  
- Open up VS Code
  - Open up the Terminal (Menu View / Terminal or Terminal / Open Terminal)
  - In the terminal:
    - navigate to the folder you want to clone into (using `ls`, and `cd [path]`), 
      - where [path] is a relative or absolute path to a folder (e.g. `Documents` to cd into the Documents subfolder of your current path, or `..` to navigate up one folder, etc.)
    - Clone the repo by `git clone [URL]` where URL is the path you copied from the Github Code dropdown above.
      - This creates a local copy of your repository in the `digm5010` subfolder of this path
      - `cd digm5010` to go into this repo
      - `git checkout -b gh-pages` to change to the `gh-pages` branch
      - `git branch` to show what branches we have (asterisk shows which one we are in)
      - `git push -u origin gh-pages` to tell our local `gh-pages` branch to push to the remote (Github cloud) `gh-pages` branch

Great, you now have a local copy of the repo. Now you can make changes and pull & push!

- Open that new repository in VSCode
  - E.g. File -> Open Folder -> select the repo
  - Or, in Windows you might be able to find it in File Explorer and right-click to pick 'Open in Code'
  - Now open the Terminal again (Menu View / Terminal)
  - Make changes to a local file, e.g. edit `Readme.md` or create a new `index.html`
  - `git status` will tell you what you have changed locally
  - `git add [filenames]` to **stage** files for committing
  - `git commit -m "[notes about why change was made]"` to **commit** the change, adding notes to remind my future self what I was thinking of
  - `git pull` to grab any changes anyone else might have made and resolve any merge conflicts if there are
    - if you cloned with HTTPS you will need to put in your Github password at this point
  - `git push` to upload this to the remote repository.
    - if you cloned with HTTPS you will need to put in your Github password at this point
    - or `git push -u origin gh-pages` if it complains about not knowing which branch to push to -- should only need to be done once.
  - Your update should now be live, or will be within a few minutes


Micheal's recommended links:

- [Git best practices](https://github.com/worldmaking/worldmaking.github.io/wiki/Git-Best-Practices) on Alice lab wiki
- [Mozilla Open Leaders](https://foundation.mozilla.org/en/initiatives/mozilla-open-leaders/)
- Recommended Markdown editors
  - MacDown [https://macdown.uranusjr.com/]()
  - Haroopad [http://pad.haroopress.com/]()
- [Explaining git using D3](https://onlywei.github.io/explain-git-with-d3/)

Git colours in terminal:

```
git config --global color.ui auto
git config --global color.branch auto
git config --global color.status auto
```
