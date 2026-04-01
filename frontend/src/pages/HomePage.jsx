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
]

function HomePage() {
  return (
    <main className="shell shell-home">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Frontend dashboard</p>
          <h1>Choose the page you want to work on</h1>
          <p className="hero-description">
            This home page keeps the frontend organized. Use the two buttons
            below to open your current form or a clean template page you can
            extend later.
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
