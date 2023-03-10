import { useState, useEffect } from 'react';

// library imports

const EditForm = ({ editedTask, updateTask, closeEditMode, fetchTodos }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.title);
  const [updatedTaskDescription, setUpdatedTaskDescription] = useState(editedTask.description);

  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeEditMode();
    }

    window.addEventListener('keydown', closeModalIfEscaped)

    return () => {
      window.removeEventListener('keydown', closeModalIfEscaped)
    }
  }, [closeEditMode])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // updateTask({ ...editedTask, title: updatedTaskName, description: updatedTaskDescription })
    const response = await fetch('http://localhost:3000/api/v1/todos/' + editedTask.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
      body: JSON.stringify({ title: updatedTaskName, description: updatedTaskDescription })
    })
    if (response.ok) {
      fetchTodos()
      closeEditMode()
    }

  }

  return (
    <>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => closeEditMode(false)}
        ></div>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div
            role="dialog"
            aria-labelledby="editTask"
            onClick={(e) => { e.target === e.currentTarget && closeEditMode() }}
          >
            <form
              className="todo"
              onSubmit={handleFormSubmit}
            >
              <div className="wrapper">
                <input
                  type="text"
                  id="editTask"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  value={updatedTaskName}
                  onInput={(e) => setUpdatedTaskName(e.target.value)}
                  required
                  autoFocus
                  maxLength={60}
                  placeholder="title"
                />

                <input
                  type="text"
                  id="editTask"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  value={updatedTaskDescription}
                  onInput={(e) => setUpdatedTaskDescription(e.target.value)}
                  required
                  maxLength={60}
                  placeholder="description"
                />
              </div>
              <button
                className="btn"
                aria-label={`Confirm edited task to now read ${updatedTaskName}`}
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default EditForm