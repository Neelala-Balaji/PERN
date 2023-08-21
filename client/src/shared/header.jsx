const Header = () => {
  return (
    <header class="site-header">
      <div class="site-identity">
        <a href="#">
          <img src="http://via.placeholder.com/400" alt="Site Name" />
        </a>
        <h1>
          <a href="#">PERN POC</a>
        </h1>
      </div>
      <nav class="site-navigation">
        <ul class="nav">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
