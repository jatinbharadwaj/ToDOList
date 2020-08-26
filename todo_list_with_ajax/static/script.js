 

    // function refreshtodolist(){
    //     $('#list').empty()
    //     $.get('/todo',(data)=>{
    //         for(let i = 0 ; i<data.length ; i++){
    //             $('#list').append(
    //                 $('<li>').text(data[i])
    //             )
    //         }
    //     })
    // }

    // refreshtodolist()

    // $('#btn').click(()=>{
    //     // console.log('clicked')
    //     let val = $('#inp').val()
    //     console.log(val)
    //     $.get(`/addtodo?task=${val}`,(data)=>{
    //         if(data == 'success'){
    //             refreshtodolist()
    //         }
    //     })
    // })
    let ulTasks = $('#ulTasks')
    let btnAdd = $('#btnAdd')
    let btnReset = $('#btnReset')
    let btnSort = $('#btnSort')
    let btnCleanup = $('#btnCleanup')
    let inpNewTask = $('#inpNewTask')
    
    
    function addItem() {
      let listItem = $('<li>', {
        'class': 'list-group-item',
        text: inpNewTask.val()
      }).append(
        $('<button>')
            .text('⬆️')
            .attr('class','btnup')
            .click((ev)=>{
                $(ev.target)
                .parent()
                    .insertBefore($(ev.target).parent().prev())
             listItem.toggleClass('done')
            })
    )
    .append(
        $('<button>')
            .text('⬇️').attr('class','btndn')
            .click((ev)=>{
                $(ev.target)
                    .parent()
                    .insertAfter($(ev.target).parent().next())
          listItem.toggleClass('done')
          })
    )
      listItem.click(() => {
        listItem.toggleClass('done')
      })
      ulTasks.append(listItem)
      inpNewTask.val('')
      toggleInputButtons()
    }
    
    function clearDone() {
      $('#ulTasks .done').remove()
      toggleInputButtons()
    }
    
    function sortTasks() {
      $('#ulTasks .done').appendTo(ulTasks)
    }
    
    function toggleInputButtons() {
      btnReset.prop('disabled', inpNewTask.val() == '')
      btnAdd.prop('disabled', inpNewTask.val() == '')
      btnSort.prop('disabled', ulTasks.children().length < 1)
      btnCleanup.prop('disabled', ulTasks.children().length < 1)
    }
    
    inpNewTask.keypress((e) => {
      if (e.which == 13) addItem()
    })
    inpNewTask.on('input', toggleInputButtons)
    
    btnAdd.click(addItem)
    btnReset.click(() => {
      inpNewTask.val('')
      toggleInputButtons()
    })
    btnCleanup.click(clearDone)
    btnSort.click(sortTasks)
