import $ from 'jquery'
import axios from 'axios'

let notes
let displayedNote

const updateDisplayedNote = note => {
  displayedNote = note
  $('#note-title').text(note.title)
  $('#note-text').text(note.text)
}

const addNote = note => {
  const noteItem = $('<li>').text(note.title).addClass('flex justify-between py-3 px-3 text-xl odd:bg-slate-200 hover:cursor-pointer').attr('data-id', note.uuid)
  const svg = $('<button>').append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>`)
  svg.addClass('w-6 h-6 fill-red-500')
  noteItem.click(() => {
    $('form').hide()
    $('#note').show()
    updateDisplayedNote(note)
  })

  svg.click(e => {
    axios.delete(`/api/notes/${note.uuid}`)
    .then(response => {
      notes = response.data
      render()

      // If there are no more notes, show the create note form.
      if (!notes.length) {
        $('form').show()
        $('#note').hide()
      }

      // If the note that is being deleted is currently being displayed,
      // switch the currently displayed note to the first in the array.
      else if (displayedNote.uuid === note.uuid) updateDisplayedNote(notes[0])

    })
  })
  noteItem.append(svg)
  $('#saved-notes ul').append(noteItem)
}

const render = () => {
  $('#saved-notes ul').html('')
  // Render each a noteItem for each note in the notes array
  notes.forEach(note => {
    addNote(note)
  });
}

$.when($.ready)
  .then(() => {
    $.ajax('/api/notes', {
      error: err => console.log(err)
    }).done(data => {
        notes = data
        if (!notes.length) {
           // Show the add new note form
          $('form').show()
          // Hide any currently visible note
          $('#note').hide()
        } else {
          updateDisplayedNote(notes[0])
          $('form').hide()
          $('#note').show()
        }
        render()
      })
  })

$('#save-note').click((e) => { 
  const title = $('input[name="title"]')
  const text = $('textarea[name="text"]')
  if (!title.val() || !text.val()) return
  axios.post('/api/notes', {
    title: $('input[name="title"]').val(),
    text: $('textarea[name="text"]').val()
  }).then(response => {
    notes.push(response.data)
    render()
    title.val('')
    text.val('')
  })
})

$('#new-note').click(() => {
  // Show the add new note form
  $('form').show()
  // Hide any currently visible note
  $('#note').hide()
})