// Common utilities for all verticals

// Initialize utag_data if it doesn't exist
window.utag_data = window.utag_data || {};

// Helper to track page view
function trackPageView(data) {
    window.utag_data = {
        ...window.utag_data,
        ...data,
        page_type: data.page_type || 'general',
        tealium_event: 'page_view',
        timestamp: new Date().toISOString()
    };

    console.log('📊 Page View:', window.utag_data);

    // If Tealium is loaded, trigger view
    if (window.utag && window.utag.view) {
        window.utag.view(window.utag_data);
    }
}

// Helper to track events
function trackEvent(eventName, data) {
    // Map event names to tealium_event values
    const eventMapping = {
        'add_to_cart': 'cart_add',
        'remove_from_cart': 'cart_remove',
        'begin_checkout': 'checkout_start',
        'checkout_progress': 'checkout_progress',
        'add_payment_info': 'payment_info_add',
        'purchase': 'purchase',
        'flight_search': 'search',
        'flight_select': 'product_select',
        'add_travelers': 'form_submit',
        'doctor_search': 'search',
        'doctor_select': 'product_select',
        'appointment_booked': 'appointment_book',
        'product_view': 'product_view',
        'loan_calculate': 'calculate',
        'loan_apply_start': 'form_start',
        'application_submit': 'form_submit',
        'loan_application': 'application_submit',
        'plan_select': 'product_select',
        'signup_complete': 'signup_complete',
        'demo_request': 'lead_submit',
        'vehicle_search': 'search',
        'vehicle_view': 'product_view',
        'test_drive_request': 'lead_start',
        'test_drive_confirmed': 'lead_submit',
        'financing_request': 'lead_start',
        'financing_application': 'application_submit'
    };

    const eventData = {
        ...window.utag_data,
        ...data,
        event_name: eventName,
        tealium_event: eventMapping[eventName] || eventName,
        timestamp: new Date().toISOString()
    };

    console.log('🎯 Event:', eventName, '→', eventData.tealium_event, eventData);

    // If Tealium is loaded, trigger link/event
    if (window.utag && window.utag.link) {
        window.utag.link(eventData);
    }
}

// Helper to generate random IDs
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Helper to get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Helper to set URL parameters without page reload
function setUrlParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

// LocalStorage helpers for cart/session data
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    },
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return null;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    },
    clear: () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    }
};

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
}

// Sample data generators
function generateSampleUser() {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Jessica'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

    return {
        user_id: generateId('user'),
        first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
        last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
        email: 'demo@example.com',
        customer_type: 'returning'
    };
}

// Debug panel toggle
function createDebugPanel() {
    const panel = document.createElement('div');
    panel.id = 'debug-panel';
    panel.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #00ff00;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        max-width: 400px;
        max-height: 300px;
        overflow: auto;
        z-index: 10000;
        display: none;
    `;

    document.body.appendChild(panel);

    // Toggle with Ctrl+D
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            updateDebugPanel();
        }
    });
}

function updateDebugPanel() {
    const panel = document.getElementById('debug-panel');
    if (panel && panel.style.display === 'block') {
        panel.innerHTML = `
            <strong>utag_data:</strong><br>
            ${JSON.stringify(window.utag_data, null, 2)}
        `;
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#667eea'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 1rem;
        font-weight: 500;
        z-index: 10001;
        animation: slideIn 0.3s ease-out, slideOut 0.3s ease-in 2.7s;
        max-width: 300px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize debug panel on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        createDebugPanel();
        console.log('💡 Press Ctrl+D to toggle debug panel');
    });
} else {
    createDebugPanel();
    console.log('💡 Press Ctrl+D to toggle debug panel');
}
