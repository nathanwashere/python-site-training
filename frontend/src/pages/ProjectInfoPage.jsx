import { useState } from 'react'

const apiUrl = 'http://127.0.0.1:8000'

const initialFormData = {
  fullName: '',
  email: '',
  age: '',
  gender: '',
  projectName: '',
  participantsAmount: '',
  supervisorName: '',
}

async function sendData(payload) {
  const user = {
    fullName: payload.fullName,
    email: payload.email,
    age: payload.age,
    gender: payload.gender,
  }

  const project = {
    name: payload.projectName,
    amountParticipants: payload.participantsAmount,
    nameSupervisor: payload.supervisorName,
  }

  try {
    const response = await fetch(`${apiUrl}/info`, {
      method: 'POST',
      body: JSON.stringify({ user, project }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Could not get to /info!')
    }

    const data = await response.json()
    console.log('This is data:', data)
  } catch (error) {
    console.log('Error while sending data to create user:\n', error)
  }
}

function ProjectInfoPage() {
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = ({ target }) => {
    const { name, value } = target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Form data ready for backend:', formData)
    sendData(formData)
  }

  return (
    <main className="shell">
      <section className="page-header">
        <a className="back-link" href="#/">
          Back to home
        </a>
        <p className="eyebrow">Your current form</p>
        <h1>User and project info</h1>
        <p className="section-description">
          This is the same page you had before, now separated into its own
          screen so the app has a cleaner structure.
        </p>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-copy">
            <h2>Registration form</h2>
            <p>
              All fields still go into one state object named{' '}
              <code>formData</code>.
            </p>
          </div>

          <form className="project-form" onSubmit={handleSubmit}>
            <label>
              <span>Full name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Smith"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </label>

            <label>
              <span>Age</span>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
              />
            </label>

            <label>
              <span>Gender</span>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              <span>Project name</span>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Community Study"
              />
            </label>

            <label>
              <span>Amount of participants</span>
              <input
                type="number"
                name="participantsAmount"
                value={formData.participantsAmount}
                onChange={handleChange}
                placeholder="10"
              />
            </label>

            <label>
              <span>Name of supervisor</span>
              <input
                type="text"
                name="supervisorName"
                value={formData.supervisorName}
                onChange={handleChange}
                placeholder="Dr. Sarah Lee"
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        </article>

        <aside className="panel preview-panel">
          <h2>Current formData</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </aside>
      </section>
    </main>
  )
}

export default ProjectInfoPage
