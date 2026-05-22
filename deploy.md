# 🚀 Deployment Guide: Angular to cPanel

This document provides a complete guide for deploying your **Al-Sahel-Repair** Angular application to a cPanel web hosting server, utilizing the automated `.htaccess` build configuration.

---

## 📂 The `dist/al-sahel-repair/browser` Folder Explained

In modern Angular (v17+), the build system (`@angular/build:application`) is designed to support both client-side static content and server-side rendering (SSR). 

- **Why is there a `browser` folder?** 
  Angular separates the output into a `browser` folder (containing static files: `index.html`, Javascript, CSS, images) and a `server` folder (if Server-Side Rendering is enabled).
- **What does this mean for deployment?**
  Since your project is configured as a static Single Page Application (SPA), **all files you need to deploy are located inside `dist/al-sahel-repair/browser/`**.
  > [!IMPORTANT]
  > When uploading your website to cPanel, you must upload the **contents** of the `dist/al-sahel-repair/browser` folder directly, **not** the `dist` folder or the `al-sahel-repair` folder itself.

---

## 🛠️ Automated `.htaccess` Generation

Single Page Applications (SPAs) like Angular handle routing dynamically in the browser. Without proper server configuration, refreshing any page other than the homepage (e.g., `/services` or `/contact`) will result in a **404 Not Found** error on Apache/cPanel.

To solve this, we configured an automated `.htaccess` setup:

1. **The Source**: We created a `.htaccess` file inside the `public/` directory.
2. **The Build**: Angular is configured to copy everything from `public/` into the root of the output directory `dist/al-sahel-repair/browser/` during the build process.
3. **The Result**: Every time you run `npm run build`, the `.htaccess` file is automatically generated next to your `index.html` in the build output!

### The `.htaccess` Rules Used:
```apache
RewriteEngine On
# If an actual file or directory is requested, serve it directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Otherwise, redirect all other requests to index.html (flawless Angular routing)
RewriteRule ^ index.html [L]
```

---

## 📝 Step-by-Step cPanel Deployment Guide

Follow these steps to deploy your application to production:

### Step 1: Run the Production Build
Run the standard build command in your terminal. This compiles the application and generates the `.htaccess` file automatically in the `dist` directory:
```bash
npm run build
```

### Step 2: Compress your Build Files
1. Open your project folder in your operating system's file explorer.
2. Navigate to `dist/al-sahel-repair/browser`.
3. Select **all files and folders** inside the `browser` folder (including `.htaccess`, `index.html`, `main-...js`, `assets/`, etc.).
4. Right-click and choose **Compress** or **Send to Compressed (zipped) Folder**. Save it as `build.zip`.
   > [!TIP]
   > Zipping the files first makes the upload to cPanel 10x faster than uploading individual files, and ensures no files are missed.

### Step 3: Upload to cPanel File Manager
1. Log in to your **cPanel dashboard**.
2. Search for and open **File Manager**.
3. Navigate to the folder representing your domain:
   - **Main Domain**: Navigate to `public_html`.
   - **Subdomain or Addon Domain**: Navigate to the specific directory assigned to it (e.g., `public_html/subdomain-folder` or similar).
4. Click the **Upload** button in the top menu of File Manager.
5. Drag and drop your `build.zip` file into the upload box.

### Step 4: Extract the Files
1. Once the upload finishes, return to File Manager.
2. Select `build.zip` and click **Extract** in the top toolbar (or right-click and choose Extract).
3. Specify the path (e.g., `/public_html` or your domain's folder) and click **Extract Files**.
4. You can now delete the `build.zip` file to keep your server clean.

### Step 5: Verify `.htaccess` is Visible
By default, cPanel hides files starting with a dot (like `.htaccess`).
1. In the top-right corner of cPanel File Manager, click **Settings**.
2. Check the box for **"Show Hidden Files (dotfiles)"** and click **Save**.
3. Ensure `.htaccess` is present in the folder alongside `index.html`.

---

## 💡 Handling Custom Paths & Subdirectories

Since you are deploying your project inside the subdirectory `/al-sahel-repair/` (`https://usamatahreem.com/al-sahel-repair`), we have **automated** this process entirely for you:

1. **Pre-configured Build**: We updated the `build` script in your `package.json` to automatically compile using:
   ```json
   "build": "ng build --base-href=/al-sahel-repair/"
   ```
   So simply running **`npm run build`** compiles everything perfectly configured for your subdirectory!
2. **Relative Image Paths**: We converted all absolute image paths (e.g. `src="/img/..."`) in your codebase into relative paths (e.g. `src="img/..."`). This allows the browser to resolve them relative to the `<base href="/al-sahel-repair/">` configuration dynamically.

---

## ⚡ Production Optimizations (Optional but Recommended)

To make your cPanel website load even faster, you can add Gzip compression and browser caching rules to your `.htaccess` file. Here is the recommended production-ready `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  # If an actual file or directory is requested, serve it directly
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  # Otherwise, redirect all other requests to index.html
  RewriteRule ^ index.html [L]
</IfModule>

# ----------------------------------------------------------------------
# Gzip Compression (Speed boost!)
# ----------------------------------------------------------------------
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# ----------------------------------------------------------------------
# Browser Caching (Speeds up repeat visits!)
# ----------------------------------------------------------------------
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>
```

Your app is now fully optimized and production-ready for cPanel! 🎉
