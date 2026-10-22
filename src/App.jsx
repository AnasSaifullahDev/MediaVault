import { useState } from 'react'
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

function MediaCard({title,
                    type,
                    status,
                    currentProgress,
                    totalProgress,
                    rating,
                    progressUnit,
                    id,
                    onStatusChange,
                    statusOptions}) {
  return (
    <article className="bg-gray-800 p-4 rounded-lg">
      <h2>{title}</h2>
      <p>{type} • {status}</p>
        {currentProgress !== null && (
          <p>
            {progressUnit} {currentProgress}
            {totalProgress !== null && ` / ${totalProgress}`}
          </p>
        )}
      {rating !== null && <p>Rating: {rating}</p>}
    </article>
  )
}

const initialMediaEntries = [
  {
    id: 1,
    title: "Example Anime",
    type: "Anime",
    status: "In Progress",
    currentProgress: 5,
    totalProgress: 12,
    progressUnit: "Episode",
    rating: "Recommended",
  },
  {
    id: 2,
    title: "Example Movie",
    type: "Movie",
    status: "Completed",
    currentProgress: null,
    totalProgress: null,
    progressUnit: null,
    rating: null,
  },
  {
    id: 3,
    title: "Example Ongoing Anime",
    type: "Anime",
    status: "In Progress",
    currentProgress: 8,
    totalProgress: null,
    progressUnit: "Episode",
    rating: null,
  },
  {
    id: 4,
    title: "Example Manga",
    type: "Manga",
    status: "In Progress",
    currentProgress: 15,
    totalProgress: 100,
    rating: "Recommended",
    progressUnit: "Chapter",
  },
]

const typeOptions = {
  Media: ['Anime', 'Movie', 'TV Show'],
  Literature: ['Manga', 'Manhwa', 'Manhua', 'Novel', 'Book'],
}

const statusOptions = [
  'Planned',
  'In Progress',
  'On Hold',
  'Dropped',
  'Completed',
]

function App() {

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [entryTitle, setEntryTitle] = useState('')
  const [entryCategory, setEntryCategory] = useState('Media')
  const [entryType, setEntryType] = useState('Anime')
  const [entryStatus, setEntryStatus] = useState('Planned')
  const [titleError, setTitleError] = useState('')
  const [mediaEntries, setMediaEntries] = useState(initialMediaEntries)
  const [statusFilter, setStatusFilter] = useState('All')

  function validateTitle() {
    if (entryTitle.trim() === '') {
      setTitleError('Title is required.')
      return false
    }

    setTitleError('')
    return true
  }

  function resetForm() {
    setEntryTitle('')
    setEntryCategory('Media')
    setEntryType('Anime')
    setEntryStatus('Planned')
    setTitleError('')
  }

  function handleSubmit(event) {

  event.preventDefault()

  const isValid = validateTitle()

  if (!isValid) {
      return
    }
  
    const newEntry = {
      id: crypto.randomUUID(),
      title: entryTitle.trim(),
      category: entryCategory,
      type: entryType,
      status: entryStatus,
      currentProgress: null,
      totalProgress: null,
      progressUnit: null,
      rating: null,
    }
    
    setMediaEntries((previousEntries) => [
      newEntry,
      ...previousEntries,
    ])
    
    setEntryTitle('')
    setEntryCategory('Media')
    setEntryType('Anime')
    setEntryStatus('Planned')
    setTitleError('')
    setIsCreateOpen(false)

    console.log('Form submitted successfully!')
    console.log('Title:', entryTitle.trim())
    console.log('Category:', entryCategory)
    console.log('Type:', entryType)
    console.log('Status:', entryStatus)

    resetForm()
    setIsCreateOpen(false)

    function updateEntryStatus(targetId, newStatus) {
      setMediaEntries((previousEntries) =>
        previousEntries.map((entry) =>
          entry.id === targetId
            ? { ...entry, status: newStatus }
            : entry
        )
      )
    }
  }

  const filteredEntries = mediaEntries.filter((entry) => {
    return statusFilter === 'All' || entry.status === statusFilter
  })

  return (
    <>
      <header className="flex items-center justify-between p-6">        
        <h1 className="text-3xl font-bold text-purple-500">MediaVault</h1>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          Create
        </button>
      </header>

      {isCreateOpen && (
        <section className="p-6 bg-gray-800 rounded-lg">
          <h2>Create New Entry</h2>

          <form onSubmit={handleSubmit}>
      
            <label htmlFor="entry-title">Title</label>
        
            <input
              id="entry-title"
              type="text"
              value={entryTitle}
              onChange={(event) => setEntryTitle(event.target.value)}
              placeholder="Enter a title"
              className="block w-full p-2 rounded bg-gray-700 text-white"
            />

            {titleError && (
              <p className="text-red-400" role="alert">
                {titleError}
              </p>
            )}

            <p>You entered: {entryTitle}</p>

            <label htmlFor="entry-category">Category</label>

            <select
              id="entry-category"
              value={entryCategory}
              onChange={(event) => {
                const newCategory = event.target.value

                setEntryCategory(newCategory)
                setEntryType(typeOptions[newCategory][0])
              }}
              className="block w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="Media">Media</option>
              <option value="Literature">Literature</option>
            </select>

            <p>Selected category: {entryCategory}</p>

            <label htmlFor="entry-type">Type</label>

            <select
              id="entry-type"
              value={entryType}
              onChange={(event) => setEntryType(event.target.value)}
              className="block w-full p-2 rounded bg-gray-700 text-white"
            >
              {typeOptions[entryCategory].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            
            <p>Selected type: {entryType}</p>

            <label htmlFor="entry-status">Status</label>

            <select
              id="entry-status"
              value={entryStatus}
              onChange={(event) => setEntryStatus(event.target.value)}
              className="block w-full p-2 rounded bg-gray-700 text-white"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            
            <p>Selected status: {entryStatus}</p>

            <label htmlFor={`status-${id}`}>Update Status</label>

            <select
              id={`status-${id}`}
              value={status}
              onChange={(event) => onStatusChange(id, event.target.value)}
              className="block mt-2 p-2 rounded bg-gray-700 text-white"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
            >
              Create Entry
            </button>
            
            <button
              type="button"
              onClick={() => {
                resetForm()
                setIsCreateOpen(false)
              }}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Back
            </button>

          </form>
        </section>
      )}

      <div className="flex flex-col lg:flex-row gap-6">

        <Sidebar />

        <main id="dashboard" className="flex-1 min-w-0 p-6 text-left">
          <h1>Dashboard</h1>

          <section id="entries" className="flex flex-col gap-4">
              
            <h2>Latest Entries</h2>

            <label htmlFor="status-filter">Filter by Status</label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option value="All">All</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEntries.slice(0, 5).map((entry) => (
                  <MediaCard
                    key={entry.id}
                    title={entry.title}
                    type={entry.type}
                    status={entry.status}
                    currentProgress={entry.currentProgress}
                    totalProgress={entry.totalProgress}
                    rating={entry.rating}
                    progressUnit={entry.progressUnit}
                    id={entry.id}
                    onStatusChange={updateEntryStatus}
                    statusOptions={statusOptions}
                  />
                ))}
              </div>
          </section>
        </main>
      </div>
    </>
  )
}
          
export default App