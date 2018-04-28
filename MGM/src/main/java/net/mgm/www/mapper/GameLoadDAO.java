package net.mgm.www.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import net.mgm.www.vo.GameNode;

@Repository
public class GameLoadDAO implements GameLoadMapper{
	@Inject
	private SqlSession session;
	
	@Override
	public ArrayList<GameNode> loadGameScenes(int gameid) {
		return session.getMapper(GameLoadMapper.class).loadGameScenes(gameid);
	}

	@Override
	public HashMap<String, String> editScene(int nodeid) {
		return session.getMapper(GameLoadMapper.class).editScene(nodeid);
	}
	
	@Override
	public ArrayList<GameNode> getChildnode(int parentid){
		return session.getMapper(GameLoadMapper.class).getChildnode(parentid);
	}
	
	@Override
	public void saveGameScene(GameNode node) {
		session.getMapper(GameLoadMapper.class).saveGameScene(node);
	}
	
	@Override
	public HashMap<String, String> loadGameScene(int nodeid) {
		return session.getMapper(GameLoadMapper.class).loadGameScene(nodeid);
	}
	
	@Override
	public void updateNodeContent(GameNode updateNode) {
		session.getMapper(GameLoadMapper.class).updateNodeContent(updateNode);
	}
	
	@Override
	public HashMap<String, String> loadGame(int gameid) {
		return session.getMapper(GameLoadMapper.class).loadGame(gameid);
	}

	@Override
	public void deleteNode(int nodeid) {
		session.getMapper(GameLoadMapper.class).deleteNode(nodeid);
	}

	@Override
	public void addChildScene(GameNode addNode) {
		session.getMapper(GameLoadMapper.class).addChildScene(addNode);
	}
}