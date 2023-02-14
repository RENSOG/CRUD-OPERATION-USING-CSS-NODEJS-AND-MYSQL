const mysql=require("mysql");

const con=mysql.createPool({
    connectionLimit:10,
    host     :process.env.host1,
    user     :process.env.user1,
    password :process.env.pass,
    database :process.env.dbname
});

exports.view = (req,res)=>{


con.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from users",(err,rows)=>{
        connection.release();
        if(!err){
            console.log("good");
            res.render("home",{rows});
        }
        else{
            console.log("error"+err);
        };
    })
});
};
exports.adduser=(req,res)=>{

    

    res.render("adduser");
}
exports.save=(req,res)=>{
    
con.getConnection((err,connection)=>{
    if(err) throw err

    const {name, age,city}=req.body;
    connection.query("insert into users(NAM , AGE, CITY) values(?,?,?)",[name,age,city], (err,rows)=>{
        connection.release();
        if(!err){
           res.render("adduser",{masg:"user details added success"})
        }
        else{
            console.log("error"+err);
        };
    })
});

    

   
}

exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;

        connection.query("select * from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
               
                res.render("edituser",{rows});
            }
            else{
                console.log("error"+err);
            };
        })
    });

   
}

exports.edit=(req,res)=>{
    
    con.getConnection((err,connection)=>{
        if(err) throw err
    
        const {name, age,city}=req.body;
        let id = req.params.id;
        

        connection.query("update users set NAM=? , AGE=?, CITY=? where ID=?",[name,age,city,id], (err,rows)=>{
            connection.release();
            if(!err){

                con.getConnection((err,connection)=>{
                    if(err) throw err
            
                    let id=req.params.id;
            
                    connection.query("select * from users where id=?",[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                        
                            res.render("edituser",{rows,masg:"update details added success"}) 
                        }
                        else{
                            console.log("error"+err);
                        };
                    })
                });
            







              
            }
            else{
                console.log("error"+err);
            };
        })
    });}



    exports.delete=(req,res)=>{
        con.getConnection((err,connection)=>{
            if(err) throw err
             
            let id=req.params.id;
            connection.query("delete from users where id=?",[id],
            (err,rows)=>{
                connection.release();
                if(!err){
                    res.redirect("/");

                }else{
                    console.log(err);
                }
            })

        })
    }
    
    
        
    
       
   





