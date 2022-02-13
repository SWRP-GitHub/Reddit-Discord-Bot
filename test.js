const fs = require("fs");
var usersList = {
    volene: "Volene",
    crab: "Smart-Ass Crab",
    oph: "Ophelia",
    malgus: "Almighty_Malgus"
  };
/////////////////////////////////////////////////////////////////////
var switchInt = 2; //Script state
var user = usersList.malgus //Who are you searching for if state is 1?
/////////////////////////////////////////////////////////////////////
//Read log File
var json = fs.readFileSync("ServerChatLog.json", "utf8", (err) => {
  if (err) {
    console.log("something went wrong reading the file");
  }
});
//Parse log into JSON obj
let variable = JSON.parse(json);
//Search log for author
if (switchInt === 1) {
  for (i in variable) {
    if (variable[i].author === user) {
      console.log(variable[i]);
    }
  }
}
//Pull whole log
if (switchInt === 2) {
  for (i in variable) {
    console.log(variable[i]);
  }
}
