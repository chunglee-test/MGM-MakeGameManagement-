package net.mgm.www.mapper;

import java.util.ArrayList;

import javax.inject.Inject;

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
	
}
