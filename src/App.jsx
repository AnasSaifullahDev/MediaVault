import './App.css'

function Sidebar() {
  return (
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
  )
}

function MediaCard({title, type, status, episode, totalEpisodes}) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{type} • {status}</p>
      <p>Episode {episode} / {totalEpisodes}</p>
    </article>
  )
}

function App() {
  return (
    <>
      <header>
        <h1>MediaVault</h1>
        <button type="button">Create</button>
      </header>

      <Sidebar />

      <main id="dashboard">
        <h1>Dashboard</h1>

        <section id="entries">
          <h2>Latest Entries</h2>
          <MediaCard 
            title="Example Anime"
            type="Anime"
            status="In Progress"
            episode={5}
            totalEpisodes={12}
          />
          <MediaCard 
            title="Example Movie"
            type="Movie"
            status="Completed"
            episode={1}
            totalEpisodes={1}
          />
        </section>
      </main>
    </>
  )
}

export default App