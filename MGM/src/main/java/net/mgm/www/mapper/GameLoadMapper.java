package net.mgm.www.mapper;

import java.util.ArrayList;

import net.mgm.www.vo.GameNode;

public interface GameLoadMapper {
	public ArrayList<GameNode> selectGameNode(int gameid);
	public void insertGameNode(GameNode node);
}
