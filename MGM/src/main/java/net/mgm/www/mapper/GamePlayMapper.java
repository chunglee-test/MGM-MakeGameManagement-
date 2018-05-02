package net.mgm.www.mapper;

import net.mgm.www.vo.GameNode;
import net.mgm.www.vo.UserGamePlay;

public interface GamePlayMapper {
   public void saveGame(UserGamePlay userGamePlay);
   public void updateGame(UserGamePlay userGamePlay);
   public GameNode loadGame(UserGamePlay userGamePlay);
   public UserGamePlay checkSaveData(UserGamePlay userGamePlay);
}