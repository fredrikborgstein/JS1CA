export default function ContactPage() {
    return {
        render: () => `
            <div>
      <section id="contact-title-section">
        <h1>Contact Us</h1>
      </section>
      <section id="contact-info">
        <div id="contact-info-left">
          <h3>GameHub S.L</h3>
          <p>
            For any questions, please don’t hesitate to contact us either
            through the below information, or the contact form.
          </p>

          <h5>
            <i class="fa-solid fa-house"></i> Carretera Torrevieja, 03189
            Orihuela Costa
          </h5>

          <h5><i class="fa-solid fa-phone"></i> Tel. +34 999 878 3000</h5>

          <h5><i class="fa-solid fa-envelope"></i> contact@gamehub.com</h5>
        </div>
        <div id="contact-info-right">
          <form action="#" method="post" id="contact-form">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" required />
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required />
            <label for="message">Message:</label>
            <textarea name="message" id="message" required></textarea>
            <input type="submit" value="Submit" id="contact-form-button" />
          </form>
        </div>
      </section>
      <section id="contact-map-section">
        <h2>Find Us</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.564941530046!2d-0.7218895241763902!3d37.94059297194414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6307a9413156f9%3A0x240a0e06d0ff872d!2sGo-Karts%20Orihuela%20Costa!5e0!3m2!1sno!2ses!4v1727543270997!5m2!1sno!2ses"
          width="900"
          height="400"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
        `,
        onMount: () => {

        },
        onDismount: () => {

        },
    };
};