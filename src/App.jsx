import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>MediaVault</h1>
        <button type="button">Create</button>
      </header>

      <aside>
        <nav>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#entries">All Entries</a></li>
            <li><a href="#media">Media</a></li>
            <li><a href="#literature">Literature</a></li>
          </ul>
        </nav>
      </aside>

      <main id="dashboard">
        <h1>Dashboard</h1>

        <section id="entries">
          <h2>Latest Entries</h2>
        </section>
      </main>
    </>
  )
}

export default App