var boot = function(game){
	console.log("%cWelcome to the awesome game made by MGM game maker!!!", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
        this.game.load.image("logo", getContextPath() + '/resources/img/game/MGM_Logo.png'); 
	},
  	create: function(){
		this.game.state.start("Preload");
	}
}