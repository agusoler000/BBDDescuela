const express = require('express');
const app = express();
let cors = require('cors');
const { request } = require('express');
let mysql = require('mysql2')
const port = 3000;


const connection = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '9876543210',
    'database': 'escuela'
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Coneccion correcta');
    }
});


app.use(cors());
app.use(express.json());





app.get('/alumnos',
function(request,respond){
   let sql;
   if(request.query.id == null){
       sql = "SELECT * FROM students";
   }else{
       sql = "SELECT * FROM students WHERE student_id=" + request.query.id 
   }
   connection.query(sql, function (err, result){
       if(err)throw err;
       
       respond.send(result)
   })
});

app.post('/alumnos',
function(request,response){
    console.log(request.body);
    let sql = "INSERT INTO students (first_name, last_name, group_id, starting_year) VALUES ?";
    let params =  [[request.body.nombre1, request.body.apellidos1, request.body.idgrupo1,request.body.añoinicio1]];
            console.log(sql);
            console.log(params);
            connection.query(sql, [params], function (err, result){
                if(err) throw err;  
                
                response.send(String(result.insertId));                   
            })
});

app.put('/alumnos',
function(request, response){
    console.log(request.body);
    let params =  [request.body.nombre1, request.body.apellidos1, request.body.idgrupo1,request.body.añoinicio1,request.body.id];
    let sql = "UPDATE students SET first_name = COALESCE(?, students.first_name)," + "last_name = COALESCE(?, students.last_name)," + 
    "group_id = COALESCE(?, students.group_id)," + "starting_year = COALESCE(?, students.starting_year) WHERE student_id = ?"
    console.log('EL ALUMNO HA SIDO MODIFICADO' + sql);
    connection.query(sql, params, function (err, result){
        if(err) throw err;  
        
        response.send(String(result.insertId));                   
    })

});


app.delete('/alumnos',
function(request,response){

    let params = [request.body.id]
    let sql = "DELETE FROM students WHERE student_id = ?"
    console.log('EL ALUMNO HA SIDO BORRADO');



    connection.query(sql, params, function (err, result){
        if(err) throw err;  
        
        response.send(String(result.insertId));   
    })
});  


app.get('/notas',
function(request,respond){
   let sql;
   if(request.query.id !== null){
       sql = "SELECT marks.mark, students.first_name, students.last_name, subjects.title  FROM marks JOIN students on (marks.student_id = students.student_id) JOIN subjects on (marks.subject_id = subjects.subject_id) WHERE students.student_id=" + request.query.id 
   }
   connection.query(sql, function (err, result){
       if(err)throw err;
       
       respond.send(result)
   })
});

app.post('/notas',
function(request,response){
    console.log(request.body);
    let sql = "INSERT INTO marks (student_id, subject_id, date, mark) VALUES ?"
    let params =  [[request.body.student_id, request.body.subject_id, request.body.date1,request.body.nota1]];
            console.log(sql);
            console.log(params);
            connection.query(sql, [params], function (err, result){
                if(err) throw err;  
                
                response.send(String(result.insertId));                   
            })
});

app.put('/notas',
function(request, response){
    console.log(request.body);
    let params =  [request.body.student_id, request.body.subject_id, request.body.date1,request.body.nota1,request.body.markid];
    let sql = "UPDATE marks SET student_id = COALESCE(?, marks.student_id)," + "subject_id = COALESCE(?, marks.subject_id)," + 
    "date = COALESCE(?, marks.date)," + "mark = COALESCE(?, marks.mark) WHERE mark_id = ?"
    console.log('LA NOTA HA SIDO MODIFICADA' + sql);
    connection.query(sql, params, function (err, result){
        if(err) throw err;  
        
        response.send(String(result.insertId));                   
    })

});


app.delete('/notas',
function(request,response){

    
    let sql = "DELETE FROM marks WHERE marks.mark_id=" + request.body.markid
    console.log('LA NOTA HA SIDO BORRADA');



    connection.query(sql, function (err, result){
        if(err) throw err;  
        
        response.send(String(result.insertId));   
    })
}); 

app.get('/media',
function(request,respond){
   let sql;
   if(request.query.id !== null){
       sql = "SELECT AVG(marks.mark) AS AVG, students.first_name, students.last_name, subjects.title FROM marks JOIN students on (marks.student_id = students.student_id) JOIN subjects on (marks.subject_id = subjects.subject_id) WHERE students.student_id=" + request.query.id + " GROUP BY subjects.title"
   }
   connection.query(sql, function (err, result){
       if(err)throw err;
       
       respond.send(result)
   })
});


app.get('/apuntadas',
function(request,respond){
   let sql;
   if(request.query.id == null){
       sql = "SELECT DISTINCT students.first_name, students.last_name, subjects.title FROM groupss INNER JOIN subject_teacher on (groupss.group_id = subject_teacher.group_id) INNER JOIN subjects on(subject_teacher.subject_id = subjects.subject_id) INNER JOIN students on(groupss.group_id = students.group_id)";
   }else{
       sql = "SELECT DISTINCT students.first_name, students.last_name, subjects.title FROM groupss INNER JOIN subject_teacher on (groupss.group_id = subject_teacher.group_id) INNER JOIN subjects on(subject_teacher.subject_id = subjects.subject_id) INNER JOIN students on(groupss.group_id = students.group_id) WHERE students.student_id= " + request.query.id 
   }
   connection.query(sql, function (err, result){
       if(err)throw err;
       
       respond.send(result)
   })
});


app.get('/impartidas',
function(request,respond){
   let sql;
   if(request.query.id == null){
       sql = "SELECT teachers.first_name, teachers.last_name, subjects.title FROM subject_teacher INNER JOIN teachers on (subject_teacher.teacher_id = teachers.teacher_id) INNER JOIN subjects on(subject_teacher.subject_id = subjects.subject_id)"
   }else{
       sql = "SELECT teachers.first_name, teachers.last_name, subjects.title FROM subject_teacher INNER JOIN teachers on (subject_teacher.teacher_id = teachers.teacher_id) INNER JOIN subjects on(subject_teacher.subject_id = subjects.subject_id) WHERE teachers.teacher_id=" + request.query.id 
   }
   connection.query(sql, function (err, result){
       if(err)throw err;
       
       respond.send(result)
   })
});



app.use(function (req, res, next) {
    let respuesta = { error: true, codigo: 404, mensaje: "URL no encontrada" }
    res.status(404).send(respuesta)
})


app.listen(port)
