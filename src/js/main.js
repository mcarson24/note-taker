import $ from 'jquery'

$.when($.ready)
  .then(() => {
    $.ajax('/api/notes')
      .done(data => {
        data.forEach(note => {
          const noteItem = $('<li>').text(note.title).addClass('flex justify-between py-3 px-3 text-xl odd:bg-slate-200')
          const svg = $(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>`)
          svg.addClass('w-6 h-6 fill-red-500')
          noteItem.append(svg)
          $('#saved-notes ul').append(noteItem)
        });
      })
  })

$('#save-note').click(() => $('#new-note-form').submit())
$('#new-note').click(e => console.log('Add a note...'))