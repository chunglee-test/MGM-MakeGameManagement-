package net.mgm.www.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import net.mgm.www.vo.GameNode;

public interface GameLoadMapper {
	public ArrayList<GameNode> loadGameScenes(int gameid);
	public void saveGameScene(GameNode node);
	public HashMap<String, String> editScene(int nodeid);
	public ArrayList<Integer> getChildnode(int parentid);
	public void updateNodeContent(GameNode updateNode);
	public void deleteNode(int nodeid);
}
