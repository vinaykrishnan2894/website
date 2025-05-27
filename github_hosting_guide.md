# GitHub Hosting and Domain Connection Guide

This guide will walk you through the process of hosting your portfolio website on GitHub Pages and connecting it to your custom domain (vinaykrishnan.in).

## Step 1: Create a GitHub Repository

1. Sign in to your GitHub account (or create one at [github.com](https://github.com) if you don't have one)
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Name your repository: `vinaykrishnan.github.io` (replace "vinaykrishnan" with your GitHub username)
4. Make sure the repository is set to "Public"
5. Click "Create repository"

## Step 2: Upload Your Website Files

### Option 1: Using Git Command Line

1. Open a terminal/command prompt on your computer
2. Navigate to your portfolio website folder
3. Initialize a Git repository and push your files:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/vinaykrishnan.github.io.git
git push -u origin main
```

### Option 2: Using GitHub Web Interface

1. Go to your newly created repository on GitHub
2. Click on "uploading an existing file" link
3. Drag and drop all your website files and folders
4. Add a commit message like "Initial website upload"
5. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for your site to be published
7. GitHub will provide a URL where your site is published (usually https://yourusername.github.io)

## Step 4: Configure Custom Domain (vinaykrishnan.in)

### Step 4.1: Add Custom Domain in GitHub

1. In your repository's "Settings" tab, scroll to the "GitHub Pages" section
2. In the "Custom domain" field, enter `vinaykrishnan.in`
3. Check the box for "Enforce HTTPS" (recommended for security)
4. Click "Save"
5. GitHub will create a file called `CNAME` in your repository with your domain name

### Step 4.2: Configure DNS at GoDaddy

1. Log in to your GoDaddy account
2. Go to "My Products" > "Domains" and select vinaykrishnan.in
3. Click on "DNS" or "Manage DNS"
4. You need to add the following DNS records:

#### Option A: Using an A record (recommended)
Add these four A records pointing to GitHub's IP addresses:
- Type: A, Host: @, Value: 185.199.108.153, TTL: 1 hour
- Type: A, Host: @, Value: 185.199.109.153, TTL: 1 hour
- Type: A, Host: @, Value: 185.199.110.153, TTL: 1 hour
- Type: A, Host: @, Value: 185.199.111.153, TTL: 1 hour

#### Option B: Using a CNAME record
- Type: CNAME, Host: www, Value: yourusername.github.io, TTL: 1 hour
- Type: CNAME, Host: @, Value: yourusername.github.io, TTL: 1 hour (if GoDaddy allows CNAME for root domain)

Note: Some DNS providers don't allow CNAME records for root domains. If that's the case with GoDaddy, use Option A.

## Step 5: Wait for DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to propagate globally. During this time, your website might not be accessible at your custom domain.

## Step 6: Verify Domain Setup

1. After DNS propagation (usually within a few hours), visit `vinaykrishnan.in` in your browser
2. Your portfolio website should now be live at your custom domain
3. Make sure HTTPS is working correctly (look for the padlock icon in your browser)

## Updating Your Website

Whenever you want to update your website:

### Using Git Command Line

1. Make changes to your local files
2. Commit and push the changes:

```bash
git add .
git commit -m "Update website content"
git push
```

### Using GitHub Web Interface

1. Navigate to your repository on GitHub
2. Find the file you want to edit and click on it
3. Click the pencil icon to edit
4. Make your changes
5. Add a commit message
6. Click "Commit changes"

GitHub Pages will automatically rebuild and deploy your site after each commit.

## Troubleshooting

- **404 Error**: Make sure your repository is named correctly and GitHub Pages is enabled
- **Domain Not Working**: Double-check your DNS settings and give more time for propagation
- **HTTPS Not Working**: Make sure "Enforce HTTPS" is checked in GitHub Pages settings
- **Custom Domain Not Saving**: Ensure there are no typos in your domain name

If you encounter any issues, GitHub's documentation on GitHub Pages is an excellent resource: [GitHub Pages Documentation](https://docs.github.com/en/pages)
