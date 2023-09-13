import React from "react";

const About = () => {
  return (
    <div className="container">
      <h2>Our Story</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        tincidunt lectus vel tincidunt venenatis. Duis vestibulum purus in elit
        sodales, ac elementum lectus tempus. Sed posuere libero nec ultricies.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to provide innovative solutions that make people's lives
        better. We are committed to delivering high-quality products and
        services that exceed our customers' expectations.
      </p>

      <h2>Meet Our Team</h2>
      <ul>
        <li>
          <strong>Balaji Neelala</strong> - CEO
        </li>
        <li>
          <strong>Devi Neelala</strong> - CTO
        </li>
        <li>
          <strong>Srinivasa Rao Neelala </strong> - CFO
        </li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or would like to get in touch with us, please
        feel free to contact us at
        <a href="mailto:pern@example.com">: pern@example.com</a>.
      </p>
    </div>
  );
};

export default About;
