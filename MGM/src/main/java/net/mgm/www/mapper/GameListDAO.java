package net.mgm.www.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import javax.inject.Inject;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import net.mgm.www.vo.Game;
import net.mgm.www.vo.GameComment;

@Repository
public class GameListDAO implements GameListMapper{
	
	@Inject
	private SqlSession session;

	@Override
	public ArrayList<Game> getGamelist(String search) {
		return session.getMapper(GameListMapper.class).getGamelist(search);
	}

	@Override
	public Game gameSelect(int gameid) {
		return session.getMapper(GameListMapper.class).gameSelect(gameid);
	}

	@Override
	public ArrayList<GameComment> gameComment(int gameid) {
		return session.getMapper(GameListMapper.class).gameComment(gameid);
	}

	@Override
	public void updateGameAccount(Game game) {
		session.getMapper(GameListMapper.class).updateGameAccount(game);
	}

	@Override
	public void isOpenGame(Game game) {
		session.getMapper(GameListMapper.class).isOpenGame(game);
	}

	@Override
	public ArrayList<Game> getPopularGame(RowBounds rb) {
		return session.getMapper(GameListMapper.class).getPopularGame(rb);
	}

	@Override
	public ArrayList<Game> getRecentGame(RowBounds rb) {
		return session.getMapper(GameListMapper.class).getRecentGame(rb);
	}

	@Override
	public ArrayList<Game> getPlayedGame(RowBounds rb, String userid) {
		return session.getMapper(GameListMapper.class).getPlayedGame(rb, userid);
	}

	@Override
	public ArrayList<Game> getMadeGame(RowBounds rb, String userid) {
		return session.getMapper(GameListMapper.class).getMadeGame(rb, userid);
	}

	@Override
	public void newGame(String userid) {
		session.getMapper(GameListMapper.class).newGame(userid);		
	}

	@Override
	public Game newGameSelect(String userid) {
		return session.getMapper(GameListMapper.class).newGameSelect(userid);
	}	
	
	@Override
	public void newGameNode(int gameid) {
		session.getMapper(GameListMapper.class).newGameNode(gameid);
	}

	@Override
	public ArrayList<Game> searchGame(String query) {
		return session.getMapper(GameListMapper.class).searchGame(query);
	}
	
	@Override
	public void writeComment(GameComment comment) {
		session.getMapper(GameListMapper.class).writeComment(comment);
	}

	@Override
	public HashMap<String, Integer> getGamePoint(int gameid) {
		return session.getMapper(GameListMapper.class).getGamePoint(gameid);
	}
}
