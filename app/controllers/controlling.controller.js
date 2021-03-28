const db = require("../models");
const { checkout, report } = require("../routes/routing.route");
const driver = db.apiends.driver;

function haversineDistance(coords1, coords2) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    var lon1 = coords1[0];
    var lat1 = coords1[1];
  
    var lon2 = coords2[0];
    var lat2 = coords2[1];
  
    var R = 6371; 
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }


const register=(req,res)=>{
    if((!req.body.name)||(!req.body.email)||(!req.body.phone_number)||(!req.body.license_number)||(!req.body.car_number)){
        res.status(400).send({
            status:"failure",
            reason:"Mandatory fields missing"
        })
        return;
    }
    var name=req.body.name;
    var email=req.body.email;
    var phone_number=req.body.phone_number;
    var license_number=req.body.license_number;
    var car_number=req.body.car_number;
    if(phone_number.length!=10){
        res.status(400).send({
            status:"failure",
            reason:"Phone number digits not 10"
        })
        return;
    }
    
    const driverdata={
        name:name,
        email:email,
        phone_number:phone_number,
        license_number:license_number,
        car_number:car_number,
        latitude:0.00,
        longitude:0.00
    }


    driver.create(driverdata)
    .then(response=>{
        res.status(201).send({
            id:response.id,
            name:response.name,
            email:response.email,
            phone_number:response.phone_number,
            license_number:response.license_number,
            car_number:response.car_number
        })
    })
    .catch(err=>{
        res.status(400).send({
            status:"failure",
            reason:"Could not be inserted"
        })
    })
}

const savelocation=(req,res)=>{
    var driverId=req.params.id;
    var latitude=req.body.latitude;
    var longitude=req.body.longitude;
    if((!driverId)||(!latitude)||(!longitude)){
        res.status(400).send({
            status:"failure",
            reason:"Details missing"
        })
        return;
    }
    driverId=parseInt(driverId)
    

    driver.update(
        {latitude:latitude,
        longitude:longitude},
        {where:{id:driverId}}
    )
    .then(response=>{
        res.status(202).send({
            status:"success"
        })
    })
    .catch(err=>{
        res.status(400).send({
            status:"failure",
            reason:"Error Updating"
        })
    })
    
    
}

const nearbyCabs=(req,res)=>{
    var lat=req.body.latitude
    var lon=req.body.longitude

    if((!lat)||(!lon)){
        res.status(400).send({
            status:"failure",
            reason:"Error Updating"
        })
        return;
    }
    var coords1=[]
    coords1.push(lon)
    coords1.push(lat)
    driver.findAll({
       
    })
    .then(response=>{
        var ans=[]
        for(i=0;i<response.length;i++){
            var coords2=[]
            coords2.push(response[i].longitude)
            coords2.push(response[i].latitude)
            var dis=haversineDistance(coords1,coords2)
          
            if(dis<=4)
            {
                var temp={}
                temp.name=response[i].name;
                temp.car_number=response[i].car_number;
                temp.phone_number=response[i].phone_number;
                ans.push(temp)
            }
        }
        if(ans.length==0){
            res.status(200).send({
                message:"No cabs available"
            })
            return;
        }
        
        res.status(200).send({
            available_cabs:ans
        })
    })
    .catch(err=>{
        res.status(400).send({
            status:"failure",
            reason:"Error Updating"
        })
    })
}

module.exports={
    register:register,
    savelocation:savelocation,
    nearbyCabs:nearbyCabs
}