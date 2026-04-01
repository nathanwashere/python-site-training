const navigationCards = [
  {
    href: '#/project-info',
    eyebrow: 'Current page',
    title: 'User and project info',
    description:
      'Open the page that contains your existing form and live formData preview.',
  },
  {
    href: '#/custom-template',
    eyebrow: 'New page',
    title: 'Custom info template',
    description:
      'Use a ready-made template with labeled input boxes for any other information you want to collect.',
  },
  {
    href: '#/peppers',
    eyebrow: 'Pepper page',
    title: 'Pepper gallery',
    description:
      'Open a dedicated page that loads the peppers from the backend and shows all their details with images.',
  },
]

function HomePage() {
  return (
    <main className="shell shell-home">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Frontend dashboard</p>
          <h1>Choose the page you want to work on</h1>
          <p className="hero-description">
            This home page keeps the frontend organized. Use these links to
            open your existing forms or the new peppers page that reads the
            Excel-loaded data from the backend.
          </p>
        </div>

        <div className="hero-grid">
          {navigationCards.map((card) => (
            <a key={card.href} className="nav-card" href={card.href}>
              <p className="eyebrow">{card.eyebrow}</p>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <span className="nav-link">Open page</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
