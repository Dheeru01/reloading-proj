const input = document.getElementById("ipt");
const ctn = document.querySelector(".container");
const btn_save = document.getElementById("save");
const btn_add = document.getElementById("add");
let tasks = localStorage.getItem("tasks")? JSON.parse(localStorage.getItem("tasks")):[];
show();
function show(){
    tasks.forEach((value,index)=> {
        const output = document.createElement("div");
        output.setAttribute("class" , "output");
        const append_here = document.querySelector(".append_here");
        append_here.append(output); 

        const ck_box = document.createElement("input");
        ck_box.type = "checkbox";
        ck_box.setAttribute("id","ck-box");
        ck_box.checked = value.checked;
        output.append(ck_box);  

        const para = document.createElement("p");
        const icon = document.createElement("i");
        para.innerText = value.task;
        icon.className = "fa-solid fa-trash right-icon";
        para.appendChild(icon);  
        output.append(para);

        if (value.checked) {
            para.classList.add("checked-text");
        }

        ck_box.addEventListener("change", () => {
            // Update the 'checked' property in the tasks array
            tasks[index].checked = ck_box.checked;
            //para.style.textDecoration = tasks[index].checked? "line-through":"none";
            para.classList.toggle("checked-text", tasks[index].checked);
            //para.toggle(check-box-text-line-through);
        });

        icon.addEventListener("click",()=>{
            remove_task();
            tasks.splice(index,1);
            show(); 
        });
        });
}
function remove_task(){
    tasks.forEach(()=>{
        const div = document.querySelector(".output");

        div.remove();
    })
}
btn_add.addEventListener("click",(e)=>{
    e.preventDefault();
    remove_task();
    if(input.value===""){
        show();
    }
    else{
        tasks.push({task:input.value});
        show(); 
    }   
    
});
btn_save.onclick = function(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
    
}



