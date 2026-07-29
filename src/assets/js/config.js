import logo from '../images/logo.png';
import homePageLogo from '../images/hlogo.png';
export const COMMON = {
    ipaddress: await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => 'Unknown'),
    adminName: null,
};

export { logo, homePageLogo };

export const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbytRdI6QIvpAEvlqEJVj5I9L7dAmakmaXPpQdE2gOVbwTFsMU1PpPrzzF05BDE5F-Q/exec';

export const getBasePath = () => {
    const path = window.location.pathname;
    // If on GitHub Pages, the first part of the path is the repo name
    if (window.location.hostname.includes("github.io")) {
        return "/" + path.split('/')[1] + "/";
    }
    return "/"; // Localhost root
};

const getCookie = (name) => {
    // 1. Get all cookies and split them by the semicolon
    let cookieArr = document.cookie.split(";");

    // 2. Loop through each cookie pair
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        // 3. Remove whitespace and check if the name matches
        if (name === cookiePair[0].trim()) {
            // 4. Return the value (the token)
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if the cookie was not found
    return null;
};
export const token = getCookie("userToken");

export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export function loadingSpinner(label) {
    return `
            <div class="flex flex-col items-center justify-center py-12 space-y-3">
                <div class="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
                <span class="text-xs font-medium text-slate-400">${label}...</span>
            </div>`
}

export async function tokenCheck(pageType = 'login') {
    if (token) {
        if(pageType === 'login'){
            displayArea.innerHTML = loadingSpinner('');
        }        
        try {
            let payload = {
                action: 'getLoginInfo',
                token: token,
                userIp: COMMON.ipaddress
            };
            const response = await fetch(WEB_APP_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error("Server returned status " + response.status);
            }

            const result = await response.json();
            if (result.status === 'success') {
                if (pageType === 'login') {
                    window.location.href = getBasePath() + "admin/";
                }else{
                    return true;
                }
            } else {
                deleteCookie("userToken");
                throw new Error("Authentication failed: " + result.message);
            } 
            
        } catch (err) {
            console.error(err);
            if(pageType === 'admin'){
                window.location.href = getBasePath() + "admin/login/";
            } 
        }
    }else{
        if(pageType === 'admin'){
            window.location.href = getBasePath() + "admin/login/";
        }
    }
}

export function configLink() {
    const aLinks = document.querySelectorAll('a');
    const basePath = getBasePath().replace(/\/$/, '');

    aLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (!href) return;

        if (
            href.startsWith('http') || 
            href.startsWith('//') || 
            href.startsWith('#') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.startsWith('javascript:')
        ) {
            return;
        }

        // 3. Skip if the link already contains the base path (prevents double-prefixing)
        if (href.startsWith(basePath)) return;

        // 4. Safely concatenate ensuring exactly one slash
        const separator = href.startsWith('/') ? '' : '/';
        link.setAttribute('href', basePath + separator + href);
    });
}

