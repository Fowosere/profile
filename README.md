
# NFC-Triggered Profile Page

This is a simple HTML/CSS/JavaScript profile page designed to be triggered by an NFC card. When a user scans the appropriate NFC card, this page will display the profile information.

## Features

- Clean, responsive design
- Profile image upload functionality
- Contact actions (message, call, video, email)
- Contact details display
- Optional NFC detection (for supported browsers)

## How to Use

1. **Basic Setup:**
   - Copy these files to your web server or hosting service
   - Open `index.html` in a browser to see the profile page

2. **NFC Integration:**
   - Web NFC API is currently only supported in Chrome for Android (and requires enabling a flag)
   - For practical use, you may need a native app approach or QR code alternative

3. **Customization:**
   - Edit the profile information in `index.html`
   - Modify the styles in `styles.css` to match your branding
   - Extend functionality in `script.js` as needed

## Implementation Options

### Option 1: NFC Card with URL
Program your NFC card to open a specific URL where this profile page is hosted.

### Option 2: QR Code Alternative
Generate a QR code that links to the profile page for devices without NFC support.

### Option 3: Native App Integration
For more robust NFC functionality, consider wrapping this in a simple WebView within a native app.

## Notes for Production

- Add proper authentication if this contains sensitive information
- Consider adding analytics to track profile views
- Implement proper error handling for production environments
