package net.mgm.www.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import net.mgm.www.vo.GameNode;

public interface GameLoadMapper {
   public ArrayList<GameNode> loadGameScenes(int gameid);
   public HashMap<String, String> editScene(int nodeid);
   public ArrayList<GameNode> getChildnode(int parentid);
   public void saveGameScene(GameNode node);
   public HashMap<String, String> loadGameScene(int nodeid);
   public void updateNodeContent(GameNode updateNode);
   public HashMap<String, String> loadGame(int gameid);
   public void deleteNode(int nodeid);
   public void addChildScene(GameNode addNode);
}