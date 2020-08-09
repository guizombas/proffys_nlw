addTime.onclick = () =>{
    //  duplica campos
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)
    //  limpa campos
    const fields = newFieldContainer.querySelectorAll("input")
    fields.forEach(function(field){
        field.value = ""
    })
    //coloca no html
    document.querySelector(".schedule-item").after(newFieldContainer)

}