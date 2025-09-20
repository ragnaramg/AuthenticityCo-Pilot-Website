/**
 * AuthenticityCo-Pilot Shared Navigation Component
 * Provides consistent navigation across all pages with path-aware configuration
 */

class AuthenticityCoPilotNav {
    constructor() {
        this.baseStyles = {
            container: `
                margin-bottom: 0;
                padding: 12px 20px;
                background: linear-gradient(180deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.6) 100%);
                border-bottom: 1px solid rgba(148,163,184,0.1);
                border-radius: 0;
                box-shadow: none;
            `,
            flexContainer: `
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            `,
            branding: `
                font-size: 10px;
                color: #64748b;
            `,
            brandingTitle: `
                margin: 0;
                color: #94a3b8;
                font-weight: 500;
                font-size: 11px;
            `,
            brandingSubtitle: `
                margin: 2px 0 0 0;
                font-size: 9px;
                opacity: 0.8;
            `,
            navContainer: `
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
                align-items: center;
            `,
            primaryButton: `
                display: inline-block;
                background: #3b82f6;
                color: white;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
                font-size: 14px;
                transition: all 0.3s;
                box-shadow: 0 0 12px rgba(59,130,246,0.4);
            `,
            secondaryButton: `
                display: inline-block;
                background: transparent;
                color: #cbd5e1;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
                font-size: 14px;
                border: 1px solid rgba(203,213,225,0.2);
                transition: all 0.3s;
                cursor: pointer;
            `
        };
    }

    /**
     * Get navigation items based on current path
     */
    getNavItemsForPath(currentPath) {
        const path = currentPath.toLowerCase();
        
        if (path === '/' || path === '/index.html' || path === '') {
            // Root page - show Reports button
            return [
                {
                    type: 'link',
                    text: '📊 Reports',
                    href: 'reports/index.html',
                    style: 'primary'
                }
            ];
        } else if (path.includes('/reports/index.html') || path.includes('/reports/')) {
            // Reports directory - show Home button
            return [
                {
                    type: 'link',
                    text: '🏠 Home',
                    href: '../index.html',
                    style: 'primary'
                }
            ];
        } else if (path.includes('/reports/') && path.includes('.html')) {
            // Individual report - show Back to Reports and Home
            return [
                {
                    type: 'link',
                    text: '← All Reports',
                    href: 'index.html',
                    style: 'secondary'
                },
                {
                    type: 'link',
                    text: '🏠 Home',
                    href: '../../index.html',
                    style: 'primary'
                }
            ];
        } else {
            // Default fallback
            return [
                {
                    type: 'link',
                    text: '🏠 Home',
                    href: '../index.html',
                    style: 'primary'
                }
            ];
        }
    }

    /**
     * Generate navigation HTML
     */
    generateNavHTML(navItems, isFooter = false) {
        const marginStyle = isFooter ? 'margin-top: 0;' : 'margin-bottom: 0;';
        
        const navButtonsHTML = navItems.map(item => {
            if (item.type === 'link') {
                const buttonStyle = item.style === 'primary' ? this.baseStyles.primaryButton : this.baseStyles.secondaryButton;
                const hoverEvents = item.style === 'primary' 
                    ? `onmouseover="this.style.background='#2563eb'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#3b82f6'; this.style.transform='translateY(0)'"`
                    : `onmouseover="this.style.borderColor='rgba(203,213,225,0.4)'; this.style.color='#e2e8f0'" onmouseout="this.style.borderColor='rgba(203,213,225,0.2)'; this.style.color='#cbd5e1'"`;
                
                return `<a href="${item.href}" style="${buttonStyle}" ${hoverEvents}>${item.text}</a>`;
            } else if (item.type === 'button') {
                return `<button onclick="${item.onclick}" style="${this.baseStyles.secondaryButton}" onmouseover="this.style.borderColor='rgba(203,213,225,0.4)'; this.style.color='#e2e8f0'" onmouseout="this.style.borderColor='rgba(203,213,225,0.2)'; this.style.color='#cbd5e1'">${item.text}</button>`;
            }
        }).join('');

        // Add Back to Top button for footer
        const backToTopButton = isFooter ? 
            `<button onclick="window.scrollTo(0,0)" style="${this.baseStyles.secondaryButton}" onmouseover="this.style.borderColor='rgba(203,213,225,0.4)'; this.style.color='#e2e8f0'" onmouseout="this.style.borderColor='rgba(203,213,225,0.2)'; this.style.color='#cbd5e1'">⬆️ Back to Top</button>` : '';

        return `
            <div style="${this.baseStyles.container} ${marginStyle}">
                <div style="${this.baseStyles.flexContainer}">
                    <div style="${this.baseStyles.branding}">
                        <p style="${this.baseStyles.brandingTitle}">AuthenticityCo-Pilot</p>
                        <p style="${this.baseStyles.brandingSubtitle}">Advanced Podcast Coaching Analysis • Evidence-based insights</p>
                    </div>
                    <div style="${this.baseStyles.navContainer}">
                        ${navButtonsHTML}
                        ${backToTopButton}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create and insert navigation elements
     */
    createNavigation(currentPath) {
        const navItems = this.getNavItemsForPath(currentPath);
        
        // Create header navigation
        const headerNav = this.generateNavHTML(navItems, false);
        
        // Create footer navigation
        const footerNav = this.generateNavHTML(navItems, true);
        
        return { headerNav, footerNav };
    }

    /**
     * Auto-initialize navigation based on current page
     */
    autoInit() {
        const currentPath = window.location.pathname;
        const { headerNav, footerNav } = this.createNavigation(currentPath);
        
        // Insert header navigation
        const body = document.body;
        if (body) {
            body.insertAdjacentHTML('afterbegin', headerNav);
        }
        
        // Insert footer navigation
        if (body) {
            body.insertAdjacentHTML('beforeend', footerNav);
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const nav = new AuthenticityCoPilotNav();
    nav.autoInit();
});

// Export for manual usage
window.AuthenticityCoPilotNav = AuthenticityCoPilotNav;
