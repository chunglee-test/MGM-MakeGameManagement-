var gameOver = function(game){}
 
gameOver.prototype = {
	init: function(score){
		alert("게임 종료");
	},
  	create: function(){
		var playButton = this.game.add.button(160,320,"돌아가기",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}