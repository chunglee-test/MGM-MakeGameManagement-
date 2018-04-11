package net.mgm.www.mapper;

import java.util.ArrayList;

import net.mgm.www.vo.Game;

public interface GameListMapper {
	public ArrayList<Game> getGamelist(String search);
	public Game gameSelect(int gameid);
}
