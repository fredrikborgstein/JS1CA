export default function AboutPage () {
    return {
        render: () => `
            <div id="main-about">
            <!-- TITLE SECTION -->
            <section id="title-section">
                <h1 id="title-section-title">About Us</h1>
                <h2 id="title-section-subheading">
                    Explore. Play. Connect. Welcome to Game Hub, where the game never
                    stops!
                </h2>
            </section>
            <!-- ABOUT SECTION 1 -->
            <section id="about-section-1" className="about-section">
                <div className="left-about-section">
                    <p>
                        Welcome to Game Hub, your one-stop destination for all things
                        gaming! Founded by passionate gamers, our mission is to bring the
                        latest and greatest in digital gaming to enthusiasts around the
                        world. Whether you’re into action-packed adventures, strategic
                        simulations, immersive RPGs, or casual puzzles, Game Hub has
                        something for everyone. At Game Hub, we believe that gaming is more
                        than just entertainment – it’s a community, a lifestyle, and a way
                        to connect with others. That’s why we carefully curate our selection
                        of games to cater to players of all ages and preferences, ensuring
                        there’s always something new and exciting to discover. At Game Hub,
                        we’re not just selling games – we’re building a gaming community.
                        Whether you're a casual gamer or a dedicated pro, we’re here to
                        support your journey every step of the way.
                    </p>
                </div>
                <div className="right-about-section">
                    <img
                        className="about-image"
                        src="../assets/images/oppo-find-x5-pro-mCxk_ba7CJ8-unsplash.jpg"
                        alt="Father sits on sofa with sun, playing videogames, being cheerful"
                    />
                </div>
            </section>
            <div id="about-section-divider"></div>
            <!-- ABOUT SECTION 2 -->
            <section id="about-section-2" className="about-section">
                <div className="left-about-section">
                    <img
                        className="about-image"
                        src="../assets/images/sean-do-EHLd2utEf68-unsplash.jpg"
                        alt="Boy sitting in front of computer screen with headset on, game on the screen and a dark room"
                    />
                </div>
                <div className="right-about-section">
                    <h3>Why Choose GameHub?</h3>
                    <ul>
                        <li>
                            <span>Extensive Collection:</span><br/>From indie gems to
                            blockbuster titles, our online store features a diverse range of
                            games across all genres and platforms.
                        </li>
                        <li>
                            <span>Instant Digital Downloads:</span><br/>No waiting, no
                            shipping – download your favorite games instantly after purchase
                            and start playing right away.
                        </li>
                        <li>
                            <span>Competitive Prices:</span><br/>We offer great deals and
                            discounts on popular titles, so you can build your game library
                            without breaking the bank.
                        </li>
                        <li>
                            <span>Dedicated Support:</span><br/>Our team of gaming experts is
                            here to assist you with any questions, from game recommendations
                            to troubleshooting.
                        </li>
                        <li>
                            <span>Community Driven:</span><br/>Stay connected with fellow
                            gamers through our blogs, reviews, and social media channels,
                            where we share tips, insights, and exclusive news on upcoming
                            releases.
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        `,
        onMount: () => {

        },
        onDismount: () => {

        },
    };
};