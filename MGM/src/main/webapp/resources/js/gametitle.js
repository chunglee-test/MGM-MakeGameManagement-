var gameTitle = function(game){}
 
gameTitle.prototype = {
  	create: function(){
		var playButton = this.game.add.button(400,300,"logo",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}