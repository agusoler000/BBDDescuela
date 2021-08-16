async function getApuntadas() {
    var id = document.getElementById("student_id").value
    let url = id == null || id == undefined || id == 0 ? "http://localhost:3000/apuntadas" : `http://localhost:3000/apuntadas?id=${id}`;
 

    let param = {
        headers: { "Content-type": "application/json; charset= UTF-8" },

        method: "GET"
    }
    try {
        let data = await fetch(url, param)
        let result = await data.json()
        console.log(result);
        console.log(typeof(result));

        let main = document.getElementById("main")
            for (let key in result) {
                let tabla = document.createElement("li")
                tabla.setAttribute("id", "tabla")
                let alumno = document.createElement("li")
                let nombre = document.createElement("p")
                nombre.innerHTML ="NOMBRE DEL ALUMNO: " + result[key].first_name
                alumno.appendChild(nombre)
                let apellido = document.createElement("p")
                apellido.innerHTML = "APELLIDO DEL ALUMNO: " + result[key].last_name
                alumno.appendChild(apellido)
                let asignatura = document.createElement("p")
                asignatura.innerHTML = "ASIGNATURA: " + result[key].title
                alumno.appendChild(asignatura)
                  
                tabla.appendChild(alumno)               
                main.insertBefore(tabla, document.getElementById("footer"))
            }

                   
        } 
    
    catch (e) {
        console.log(e);
    }

}



async function getAVG() {
    var id = document.getElementById("student_id").value
    let url = `http://localhost:3000/media?id=${id}`;
 

    let param = {
        headers: { "Content-type": "application/json; charset= UTF-8" },

        method: "GET"
    }
    try {
        let data = await fetch(url, param)
        let result = await data.json()
        console.log(result);
        console.log(typeof(result));
        // let aside = document.getElementById("aside")
        // aside.setAttribute("style", 'display-flex')
      
        
                let main = document.getElementById("main")
            for (let key in result) {
                let tabla = document.createElement("li")
                tabla.setAttribute("id", "tabla")
                let alumno = document.createElement("li")
                let nota = document.createElement("p")
                nota.innerHTML ="NOTA: " + parseFloat(result[key].AVG)
                alumno.appendChild(nota)
                let nombre = document.createElement("p")
                nombre.innerHTML = "NOMBRE DEL ALUMNO: " + result[key].first_name
                alumno.appendChild(nombre)
                let apellido = document.createElement("p")
                apellido.innerHTML = "APELLIDO DEL ALUMNO: " + result[key].last_name
                alumno.appendChild(apellido)
                let asig = document.createElement("p")
                asig.innerHTML = "ASIGNATURA: " + result[key].title
                alumno.appendChild(asig)   
                tabla.appendChild(alumno)               
                main.insertBefore(tabla, document.getElementById("footer"))
                    
                        
                    }
   
                }

                 
    catch (e) {
        console.log(e);
    }

}


async function getImpartidas() {
    var id = document.getElementById("teacher_id").value
    let url = id == null || id == undefined || id == 0 ? "http://localhost:3000/impartidas" : `http://localhost:3000/impartidas?id=${id}`;
 

    let param = {
        headers: { "Content-type": "application/json; charset= UTF-8" },

        method: "GET"
    }
    try {
        let data = await fetch(url, param)
        let result = await data.json()
        console.log(result);
        console.log(typeof(result));

        let main = document.getElementById("main")
            for (let key in result) {
                let tabla = document.createElement("li")
                tabla.setAttribute("id", "tabla")
                let profesor = document.createElement("li")
                let nombre = document.createElement("p")
                nombre.innerHTML ="NOMBRE DEL PROFESOR: " + result[key].first_name
                profesor.appendChild(nombre)
                let apellido = document.createElement("p")
                apellido.innerHTML = "APELLIDO DEL PROFESOR: " + result[key].last_name
                profesor.appendChild(apellido)
                let asignatura = document.createElement("p")
                asignatura.innerHTML = "ASIGNATURA: " + result[key].title
                profesor.appendChild(asignatura)
                  
                tabla.appendChild(profesor)               
                main.insertBefore(tabla, document.getElementById("footer"))
            }

                   
        } 
    
    catch (e) {
        console.log(e);
    }

}