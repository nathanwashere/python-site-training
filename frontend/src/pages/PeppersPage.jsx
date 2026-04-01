import { useEffect, useState } from 'react'

const apiUrl = 'http://127.0.0.1:8000'

function formatAvailability(isAvailable, stockQuantity) {
  if (!isAvailable) {
    return 'Currently unavailable'
  }

  return `${stockQuantity} in stock`
}

function PeppersPage() {
  const [peppers, setPeppers] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedPepper, setSelectedPepper] = useState(null)

  useEffect(() => {
    let isCancelled = false

    async function loadPeppers() {
      try {
        const response = await fetch(`${apiUrl}/chillies`)

        if (!response.ok) {
          throw new Error('Could not load peppers from /chillies')
        }

        const data = await response.json()

        if (!isCancelled) {
          setPeppers(data)
          setStatus('success')
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(error.message)
          setStatus('error')
        }
      }
    }

    loadPeppers()

    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    if (!selectedPepper) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPepper(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPepper])

  return (
    <>
      <main className="shell">
        <section className="page-header">
          <a className="back-link" href="#/">
            Back to home
          </a>
          <p className="eyebrow">Pepper collection</p>
          <h1>Explore the peppers from your Excel file</h1>
          <p className="section-description">
            This page loads the peppers directly from the backend and shows each
            one with its image, heat range, origin, color, season, and stock.
          </p>
        </section>

        {status === 'loading' ? (
          <section className="panel peppers-status">
            <h2>Loading peppers...</h2>
          </section>
        ) : null}

        {status === 'error' ? (
          <section className="panel peppers-status">
            <h2>Could not load peppers</h2>
            <p>{errorMessage}</p>
          </section>
        ) : null}

        {status === 'success' ? (
          <>
            <section className="pepper-summary panel">
              <div>
                <p className="eyebrow">Loaded from API</p>
                <h2>{peppers.length} peppers ready</h2>
              </div>
              <p>
                Endpoint: <code>/chillies</code>
              </p>
            </section>

            <section className="pepper-grid">
              {peppers.map((pepper) => (
                <article key={pepper.name} className="pepper-card">
                  <button
                    type="button"
                    className="pepper-image-button"
                    onClick={() => setSelectedPepper(pepper)}
                    aria-label={`Inspect ${pepper.name} image`}
                  >
                    <div className="pepper-image-wrap">
                      <img
                        className="pepper-image"
                        src={pepper.image_url}
                        alt={pepper.name}
                      />
                    </div>
                    <span className="pepper-image-hint">Click to inspect</span>
                  </button>

                  <div className="pepper-content">
                    <div className="pepper-heading">
                      <p className="eyebrow">Origin: {pepper.origin}</p>
                      <h2>{pepper.name}</h2>
                      <p className="pepper-description">{pepper.description}</p>
                    </div>

                    <dl className="pepper-facts">
                      <div>
                        <dt>Heat range</dt>
                        <dd>
                          {pepper.shu_min.toLocaleString()} to{' '}
                          {pepper.shu_max.toLocaleString()} SHU
                        </dd>
                      </div>
                      <div>
                        <dt>Color</dt>
                        <dd>{pepper.color}</dd>
                      </div>
                      <div>
                        <dt>Season</dt>
                        <dd>{pepper.season}</dd>
                      </div>
                      <div>
                        <dt>Availability</dt>
                        <dd>
                          {formatAvailability(
                            pepper.is_available,
                            pepper.stock_quantity,
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : null}
      </main>

      {selectedPepper ? (
        <div
          className="pepper-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPepper.name} image preview`}
          onClick={() => setSelectedPepper(null)}
        >
          <div
            className="pepper-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="pepper-lightbox-close"
              onClick={() => setSelectedPepper(null)}
              aria-label="Close image preview"
            >
              Close
            </button>
            <img
              className="pepper-lightbox-image"
              src={selectedPepper.image_url}
              alt={selectedPepper.name}
            />
            <div className="pepper-lightbox-caption">
              <p className="eyebrow">Image preview</p>
              <h2>{selectedPepper.name}</h2>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default PeppersPage
