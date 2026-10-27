# Dawood Khan — Animated Personal Portfolio

A responsive, animated personal portfolio built with plain HTML, CSS, and JavaScript. It can be hosted free on GitHub Pages and does not require a build step.

## Included

- Responsive layout for desktop, tablet, and mobile
- Animated hero graphic, scroll reveal effects, and reading progress bar
- About, skills, projects, education/experience timeline, CV, and contact sections
- Project filters: All / Ongoing / Completed
- Content configured in `script.js`
- CV link placeholder at `assets/cv.pdf`

## Before publishing

1. Replace placeholder/sample project content in `script.js` with accurate details.
2. Update GitHub, LinkedIn, and email URLs in `script.js`.
3. Add your CV PDF at `assets/cv.pdf` (keep the filename `cv.pdf`) or change the links in `index.html`.
4. Remove any project, education, or experience entry that does not apply to you.
5. Do not put passwords, API keys, private information, or anything you do not want public in this repository. A public GitHub repository means the website source and uploaded CV are publicly accessible.

## Preview locally

Open `index.html` in a browser. For best results, use VS Code with the Live Server extension, then choose **Open with Live Server**.

## Publish with GitHub Pages

1. Sign in at https://github.com/ and create a **public** repository named `personal-website`.
2. Extract this project folder on your computer.
3. Upload the contents of this folder (not an extra enclosing folder) to the repository. The repository root should contain `index.html`, `style.css`, `script.js`, `README.md`, and `assets/`.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main`, folder `/ (root)`, and click **Save**.
7. Wait a few minutes. The website URL should be `https://YOUR-USERNAME.github.io/personal-website/`.
8. If it does not appear, open **Actions** and inspect the Pages deployment for errors.

Official guide: https://docs.github.com/en/pages/quickstart

## Updating your site later

Edit `script.js`, `index.html`, or `style.css`, then commit/push the changes to the `main` branch. GitHub Pages republishes the site.

## CV and project links

GitHub Pages is static hosting. It cannot run a private admin dashboard or securely receive uploads. For this starter version, update your PDF and project details in the repository and push the changes. Anything committed to a public repository can be viewed or downloaded by others.
