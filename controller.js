import drinks from "./db.json" assert {type: 'json'}

let globalId = 4;

const handlerFunctions = {
    sayHello: (req, res) =>{
        res.send({
            message: "hello there"
        });
    },

    getAllDrinks: (req, res) => {
        res.send({
            message: "Here are the drinks",
            allDrinks: drinks
        });
    },

    addDrink: (req, res) => {
        //grab drink name and pic from the post obj
        const drinkName = req.body.drinkName;
        const drinkPic = req.body.drinkPic;
        //Create a new drink obj, passing in the values from the request obj
        const newDrink = {
            id: globalId,
            name: drinkName,
            picture: drinkPic,
            votes: 0,
        };
        //add that new drink obj to our drink array (drinks)
        drinks.push(newDrink)
        
        globalId++

        res.send({
            message: "Drink added successfully",
            allDrinks: drinks,
        });
    },

    deleteDrink: (req, res) => {
        //grab drink's id from req.params object
        const drinkId = req.params.id
        //Find the drink obj with the matching id from our drinks array
        //then remove it from the drinks array
        for (let i = 0; i < drinks.length; i++){
            //iterating through drinks, fi a drinks id is a match
            //then we will delete it with a .splice() method
            if (drinks[i].id === +drinkId){
                //+"5" === Number("5")
                drinks.splice(i, 1)
                break
            }
        }
        res.send({
            message: "Drink deleted",
            allDrinks: drinks
        });
    },

    updateDrink: (req, res) => {
        //grab the id from req.params
        const drinkId = req.params.id;
        //grab the type (upvote/downvote)
        const voteType = req.body.voteType;

        //grab the index of the drink using its id and the 'findIndex' arr method
        const drinkIdx = drinks.findIndex((drink) => {
            return drink.id === +drinkId
        });

        //based on voteType, either increment or decrement the drink.votes property
        if(voteType === 'upvote'){
            drinks[drinkIdx].votes += 1
        } else if (voteType === 'downvote') {
            drinks[drinkIdx].votes -= 1
        }

        //send a response w all the drinks again (drinks arr will now have the new vote value of this drink)
        res.send ({
            message: "Vote count updated",
            allDrinks: drinks,
        });
    },
};


export default handlerFunctions;