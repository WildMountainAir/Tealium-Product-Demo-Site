# Tealium Multi-Vertical Demo Site

A comprehensive demo site for testing Tealium implementations across different industries and checkout flows.

## Features

- ✅ **No Server Required** - Pure HTML/CSS/JavaScript, runs locally
- ✅ **Multiple Verticals** - Retail, Travel, Financial, Healthcare, B2B, Automotive
- ✅ **Complete Checkout Flows** - Each vertical has a full user journey
- ✅ **Pre-configured Data Layer** - Ready for Tealium iQ integration
- ✅ **Event Tracking** - All key events tracked and logged
- ✅ **Debug Panel** - Press `Ctrl+D` to see current data layer
- ✅ **Easy Customization** - Simple to modify for specific demos

## Quick Start

1. **Configure Tealium**
   - Open `config.js`
   - Update your account, profile, and environment
   - Set `enabled: true`

2. **Run Locally**
   - Open `index.html` in your browser
   - Or use a local server: `python3 -m http.server 8000`

3. **Test a Vertical**
   - Choose a vertical from the homepage
   - Walk through the checkout flow
   - Check browser console for data layer output
   - Press `Ctrl+D` to toggle debug panel

## Verticals Included

### 🛍️ Retail / eCommerce (COMPLETE)
- **Flow**: Browse Products → Cart → Shipping → Payment → Confirmation
- **Events**: `add_to_cart`, `remove_from_cart`, `begin_checkout`, `checkout_progress`, `add_payment_info`, `purchase`
- **Data**: Product arrays, cart totals, shipping info, order ID

### ✈️ Travel / Hospitality (IN PROGRESS)
- **Flow**: Search Flights → Select → Travelers → Payment → Confirmation
- **Events**: `flight_search`, `flight_select`, `add_travelers`, `purchase`
- **Data**: Origin/destination, dates, passengers, cabin class, airline

### 💳 Financial Services (TODO)
- Credit card application flow
- Loan calculator

### 🏥 Healthcare (TODO)
- Appointment booking
- Insurance verification

### 💼 B2B / SaaS (TODO)
- Trial signup
- Demo request

### 🚗 Automotive (TODO)
- Vehicle browsing
- Test drive booking
- Finance application

## Data Layer Structure

Each page sets `window.utag_data` with standardized fields:

```javascript
{
  page_name: 'Cart',
  page_type: 'cart',
  site_section: 'retail',
  vertical: 'ecommerce',
  checkout_step: 1,
  // ... event-specific data
}
```

## Files

- `index.html` - Homepage / vertical selector
- `config.js` - Tealium configuration
- `common.js` - Shared utilities and helpers
- `styles.css` - Global styles
- `/retail/` - Retail vertical pages
- `/travel/` - Travel vertical pages
- (more verticals to come)

## Customization

### Adding Your Tealium Profile

Edit `config.js`:

```javascript
const TEALIUM_CONFIG = {
    account: 'your-account',
    profile: 'your-profile',
    environment: 'dev',
    enabled: true
};
```

### Adding Products

Edit the `products` array in `retail/index.html`:

```javascript
const products = [
    {
        id: 'PROD001',
        name: 'Product Name',
        category: 'Category',
        price: 99.99,
        brand: 'Brand',
        emoji: '🎁'
    }
];
```

### Customizing Events

Use the helper functions in `common.js`:

```javascript
// Track page view
trackPageView({
    page_name: 'My Page',
    page_type: 'custom',
    // ... custom fields
});

// Track event
trackEvent('custom_event', {
    event_category: 'engagement',
    event_action: 'button_click',
    // ... custom fields
});
```

## Debug Mode

Press `Ctrl+D` anywhere on the site to toggle the debug panel, which shows the current `utag_data` object in real-time.

## Browser Console

All events are logged to the console with emojis for easy identification:

- 📊 Page View
- 🎯 Event
- 🛒 Cart operations
- ✅ Success messages

## Testing Checklist

- [ ] Configure Tealium profile in `config.js`
- [ ] Open homepage in browser
- [ ] Select a vertical
- [ ] Complete checkout flow
- [ ] Check console for events
- [ ] Verify data in Tealium EventStream
- [ ] Test with different products/options
- [ ] Verify purchase event with correct totals

## Tech Stack

- Pure HTML5
- CSS3 with Grid & Flexbox
- Vanilla JavaScript (ES6+)
- LocalStorage for cart persistence
- No frameworks or build tools required

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Requires LocalStorage and ES6 support

## Future Enhancements

- [ ] Complete all 6 verticals
- [ ] Add hotel booking to travel
- [ ] Add mobile-responsive improvements
- [ ] Add more sample data
- [ ] Add data layer validation
- [ ] Add screenshot/demo mode

## Contributing

This is a demo site for internal Tealium use. Customize as needed for your demos and testing.

## License

Internal Tealium tool - not for public distribution.
