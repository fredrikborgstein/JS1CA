export default function Footer() {
    return {
        render: () => `
            <footer>
                <div id="footer-socials">
                    <a href="https://www.youtube.com/" target="_blank">
                        <i class="fa-brands footer-icon fa-youtube"><span class="sr-only">Link to Youtube</span></i>
                    </a>
                    <a href="https://www.twitch.tv/" target="_blank">
                        <i class="fa-brands footer-icon fa-twitch"><span class="sr-only">Link to Twitch</span></i>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <i class="fa-brands footer-icon fa-facebook"><span class="sr-only">Link to Facebook</span></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <i class="fa-brands footer-icon fa-square-instagram"><span class="sr-only">Link to Instagram</span></i>
                    </a>
                </div>
                <div id="footer-nav">
                    <div id="footer-nav-heading">
                        <h3>Game Hub © 2024 - All Rights Reserved</h3>
                    </div>
                    <div id="footer-nav-links">
                        <ul>
                            <li><a href="./legal/termsofservice.html">Terms Of Services</a></li>
                            <li>|</li>
                            <li><a href="./legal/legalnotice.html">Legal Notice</a></li>
                            <li>|</li>
                            <li><a href="./legal/cookiepolicy.html">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div id="footer-newsletter">
                    <div id="newsletter-heading">
                        <h3>Subscribe to our newsletter</h3>
                    </div>
                    <form action="#" method="post">
                        <input id="email-input" type="email" name="email" placeholder="Enter your email" />
                        <label for="email-input" id="email-label" class="sr-only">Input for email, to signup for newsletter</label>
                        <a id="newsletter-button" class="btn newsletter-btn" href="#">Subscribe</a>
                    </form>
                </div>
            </footer>
        `,
    };
}
