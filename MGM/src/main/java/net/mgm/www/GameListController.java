package net.mgm.www;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.mgm.www.mapper.GameListDAO;
import net.mgm.www.vo.Game;

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
}
