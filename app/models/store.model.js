module.exports = (sequelize, Sequelize) => {
  const driver=sequelize.define("driver",{
    name:{
      type:Sequelize.STRING,
      allowNull:false
    },
    email:{
      type:Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    phone_number:{
      type:Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    license_number:{
      type:Sequelize.STRING,
      unique:true,
      allowNull:false
    },
    car_number:{
      type:Sequelize.STRING,
      unique:true,
      allowNull:false
    },
    latitude:{
      type:Sequelize.DOUBLE
    },
    longitude:{
      type:Sequelize.DOUBLE
    }
  })



   
    module={}
    module.driver=driver;
    return module;
  };