import { useState, useEffect } from 'react'
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

function MediaCard({
  title,
  type,
  status,
  currentProgress,
  totalProgress,
  rating,
  progressUnit,
  id,
  onProgressChange,
  onStatusChange,
  onTotalChange,
  onDelete,
  statusOptions,
}) {
  
  const [editedTotal, setEditedTotal] = useState(
    totalProgress === null ? '' : String(totalProgress)
  )

  useEffect(() => {
    setEditedTotal(totalProgress === null ? '' : String(totalProgress))
  }, [totalProgress])

  const progressPercentage =
  totalProgress !== null &&
  totalProgress > 0 &&
  currentProgress !== null
    ? Math.round((currentProgress / totalProgress) * 100)
    : null

  return (
    <article className="bg-gray-800 p-4 rounded-lg">
      <h2>{title}</h2>
      <p>{type} • {status}</p>

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
        {currentProgress !== null && (
          <p>
            {progressUnit} {currentProgress}
            {totalProgress !== null && ` / ${totalProgress}`}
          </p>
        )}
        {progressPercentage !== null && (
          <p className="mt-2 text-purple-400 font-semibold">
            Completed: {progressPercentage}%
          </p>
        )}        
        {progressPercentage !== null && (
          <div className="mt-3">
            <div
              role="progressbar"
              aria-label={`${title} completion progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercentage}
              className="w-full h-3 bg-gray-700 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
        {currentProgress !== null && (
          <div className="mt-3">
            <label htmlFor={`total-${id}`}>
              Edit Total Progress
            </label>
                
            <input
              id={`total-${id}`}
              type="number"
              min="1"
              step="1"
              value={editedTotal}
              onChange={(event) => setEditedTotal(event.target.           value)}
              className="block mt-1 p-2 rounded bg-gray-700 text-white"
            />
        
            <button
              type="button"
              onClick={() => {
                const newTotal =
                  editedTotal.trim() === ''
                    ? null
                    : Number(editedTotal)
              
                const accepted = onTotalChange(id, newTotal)
              
                if (!accepted) {
                  setEditedTotal(
                    totalProgress === null ? '' : String(totalProgress)
                  )
                }
              }}
              className="mt-2 bg-purple-600 text-white px-3         py-1 rounded"
            >
              Save Total
            </button>
          </div>
        )}
        {currentProgress !== null && (
          <button
            type="button"
            onClick={() => onProgressChange(id,           currentProgress - 1)}
            className="mt-2 ml-2 bg-gray-700 text-white px-3 py-1 rounded"
          >
            -1 Progress
          </button>
        )}
        {currentProgress !== null && (
          <button
            type="button"
            onClick={() => onProgressChange(id, currentProgress + 1)}
            className="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
          >
            +1 Progress
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="mt-2 ml-2 rounded bg-red-600 px-3 py-1 text-white"
        >
          Delete
        </button>
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
    currentProgress: 1,
    totalProgress: 1,
    progressUnit: "Part",
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

const progressUnits = {
  Anime: 'Episode',
  'TV Show': 'Episode',
  Manga: 'Chapter',
  Manhwa: 'Chapter',
  Manhua: 'Chapter',
  Novel: 'Chapter',
  Book: 'Page',
  Movie: 'Part',
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
  const [mediaEntries, setMediaEntries] = useState(loadMediaEntries)
  const [statusFilter, setStatusFilter] = useState('All')
  const [entryCurrentProgress, setEntryCurrentProgress] = useState('')
  const [entryTotalProgress, setEntryTotalProgress] = useState('')
  const selectedProgressUnit = progressUnits[entryType] ?? 'Unit'
  
  function loadMediaEntries() {
    try {
      const savedEntries = localStorage.getItem('mediaEntries')
    
      if (savedEntries === null) {
        return initialMediaEntries
      }
    
      const parsedEntries = JSON.parse(savedEntries)
    
      if (!Array.isArray(parsedEntries)) {
        return initialMediaEntries
      }
          
      return parsedEntries.filter((entry) => {
        if (
          entry === null ||
          typeof entry !== 'object' ||
          Array.isArray(entry)
        ) {
          return false
        }
      
        const validId =
          (typeof entry.id === 'string' && entry.id.trim() !== '') ||
          (typeof entry.id === 'number' && Number.isFinite(entry.id))
      
        const validTitle =
          typeof entry.title === 'string' &&
          entry.title.trim() !== ''
      
        const validType =
          typeof entry.type === 'string' &&
          Object.values(typeOptions).flat().includes(entry.type)
      
        const validStatus =
          statusOptions.includes(entry.status)
      
        const validCurrentProgress =
          entry.currentProgress === null ||
          (
            Number.isInteger(entry.currentProgress) &&
            entry.currentProgress >= 0
          )
        
        const validTotalProgress =
          entry.totalProgress === null ||
          (
            Number.isInteger(entry.totalProgress) &&
            entry.totalProgress > 0
          )
        
        const validProgressRange =
          entry.currentProgress === null ||
          entry.totalProgress === null ||
          entry.currentProgress <= entry.totalProgress
        
        return (
          validId &&
          validTitle &&
          validType &&
          validStatus &&
          validCurrentProgress &&
          validTotalProgress &&
          validProgressRange
        )
      })
    } catch (error) {
      console.error('Could not load media entries:', error)
      return initialMediaEntries
    }
  }
  
  useEffect(() => {
    try {
      localStorage.setItem(
        'mediaEntries',
        JSON.stringify(mediaEntries)
      )
    } catch (error) {
      console.error('Could not save media entries:', error)
    }
  }, [mediaEntries])

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
    setEntryCurrentProgress('')
    setEntryTotalProgress('')
  }


  function handleSubmit(event) {
    event.preventDefault()

    // 1. Validate title
    if (!validateTitle()) return

    // 2. Convert input values
    const currentProgress =
      entryCurrentProgress.trim() === ''
        ? null
        : Number(entryCurrentProgress)

    const totalProgress =
      entryTotalProgress.trim() === ''
        ? null
        : Number(entryTotalProgress)

    // 3. Validate progress
    if (
      currentProgress !== null &&
      (!Number.isInteger(currentProgress) || currentProgress < 0)
    ) {
      window.alert('Current progress must be a non-negative whole number.')
      return
    }

    if (
      totalProgress !== null &&
      (!Number.isInteger(totalProgress) || totalProgress <= 0)
    ) {
      window.alert('Total progress must be a positive whole number.')
      return
    }

    if (
      currentProgress !== null &&
      totalProgress !== null &&
      currentProgress > totalProgress
    ) {
      window.alert('Current progress cannot exceed total progress.')
      return
    }

    // 4. Prepare saved values
    const savedCurrentProgress =
      currentProgress === null && totalProgress !== null
        ? 0
        : currentProgress

    let savedStatus = entryStatus

    // 5. Automatically complete at known total
    if (
      totalProgress !== null &&
      savedCurrentProgress === totalProgress
    ) {
      savedStatus = 'Completed'
    }

    // 6. Validate manually selected Completed
    if (savedStatus === 'Completed' && totalProgress === null) {
      window.alert('Enter a valid total before marking an entry Completed.')
      return
    }

    // 7. Confirm early completion
    if (
      savedStatus === 'Completed' &&
      savedCurrentProgress !== totalProgress
    ) {
      const confirmed = window.confirm(
        'Mark this entry Completed?\n\n' +
        'Current progress will be set to the total.'
      )

      if (!confirmed) return
    }

    // 8. Create entry after all checks pass
    const newEntry = {
      id: crypto.randomUUID(),
      title: entryTitle.trim(),
      category: entryCategory,
      type: entryType,
      status: savedStatus,
      currentProgress:
        savedStatus === 'Completed'
          ? totalProgress
          : savedCurrentProgress,
      totalProgress: totalProgress,
      progressUnit: progressUnits[entryType] ?? null,
      rating: null,
    }

    // 9. Save entry
    setMediaEntries((previousEntries) => [
      newEntry,
      ...previousEntries,
    ])

    // 10. Reset and close only after success
    resetForm()
    setIsCreateOpen(false)
  }

  function updateEntryStatus(targetId, newStatus) {
    const entry = mediaEntries.find(
      (item) => item.id === targetId
    )

    if (!entry) return

    if (newStatus === 'Completed') {
      if (
        entry.totalProgress === null ||
        entry.totalProgress === undefined ||
        entry.totalProgress <= 0
      ) {
        window.alert(
          'Enter a valid total progress before marking  this entry Completed.'
        )
        return
      }

      if (entry.currentProgress !== entry.  totalProgress) {
        const confirmed = window.confirm(
          `Complete "${entry.title}"?\n\n` +
          `Progress will change from ${entry. currentProgress ?? 0}` +
          ` to ${entry.totalProgress}.\n\n` +
          'Press OK to confirm or Cancel to keep the  entry unchanged.'
        )

        if (!confirmed) return
      }

      setMediaEntries((previousEntries) =>
        previousEntries.map((item) =>
          item.id === targetId
            ? {
                ...item,
                currentProgress: item.totalProgress,
                status: 'Completed',
              }
            : item
        )
      )

      return
    }

    setMediaEntries((previousEntries) =>
      previousEntries.map((item) =>
        item.id === targetId
          ? { ...item, status: newStatus }
          : item
      )
    )
  }

  function updateEntryProgress(targetId, newProgress) {
    setMediaEntries((previousEntries) =>
      previousEntries.map((entry) => {
        if (entry.id !== targetId) return entry

        if (!Number.isInteger(newProgress) || newProgress < 0) {
          return entry
        }

        if (
          entry.totalProgress !== null &&
          newProgress > entry.totalProgress
        ) {
          return entry
        }

        if (
          entry.status === 'Completed' &&
          newProgress < entry.currentProgress
        ) {
          return entry
        }

        const isComplete =
          entry.totalProgress !== null &&
          newProgress === entry.totalProgress

        return {
          ...entry,
          currentProgress: newProgress,
          status: isComplete ? 'Completed' : entry. status,
        }
      })
    )
  }

  function updateEntryTotal(targetId, newTotal) {
    if (
      newTotal !== null &&
      (!Number.isInteger(newTotal) || newTotal <= 0)
    ) {
      window.alert('Total progress must be a positive   whole number.')
      return false
    }

    const entry = mediaEntries.find(
      (item) => item.id === targetId
    )

    if (!entry) return false

    if (
      entry.currentProgress !== null &&
      newTotal !== null &&
      newTotal < entry.currentProgress
    ) {
      window.alert(
        'Total cannot be smaller than current progress.'
      )
      return false
    }

    if (
      entry.status === 'Completed' &&
      (
        newTotal === null ||
        (
          entry.currentProgress !== null &&
          newTotal > entry.currentProgress
        )
      )
    ) {
      const choice = window.prompt(
        'Increasing the total requires a new status:\n'   +
        '1. In Progress\n' +
        '2. On Hold\n' +
        '3. Dropped\n\n' +
        'Press Cancel to keep the entry unchanged.'
      )

      const choices = {
        '1': 'In Progress',
        '2': 'On Hold',
        '3': 'Dropped',
      }

      const newStatus = choices[choice]

      if (!newStatus) return false

      setMediaEntries((previousEntries) =>
        previousEntries.map((item) =>
          item.id === targetId
            ? {
                ...item,
                totalProgress: newTotal,
                status: newStatus,
              }
            : item
        )
      )

      return true
    }

    setMediaEntries((previousEntries) =>
      previousEntries.map((item) =>
        item.id === targetId
          ? { ...item, totalProgress: newTotal }
          : item
      )
    )

    return true
  }

  function deleteEntry(targetId) {
    const entry = mediaEntries.find(
      (item) => item.id === targetId
    )

    if (!entry) return

    const confirmed = window.confirm(
      `Delete "${entry.title}"?\n\nThis action cannot be undone.`
    )

    if (!confirmed) return

    setMediaEntries((previousEntries) =>
      previousEntries.filter(
        (item) => item.id !== targetId
      )
    )
  }

  function requestProgressChange(targetId, newProgress)   {
    const entry = mediaEntries.find(
      (item) => item.id === targetId
    )

    if (!entry) return

    if (
      entry.status === 'Completed' &&
      newProgress < entry.currentProgress
    ) {
      const choice = window.prompt(
        'Choose a new status:\n' +
        '1. In Progress\n' +
        '2. On Hold\n' +
        '3. Dropped\n\n' +
        'Press Cancel to keep Completed.'
      )

      const choices = {
        '1': 'In Progress',
        '2': 'On Hold',
        '3': 'Dropped',
      }

      const newStatus = choices[choice]

      if (!newStatus) return

      setMediaEntries((previousEntries) =>
        previousEntries.map((item) =>
          item.id === targetId
            ? {
                ...item,
                currentProgress: newProgress,
                status: newStatus,
              }
            : item
        )
      )

      return
    }

    updateEntryProgress(targetId, newProgress)
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

            <div className="mt-4">
              <label htmlFor="entry-current-progress">
                Current Progress ({selectedProgressUnit})
              </label>

              <input
                id="entry-current-progress"
                type="number"
                min="0"
                step="1"
                value={entryCurrentProgress}
                onChange={(event) =>
                  setEntryCurrentProgress(event.target.value)
                }
                placeholder="e.g. 5"
                className="block w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
              
            <div className="mt-4">
              <label htmlFor="entry-total-progress">
                Total {selectedProgressUnit}s (optional)
              </label>
              
              <input
                id="entry-total-progress"
                type="number"
                min="1"
                step="1"
                value={entryTotalProgress}
                onChange={(event) =>
                  setEntryTotalProgress(event.target.value)
                }
                placeholder="Leave blank if unknown"
                className="block w-full p-2 rounded bg-gray-700 text-white"
              />
              
              <p className="mt-1 text-sm text-gray-400">
                Leave the total blank if you don't know it yet.
                You can update it later.
              </p>

            </div>
            
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
                    onProgressChange={requestProgressChange}
                    onTotalChange={updateEntryTotal}
                    onDelete={deleteEntry}
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