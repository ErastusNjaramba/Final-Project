SlumTreasures

Discover Kibera's Hidden Gems

SlumTreasures is a web application designed to showcase the vibrant culture, resilience, and hidden treasures of Kibera, one of Africa's largest slums. With guided tours and a shop featuring local artisan products, this project connects visitors with authentic experiences while supporting the community. Built with Firebase for hosting and Firestore for data management, and integrated with IntaSend for payments, SlumTreasures offers an immersive online platform.

Table of Contents
Features
Tech Stack
Prerequisites
Installation
Configuration
Running Locally
Deploying to Firebase
Usage
Troubleshooting
Contributing
License
Contact
Features
Tour Listings: Explore a variety of guided tours in Kibera, from cultural immersion to tech innovation, with detailed descriptions and booking options.
Shop: Purchase unique, locally-crafted items like paintings, bracelets, and sculptures, supporting Kibera artisans.
Payment Integration: Securely book tours or buy products using IntaSend’s payment gateway (Sandbox mode for testing).
Responsive Design: Mobile-friendly layout with a hamburger menu for navigation.
Learn More Popups: Interactive popups provide tour details and expectations.
Firebase Hosting: Fast, reliable hosting with local emulation for development.
Tech Stack
Frontend: HTML, CSS (custom styles.css), JavaScript (script.js)
Backend: Firebase Hosting, Firestore (optional for storing bookings/purchases)
Payments: IntaSend Checkout SDK
Dependencies:
Firebase SDK v9.6.1 (CDN)
IntaSend Checkout v1 (CDN)
Prerequisites
Before setting up the project, ensure you have:

Node.js and npm: Install from nodejs.org (v14+ recommended).
Firebase CLI: Install globally with npm install -g firebase-tools.
Java: Required for Firebase emulators (OpenJDK 11+). Install on Ubuntu with sudo apt-get install openjdk-11-jre.
IntaSend Account: Sign up at intasend.com for API keys.
Firebase Account: Sign up at firebase.google.com.
Installation
Clone the Repository (if hosted on GitHub):
bash

Collapse

Wrap

Copy
git clone https://github.com/your-username/slumtreasures.git
cd slumtreasures
Alternatively, create a local directory:
bash

Collapse

Wrap

Copy
mkdir SlumTreasures
cd SlumTreasures
Set Up Project Structure:
Place index.html, script.js, and styles.css in the root directory (~/Shield/SlumTreasures).
Ensure files match the versions provided earlier in our conversation.
Install Firebase CLI (if not already installed):
bash

Collapse

Wrap

Copy
npm install -g firebase-tools
Verify with firebase --version.
Install Java (for emulators):
bash

Collapse

Wrap

Copy
sudo apt-get update
sudo apt-get install openjdk-11-jre
Verify with java -version.
Configuration
Firebase Setup:
Log in to Firebase:
bash

Collapse

Wrap

Copy
firebase login
Initialize Firebase in your project directory:
bash

Collapse

Wrap

Copy
firebase init
Select Hosting and Firestore (optional).
Choose your existing "SlumTreasures" project or create a new one.
Set public directory to . (current directory).
Configure as a single-page app? No.
Update script.js with your Firebase config (already done):
javascript

Collapse

Wrap

Copy
const firebaseConfig = {
    apiKey: "AIzaSyDaQ1NM-IFQRZp6Ssq6DEwTKxnEFIh89MQ",
    authDomain: "slumtreasures.firebaseapp.com",
    projectId: "slumtreasures",
    storageBucket: "slumtreasures.firebasestorage.app",
    messagingSenderId: "552745029250",
    appId: "1:552745029250:web:2cac1aa554a6bbb9b0ee9b",
    measurementId: "G-R4Q6QH37XF"
};
IntaSend Setup:
Log in to sandbox.intasend.com.
Switch to Sandbox mode (top-right toggle).
Go to Settings > API Keys, copy the Test Public Key (e.g., ISPubKey_test_...).
Update script.js:
javascript

Collapse

Wrap

Copy
const intasend = new Intasend({
    publicAPIKey: "ISPubKey_test_your-sandbox-key", // Replace with your Sandbox key
    live: false // Sandbox mode
});
Firestore (Optional):
If you want to save bookings/purchases, uncomment and configure Firestore in script.js:
javascript

Collapse

Wrap

Copy
const db = firebase.firestore();
db.collection('bookings').add({ product, amount, transactionId: response.transaction.id });
Set up Firestore security rules in the Firebase Console.
Running Locally
Start Firebase Emulators:
bash

Collapse

Wrap

Copy
firebase emulators:start
Hosting: http://localhost:5000
Firestore (if enabled): http://localhost:4000/firestore
Test Features:
Open http://localhost:5000 in your browser.
Click "Book Now" or "Buy Now" to trigger the IntaSend popup.
Use Sandbox test credentials:
Card: 4242 4242 4242 4242
Expiry: 12/25
CVV: 123
Deploying to Firebase
Build and Deploy:
bash

Collapse

Wrap

Copy
firebase deploy
Your site will be live at https://slumtreasures.web.app (or your custom domain).
Verify Deployment:
Visit the URL, test payment buttons, and check Console (F12) for errors.
Usage
Navigation: Use the top navbar or hamburger menu (mobile) to explore sections: Home, Tours, Guides, Shop, Contact.
Tours: Browse tours, click "Learn More" for details, or "Book Now" to pay via IntaSend.
Shop: View products, click "Buy Now" to purchase.
Payments: In Sandbox mode, transactions are test-only and don’t charge real money.
Troubleshooting
Firebase Emulators Won’t Start:
Error: Could not spawn 'java -version':
Install Java: sudo apt-get install openjdk-11-jre.
Add to PATH: export PATH=$PATH:/usr/lib/jvm/openjdk-11/bin and source ~/.bashrc.
Retry: firebase emulators:start.
IntaSend Popup Not Appearing:
Check Console (F12):
"Invalid API key": Ensure Sandbox key matches live: false.
"IntaSend not defined": Verify <script src="https://js.intasend.com/checkout/v1/intasend-checkout.js"> in index.html.
Test with Sandbox credentials.
Firebase Initialization Fails:
Verify firebaseConfig matches Firebase Console (Project Settings > Your apps > Web app).
General Debugging:
Run firebase emulators:start --debug for detailed logs.
Check Network tab (F12) for script loading issues.
Contributing
Fork the repository (if on GitHub).
Create a feature branch: git checkout -b feature-name.
Commit changes: git commit -m "Add feature".
Push: git push origin feature-name.
Open a pull request.
License
This project is licensed under the MIT License. See LICENSE for details.

Contact
Email: info@slumtreasures.com
Phone: +254 123 456 789
Social: Facebook | Instagram | Twitter