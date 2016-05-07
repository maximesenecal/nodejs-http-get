var https = require("https");

function printMessage(name, totalPoints, jsPoints){
  console.log(name+" a "+totalPoints+" badges et "+jsPoints+" points en JavaScript");
}

function printError(error){
  console.error(error);
}

function get(username){

  //Recuperation de donnees externes API
  var request = https.get("https://teamtreehouse.com/"+username+".json", function(response){
    console.log(response.statusCode);
    var body = "";
    var profile;
    //Affichage des donnee
    response.on('data', (chunk) => {
      //Concatenation des donnees
      body += chunk;
    });

    response.on('end', () => {
      //Check si nous avons une reponse
      if(response.statusCode === 200){
        try{
          //Parse datas
          profile = JSON.parse(body);
          //Printing datas
          printMessage(username, profile.badges.length, profile.points.JavaScript);
          console.log('No more data in response.');
        }catch(e){
          //Error parsing datas
          console.error(e.message);
        }
      }else{
        //Error with the url
        error = "There is an error with " +username+ " - Status code : " + response.statusCode + "";
        printError(error);
      }
    });

  });

  //Gestion des erreurs de recuperation
  request.on('error', function(e){
    console.log("Got error : " + e.message);
  });
}

module.exports.get = get;
