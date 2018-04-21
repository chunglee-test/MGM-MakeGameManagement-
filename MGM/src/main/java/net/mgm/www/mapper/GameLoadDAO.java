package net.mgm.www.mapper;

import java.util.ArrayList;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import net.mgm.www.vo.GameNode;

@Repository
public class GameLoadDAO implements GameLoadMapper{
	@Inject
	private SqlSession session;
	
	@Override
	public ArrayList<GameNode> selectGameNode(int gameid) {
		return session.getMapper(GameLoadMapper.class).selectGameNode(gameid);
	}

	@Override
	public void insertGameNode(GameNode node) {
		session.getMapper(GameLoadMapper.class).insertGameNode(node);
	}
}