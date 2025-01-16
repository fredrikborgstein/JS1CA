export default function Header() {
    const logoSection = `
        <div id="logo-section">
            <a href="/" data-route>
                <img
                    src="../assets/images/GameHubLogo.png"
                    alt="Gamehub logo"
                    id="site-logo"
                />
            </a>
        </div>`;

    const mainMenu = `
        <div id="main-nav">
            <nav>
                <ul>
                    <li><a href="/" data-route>Home</a></li>
                    <li><a href="/allProducts" data-route>All Products</a></li>
                    <li><a href="/about" data-route>About Us</a></li>
                    <li><a href="/contact" data-route>Contact Us</a></li>
                </ul>
            </nav>
        </div>`;

    return {
        render: () => `
            <header>
                ${logoSection}
                ${mainMenu}
            </header>
        `,
    };
}
