let ulTasks = $('#ulTasks')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let btnSort = $('#btnSort')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#inpNewTask')
  
    function refreshtodolist(){
        ulTasks.empty()
        $.get('/todo',(data)=>{
            for(let i = 0 ; i<data.length ; i++){
                addItem(data[i],i)
            }
        })
    }

    refreshtodolist()

    btnAdd.click(()=>{
        let val = inpNewTask.val()
        $.get(`/addtodo?task=${val}`,(data)=>{
            if(data == 'success'){
                refreshtodolist()
            }
        })
    })
    
    function addItem(data,i) {
      let listItem = $('<li>', {
        'class': 'list-group-item',
        'id': i,
        text:data
      }).append(
        $('<button>')
            .text('⬆️')
            .attr('class','btnup')
            .click((ev)=>{
                $(ev.target)
                .parent()
                    .insertBefore($(ev.target).parent().prev())
             listItem.toggleClass('done')

             $.get(`/up?i=${i}`,(data)=>{
                console.log(i)
                 if(data == 'success'){
                  refreshtodolist()
                    console.log("here")
                 }
             })
            })
    ).append(
        $('<button>')
            .text('⬇️').attr('class','btndn')
            .click((ev)=>{
                $(ev.target)
                    .parent()
                    .insertAfter($(ev.target).parent().next())
          listItem.toggleClass('done')
          $.get(`/down?i=${i}`,(data)=>{
            console.log(i)
             if(data == 'success'){
              refreshtodolist()
                console.log("down")
             }
         })
          })
    )
      listItem.click(() => {
        listItem.toggleClass('done')
      })
      ulTasks.append(listItem)
      inpNewTask.val('')
      toggleInputButtons()

    }
// ------------------------- ADD ITEM END ------------------- //
   
    function clearDone() {
      $('#ulTasks .done').remove()
      toggleInputButtons()
      
    }

// -------------------------- Delete End -------------------------//
  
    function sortTasks() {
      $('#ulTasks .done').appendTo(ulTasks)
    }

// --------------------------- Sort Task END ----------------------// 
    
    function toggleInputButtons() {
      btnReset.prop('disabled', inpNewTask.val() == '')
      btnAdd.prop('disabled', inpNewTask.val() == '')
      btnSort.prop('disabled', ulTasks.children().length < 1)
      btnCleanup.prop('disabled', ulTasks.children().length < 1)
    }

// ------------------------Toggle Button End ----------------------//
    
    inpNewTask.keypress((e) => {
      if (e.which == 13){
        let val = inpNewTask.val()
        $.get(`/addtodo?task=${val}`,(data)=>{
            if(data == 'success'){
                refreshtodolist()
            }
        })
      }
    })
    inpNewTask.on('input', toggleInputButtons)
    
    // btnAdd.click(addItem)
    btnReset.click(() => {
      inpNewTask.val('')
      toggleInputButtons()
    })
    btnCleanup.click(clearDone)
    btnSort.click(sortTasks)
