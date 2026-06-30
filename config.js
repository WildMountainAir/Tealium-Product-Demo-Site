// Tealium Configuration
const TEALIUM_CONFIG = {
    account: 'product-alison-sipos',
    profile: 'main',
    environment: 'prod',
    enabled: true
};

// Initialize utag_data globally
window.utag_data = window.utag_data || {};

// Function to load Tealium sync script (loads in head, blocking)
function loadTealiumSync() {
    if (!TEALIUM_CONFIG.enabled) {
        console.log('🔧 Tealium is disabled. Set TEALIUM_CONFIG.enabled = true in config.js to enable.');
        return;
    }

    const syncScript = document.createElement('script');
    syncScript.type = 'text/javascript';
    syncScript.src = `https://tags.tiqcdn.com/utag/${TEALIUM_CONFIG.account}/${TEALIUM_CONFIG.profile}/${TEALIUM_CONFIG.environment}/utag.sync.js`;

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(syncScript, firstScript);

    console.log('✅ Tealium Sync loaded:', syncScript.src);
}

// Function to load Tealium main script (async)
function loadTealiumMain() {
    if (!TEALIUM_CONFIG.enabled) {
        return;
    }

    (function(a,b,c,d){
        a=`https://tags.tiqcdn.com/utag/${TEALIUM_CONFIG.account}/${TEALIUM_CONFIG.profile}/${TEALIUM_CONFIG.environment}/utag.js`;
        b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
        a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
    })();

    console.log('✅ Tealium iQ loaded (async)');
}

// Load Tealium immediately (sync script first)
loadTealiumSync();

// Load main Tealium script on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTealiumMain);
} else {
    loadTealiumMain();
}
