// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDaQ1NM-IFQRZp6Ssq6DEwTKxnEFIh89MQ",
        authDomain: "slumtreasures.firebaseapp.com",
        projectId: "slumtreasures",
        storageBucket: "slumtreasures.firebasestorage.app",
        messagingSenderId: "552745029250",
        appId: "1:552745029250:web:2cac1aa554a6bbb9b0ee9b",
        measurementId: "G-R4Q6QH37XF"
    };

    // Initialize Firebase
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (error) {
        console.error('Firebase initialization failed:', error);
    }

    // Optional Analytics
    if (typeof firebase.analytics === 'function') {
        firebase.analytics();
    }

    // IntaSend Integration
    if (typeof Intasend === 'undefined') {
        console.error('IntaSend not loaded. Check script src or network.');
    } else {
        const intasend = new Intasend({
            publicAPIKey: "ISPubKey_test_a30ca0b6-898a-4182-865a-a67e2cbd1866",
            live: false
        });

        // Handle Tour Bookings
        const bookNowButtons = document.querySelectorAll('.book-now');
        if (bookNowButtons.length === 0) {
            console.error('No .book-now buttons found in DOM');
        }
        bookNowButtons.forEach(button => {
            button.addEventListener('click', () => {
                const amount = parseInt(button.getAttribute('data-amount')) / 100;
                const product = button.getAttribute('data-product');
                try {
                    const checkout = intasend.initialize({
                        amount: amount,
                        currency: "USD",
                        email: "customer@example.com",
                        reference: `tour_${Date.now()}_${product}`,
                        callback: function(response) {
                            if (response.success) {
                                alert('Payment successful! Transaction ID: ' + response.transaction.id);
                            } else {
                                alert('Payment failed: ' + response.message);
                            }
                        }
                    });
                    checkout.show();
                } catch (error) {
                    console.error('IntaSend initialization failed:', error);
                }
            });
        });

        // Handle Shop Purchases
        const buyNowButtons = document.querySelectorAll('.buy-now');
        if (buyNowButtons.length === 0) {
            console.error('No .buy-now buttons found in DOM');
        }
        buyNowButtons.forEach(button => {
            button.addEventListener('click', () => {
                const amount = parseInt(button.getAttribute('data-amount')) / 100;
                const product = button.getAttribute('data-product');
                try {
                    const checkout = intasend.initialize({
                        amount: amount,
                        currency: "USD",
                        email: "customer@example.com",
                        reference: `shop_${Date.now()}_${product}`,
                        callback: function(response) {
                            if (response.success) {
                                alert('Purchase successful! Transaction ID: ' + response.transaction.id);
                            } else {
                                alert('Payment failed: ' + response.message);
                            }
                        }
                    });
                    checkout.show();
                } catch (error) {
                    console.error('IntaSend initialization failed:', error);
                }
            });
        });
    }

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });
    }

    // Tours Section - Show More/Show Less
    const showMoreButton = document.querySelector('.tours-section .show-more');
    const tourCards = document.querySelectorAll('.tours-section .card');
    const initialTourCards = 4;
    if (showMoreButton && tourCards.length > 0) {
        tourCards.forEach((card, index) => {
            if (index >= initialTourCards) card.classList.add('hidden');
        });
        showMoreButton.addEventListener('click', () => {
            if (showMoreButton.textContent === 'Show More') {
                tourCards.forEach(card => card.classList.remove('hidden'));
                showMoreButton.textContent = 'Show Less';
            } else {
                tourCards.forEach((card, index) => {
                    if (index >= initialTourCards) card.classList.add('hidden');
                });
                showMoreButton.textContent = 'Show More';
            }
        });
    }

    // Shop Section - View More/View Less
    const viewMoreButton = document.createElement('button');
    viewMoreButton.className = 'show-more';
    viewMoreButton.textContent = 'View More';
    const shopSection = document.querySelector('.shop-section');
    const shopCards = document.querySelectorAll('.shop-section .shop-card');
    const initialShopCards = 4;
    if (shopSection && shopCards.length > 0) {
        shopSection.appendChild(viewMoreButton);
        shopCards.forEach((card, index) => {
            if (index >= initialShopCards) card.classList.add('hidden');
        });
        viewMoreButton.addEventListener('click', () => {
            if (viewMoreButton.textContent === 'View More') {
                shopCards.forEach(card => card.classList.remove('hidden'));
                viewMoreButton.textContent = 'View Less';
            } else {
                shopCards.forEach((card, index) => {
                    if (index >= initialShopCards) card.classList.add('hidden');
                });
                viewMoreButton.textContent = 'View More';
            }
        });
    }

    // Learn More Popup
    const popup = document.getElementById('tour-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDetails = document.getElementById('popup-details');
    const closePopup = document.querySelector('.close-popup');
    const learnMoreButtons = document.querySelectorAll('.learn-more');

    if (!popup || !popupTitle || !popupDetails || !closePopup || learnMoreButtons.length === 0) {
        console.error('Popup elements missing:', { popup, popupTitle, popupDetails, closePopup, learnMoreButtons: learnMoreButtons.length });
    } else {
        const tourDetails = {
            "Cultural Immersion Tour": {
                description: "This tour dives into Kibera's rich traditions, music, and art, guided by local experts. Duration: 3 hours. Includes cultural performances.",
                expectations: "Expect an immersive experience with live music, dance, and art demonstrations. You'll meet local artists, enjoy traditional snacks, and receive a small handmade souvenir."
            },
            "Community Engagement Tour": {
                description: "Meet local leaders and explore community projects shaping Kibera's future. Duration: 2.5 hours.",
                expectations: "Expect to interact with community organizers, visit active projects, and learn about grassroots initiatives. Bring comfortable shoes for walking."
            },
            "Kibera Food Tour": {
                description: "Taste authentic Kenyan street food with a local guide. Duration: 2 hours. Includes 3 food stops.",
                expectations: "Expect a culinary adventure with dishes like ugali and nyama choma. Bring an appetite and some cash for extra treats!"
            },
            "Street Art Tour": {
                description: "Discover vibrant murals and street art with a photography guide. Duration: 3 hours.",
                expectations: "Expect to capture stunning photos, learn about the stories behind the art, and get tips from a pro photographer. Bring your camera or smartphone."
            },
            "History of Kibera Tour": {
                description: "Learn about Kibera's origins and evolution. Duration: 2.5 hours. Includes historical landmarks.",
                expectations: "Expect a storytelling journey through Kibera’s past, visiting key sites. Wear comfortable clothing and be ready to ask questions."
            },
            "Kids in Kibera Tour": {
                description: "Visit schools and interact with Kibera's youth. Duration: 2 hours.",
                expectations: "Expect heartwarming interactions with children, school visits, and a chance to contribute school supplies if you wish."
            },
            "Kibera Market Tour": {
                description: "Shop at bustling markets with a local guide. Duration: 2.5 hours.",
                expectations: "Expect a lively shopping experience, bargaining opportunities, and insights into local commerce. Bring cash for purchases."
            },
            "Photography Tour": {
                description: "Capture Kibera's beauty with a professional photographer. Duration: 3.5 hours. Includes equipment tips.",
                expectations: "Expect a hands-on photography session, stunning views, and expert guidance. Bring your camera and a sense of curiosity."
            },
            "Music and Dance Tour": {
                description: "Enjoy live performances and dance with locals. Duration: 3 hours.",
                expectations: "Expect energetic performances, dance lessons, and a festive atmosphere. Wear comfortable shoes for dancing!"
            },
            "Local Crafts Tour": {
                description: "Meet artisans and see crafts in action. Duration: 2.5 hours.",
                expectations: "Expect to watch artisans at work, try a craft yourself, and take home a small handmade item."
            },
            "Sports in Kibera Tour": {
                description: "Watch sports events and meet athletes. Duration: 2 hours.",
                expectations: "Expect to cheer at local games, meet inspiring athletes, and maybe kick a ball around. Bring your enthusiasm!"
            },
            "Kibera by Night Tour": {
                description: "Explore Kibera's nightlife and evening culture. Duration: 3 hours.",
                expectations: "Expect a vibrant night out with music, food stalls, and local hangouts. Dress for the evening and bring a flashlight."
            },
            "NGO Impact Tour": {
                description: "Visit NGOs making a difference. Duration: 2.5 hours.",
                expectations: "Expect to see impactful projects, meet staff, and learn about community development. Bring a notebook for inspiration."
            },
            "Healthcare in Kibera Tour": {
                description: "Learn about healthcare challenges and solutions. Duration: 2 hours.",
                expectations: "Expect visits to clinics, talks with healthcare workers, and insights into local health initiatives."
            },
            "Education Initiatives Tour": {
                description: "Visit educational programs for youth. Duration: 2 hours.",
                expectations: "Expect to see classrooms in action, meet educators, and learn about education’s role in Kibera."
            },
            "Women's Empowerment Tour": {
                description: "Meet women leading change. Duration: 2.5 hours.",
                expectations: "Expect inspiring stories, visits to women-led projects, and a chance to support their work."
            },
            "Tech in Kibera Tour": {
                description: "Discover tech innovations by youth. Duration: 2.5 hours.",
                expectations: "Expect to see coding hubs, meet young innovators, and explore tech’s impact. Bring your curiosity!"
            },
            "Eco-Friendly Kibera Tour": {
                description: "Learn about sustainability efforts. Duration: 2 hours.",
                expectations: "Expect to visit green projects, learn about eco-practices, and see sustainability in action."
            },
            "Youth Innovation Tour": {
                description: "Meet young entrepreneurs. Duration: 2.5 hours.",
                expectations: "Expect to meet startup founders, see their products, and hear their success stories."
            },
            "Full Day Kibera Experience": {
                description: "A comprehensive tour covering all aspects. Duration: 8 hours. Includes meals.",
                expectations: "Expect a full day of exploration, from culture to innovation, with lunch and dinner provided. Wear comfy shoes and bring water!"
            }
        };

        learnMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tourName = button.getAttribute('data-tour');
                const tour = tourDetails[tourName] || { description: "Details coming soon!", expectations: "More info to be added soon!" };

                popupTitle.textContent = tourName;
                popupDetails.innerHTML = `
                    <div class="details-section">
                        <h4>Tour Details</h4>
                        <p>${tour.description}</p>
                    </div>
                    <div class="details-section">
                        <h4>What to Expect</h4>
                        <p>${tour.expectations}</p>
                    </div>
                `;

                popup.style.display = 'flex';
                setTimeout(() => popup.classList.add('active'), 10);
                popup.focus();
            });
        });

        closePopup.addEventListener('click', () => {
            popup.classList.remove('active');
            setTimeout(() => popup.style.display = 'none', 300);
        });

        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                setTimeout(() => popup.style.display = 'none', 300);
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.style.display === 'flex') {
                popup.classList.remove('active');
                setTimeout(() => popup.style.display = 'none', 300);
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            if (window.innerWidth <= 768 && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
});