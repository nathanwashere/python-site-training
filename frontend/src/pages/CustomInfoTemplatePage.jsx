import { useState } from 'react'

const apiUrl = 'http://127.0.0.1:8000'


async function sendData(chilli) {
  try {
    const response = await fetch(`${apiUrl}/chillies`, {
      method: 'POST',
      body: JSON.stringify(chilli),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Could not get to /chillies')
    }
    const data = await response.json()
    console.log('This is data: ', data)
  } catch (error) {
    console.log('Error while sending data to create a chilli:\n', error)
  }
}


function CustomInfoTemplatePage() {
  const [chilli, setChilli] = useState({
    name: '',
    description: '',
    image_url: '',
    origin: '',
    color: '',
    shuMin: '',
    shuMax: '',
    season: '',
  })

  const handleChange = ({ target }) => {
    const { name, value } = target

    setChilli((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => { 
    event.preventDefault()
    console.log('Form data ready for backend:', chilli)
    sendData(chilli)
  }

  return (
    <main className="shell">
      <section className="page-header">
        <a className="back-link" href="#/">
          Back to home
        </a>
        <p className="eyebrow">Editable template</p>
        <h1>Custom info template</h1>
        <p className="section-description">
          Add more inputs by editing <code>templateSections</code>. Each object
          below creates one labeled input box automatically.
        </p>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-copy">
            <h2>Chilli land!</h2>
            <p>
              This page is dedicated to chilli.
            </p>
          </div>

          <form className="project-form" onSubmit={handleSubmit}>
            <section className="template-section">
              <div className="template-section-copy">
                <h3>Personal details</h3>
                <p>Change this title, description, or any field below.</p>
              </div>

              <div className="template-grid">
                <label>
                  <span>Chilli name</span>
                  <input
                    type="text"
                    name="name"
                    value={chilli.name}
                    onChange={handleChange}
                    placeholder="Bishop’s Crown"
                  />
                </label>

                <label>
                  <span>Description</span>
                  <input
                    type="text"
                    name="description"
                    value={chilli.description}
                    onChange={handleChange}
                    placeholder="The hottest chilli you can find!"
                  />
                </label>

                <label>
                  <span>Origin</span>
                  <input
                    type="text"
                    name="origin"
                    value={chilli.origin}
                    onChange={handleChange}
                    placeholder="Chile"
                  />
                </label>

                <label>
                  <span>Color</span>
                  <input
                    type="text"
                    name="color"
                    value={chilli.color}
                    onChange={handleChange}
                    placeholder="Yellow"
                  />
                </label>

                <label>
                  <span>Season</span>
                  <input
                    type="text"
                    name="season"
                    value={chilli.season}
                    onChange={handleChange}
                    placeholder="Summer"
                  />
                </label>

                
      
              </div>
            </section>

            <section className="template-section">
              <div className="template-section-copy">
                <h3>Level of spicy - from lowest to highest</h3>
                <p>Accordingly to scoville scale.</p>
              </div>

              <div className="template-grid">
                <label>
                  <span>Shu min</span>
                  <input
                    type="text"
                    name="shuMin"
                    value={chilli.shuMin}
                    onChange={handleChange}
                    placeholder="1000"
                  />
                </label>

                <label>
                  <span>Shu max</span>
                  <input
                    type="text"
                    name="shuMax"
                    value={chilli.shuMax}
                    onChange={handleChange}
                    placeholder="50000"
                  />
                </label>

                {/* Add more study/work fields here by copying one <label>...</label> block */}
              </div>
            </section>

            <button type="submit">Submit</button>

            {/* If you create a brand new section, also add its values to useState at the top */}
          </form>
        </article>

        <aside className="panel preview-panel">
          <h2>Template data preview</h2>
          <pre>{JSON.stringify(chilli, null, 2)}</pre>
        </aside>
      </section>
    </main>
  )
}

export default CustomInfoTemplatePage
