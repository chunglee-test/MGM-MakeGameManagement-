package net.mgm.www.mapper;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;

import net.mgm.www.vo.Game;
import net.mgm.www.vo.GameComment;

public interface GameListMapper {
	public ArrayList<Game> getGamelist(String search);
	public Game gameSelect(int gameid);
	public ArrayList<GameComment> gameComment(int gameid);
	public void updateGameAccount(Game game);
	public void isOpenGame(Game game);
	public ArrayList<Game> getPopularGame(RowBounds rb);
	public ArrayList<Game> getRecentGame(RowBounds rb);
	public ArrayList<Game> getPlayedGame(RowBounds rb, String userid);
	public ArrayList<Game> getMadeGame(RowBounds rb, String userid);
	public void newGame(String userid);
	public Game newGameSelect(String userid);
	public void newGameNode(int gameid);
	public ArrayList<Game> searchGame(String query);
}
