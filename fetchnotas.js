async function postMark() {
    try {

        let json = 
            {
                "student_id": document.getElementById("student_id").value,
                "subject_id": document.getElementById("subject_id").value,
                "date1": document.getElementById("date").value,
                "nota1":document.getElementById("mark").value
                  
        }




        const url = "http://localhost:3000/notas";

        let param =
        {
            headers: { "Content-type": "application/json; charset= UTF-8" },
            body: JSON.stringify(json),
            method: "POST"
        }

        let data = await fetch(url, param);
        let result = await (data.json());


        console.log(result);



    }
    catch (error) {
        console.log(error);
    }
}

async function getMark() {
    var id = document.getElementById("student_id").value
    let url = `http://localhost:3000/notas?id=${id}`;
 

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
                nota.innerHTML ="NOTA: " + result[key].mark
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




async function putMark() {
    
    let date; 
    date = document.getElementById("date").value !== "" ? date = document.getElementById("date").value: date = null;
    
    let json1 = {
        
        "student_id": parseInt(document.getElementById("student_id").value),
                "subject_id": parseInt(document.getElementById("subject_id")),
                
                "date1": date,
                "nota1": parseInt(document.getElementById("mark").value),
                "markid": document.getElementById("id_mark").value
       
    }

    let url = `http://localhost:3000/notas`
    let param =
    {
        headers: { "Content-type": "application/json; charset= UTF-8" },
        body: JSON.stringify(json1),
        method: "PUT"
    }
    console.log(JSON.stringify(json1));
    try {
        let data = await fetch(url, param)
        let result = await data.json()
        
       
      
        
        console.log(result);
    }
    catch (e) {
        console.log(e);
    }

};

async function deleteMark() {
   

    let param = {
        headers: { "Content-type": "application/json; charset= UTF-8" },
        body: JSON.stringify({
            "markid": document.getElementById("id_mark").value
        }),
        method: "DELETE"
    }
    let url = "http://localhost:3000/notas"


    try {
        let data = await fetch(url, param)
        let result = await data.json()

        alert('SE HA BORRADO LA NOTA')
    } catch (err) {
    }
;}

