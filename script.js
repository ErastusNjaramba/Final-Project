// Firebase Configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Intasend Integration
const intasend = new Intasend({
    publicAPIKey: "your-intasend-public-key", // Replace with your Intasend public key
    live: false // Set to true for live transactions
});

document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', () => {
        const amount = parseInt(button.getAttribute('data-amount')); // Amount in cents
        const product = button.getAttribute('data-product');

        const checkout = intasend.initialize({
            amount: amount,
            currency: "USD",
            email: "customer@example.com", // Replace with dynamic customer email
            reference: `order_${Date.now()}_${product}`,
            callback: function (response) {
                if (response.success) {
                    alert('Payment successful! Transaction ID: ' + response.transaction.id);
                    // Optionally save to Firebase or handle post-payment logic
                } else {
                    alert('Payment failed: ' + response.message);
                }
            }
        });

        checkout.show();
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});