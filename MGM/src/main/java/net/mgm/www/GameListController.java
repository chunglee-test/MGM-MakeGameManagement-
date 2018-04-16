package net.mgm.www;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.mgm.www.mapper.GameListDAO;
import net.mgm.www.vo.Game;
import net.mgm.www.vo.GameComment;

@Controller
public class GameListController {
	@Inject
	GameListDAO glDAO;
	
	@RequestMapping(value="gameList", method=RequestMethod.GET)
	public String gameList(Model model, String search) {
		if(search == null) {
			search = "";
		}
		
		ArrayList<Game> gList = glDAO.getGamelist(search); 
		
		model.addAttribute("gList", gList);
		
		return "main/GameList";
	}
	
	@RequestMapping(value="gameBoard", method=RequestMethod.GET)
	public String gameBoard(Model model, String gameid) {
		int iGameId = 0;
		try {
			iGameId = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return "main/GameList";
		}		
		
		Game game = glDAO.gameSelect(iGameId);
		ArrayList<GameComment> cList = glDAO.gameComment(iGameId);
		
		model.addAttribute("game", game);
		model.addAttribute("cList", cList);
		
		System.out.println(cList);
		
		for(GameComment g: cList) {
			System.out.println(g + "/");
		}
		
		return "main/gameBoard";
	}
}
