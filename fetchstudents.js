


async function postStudent() {
    try {

        let json = 
            {
                "nombre1": document.getElementById("name").value,
                "apellidos1": document.getElementById("lastname").value,
                "idgrupo1": document.getElementById("group").value,
                "añoinicio1":document.getElementById("styears").value
                  
        }




        const url = "http://localhost:3000/alumnos";

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


async function getStudent() {
    var id = document.getElementById("id").value
    let url = id == null || id == undefined || id == 0 ? "http://localhost:3000/alumnos" : `http://localhost:3000/alumnos?id=${id}`;
 

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
        let i = id !== undefined? id - 1: null;
        
        if (result[i] !== undefined){
        document.getElementById("section").style.display = "flex"
        document.getElementById("showname").innerHTML = "NOMBRE DEL ALUMNO: " + result[i].first_name
        document.getElementById("showlastn").innerHTML = "APELLIDOS: " + result[i].last_name
        document.getElementById("showgr").innerHTML = "GRUPO: " + result[i].group_id
        document.getElementById("showye").innerHTML = "AñO DE INICIO : " + result[i].starting_year
        }
        else{
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
                let grupo = document.createElement("p")
                grupo.innerHTML = "GRUPO DEL ALUMNO: " + result[key].group_id
                alumno.appendChild(grupo)
                let year = document.createElement("p")
                year.innerHTML = "AñO DE INGRESO: " + result[key].starting_year
                alumno.appendChild(year)   
                tabla.appendChild(alumno)               
                main.insertBefore(tabla, document.getElementById("footer"))
                    
                        
                    }
                }

            }
        
    
    catch (e) {
        console.log(e);
    }

}


async function putAlumno() {
    let id = document.getElementById("id").value
    let nombre; 
    nombre = document.getElementById("name").value !== ""? nombre = document.getElementById("name").value: nombre = null;
    let apellido;
    apellido = document.getElementById("lastname").value !== "" ? apellido = document.getElementById("lastname").value: apellido = null ;
    let json1 = {
        
        "nombre1": nombre,
                "apellidos1": apellido,
                "idgrupo1": parseInt(document.getElementById("group").value),
                "añoinicio1": parseInt(document.getElementById("styears").value),
                "id": document.getElementById("id").value
       
    }

    let url = `http://localhost:3000/alumnos`
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
        id = (document.getElementById("id").value)
       
      
        
        console.log(result);
    }
    catch (e) {
        console.log(e);
    }

}

async function deleteAlumno() {
   

    let param = {
        headers: { "Content-type": "application/json; charset= UTF-8" },
        body: JSON.stringify({
            id: document.getElementById("id").value
        }),
        method: "DELETE"
    }
    let url = "http://localhost:3000/alumnos"


    try {
        let data = await fetch(url, param)
        let result = await data.json()

        alert('el alumno fue borrado')
    } catch (err) {
    }
}
