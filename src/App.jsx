import './App.css'

function Sidebar() {
  return (
    <aside className="w-full lg:w-64 shrink-0 p-6 text-left">
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
    <article className="bg-gray-800 p-4 rounded-lg">
      <h2>{title}</h2>
      <p>{type} • {status}</p>
      <p>Episode {episode} / {totalEpisodes}</p>
    </article>
  )
}

function App() {
  return (
    <>
      <header className="flex items-center justify-between p-6">        
        <h1 className="text-3xl font-bold text-purple-500">MediaVault</h1>
        <button type="button">Create</button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">

        <Sidebar />

        <main id="dashboard" className="flex-1 min-w-0 p-6 text-left">
          <h1>Dashboard</h1>

          <section id="entries" className="flex flex-col gap-4">
            <h2>Latest Entries</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
          </section>
        </main>
      </div>
    </>
  )
}
          
export default App