package net.mgm.www.mapper;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import net.mgm.www.vo.UserGamePlay;
import net.mgm.www.vo.GameNode;

@Repository
public class GamePlayDAO implements GamePlayMapper{
	@Inject
	private SqlSession session;
	   
	@Override
	public void saveGame(UserGamePlay userGamePlay) {
		session.getMapper(GamePlayMapper.class).saveGame(userGamePlay);
	}
	
	@Override
	public void updateGame(UserGamePlay userGamePlay) {
		session.getMapper(GamePlayMapper.class).updateGame(userGamePlay);
	}
	
	@Override
	public GameNode loadGame(UserGamePlay userGamePlay) {
		return session.getMapper(GamePlayMapper.class).loadGame(userGamePlay);
	}
	
	@Override
	public UserGamePlay checkSaveData(UserGamePlay userGamePlay) {
		return session.getMapper(GamePlayMapper.class).checkSaveData(userGamePlay);
	}
}