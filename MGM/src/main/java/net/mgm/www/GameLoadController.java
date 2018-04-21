package net.mgm.www;

import java.util.ArrayList;
import java.util.HashMap;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.mgm.www.mapper.GameListDAO;
import net.mgm.www.mapper.GameLoadDAO;
import net.mgm.www.vo.GameNode;

@Controller
public class GameLoadController {
	@Inject
	GameLoadDAO loadDAO;
	@Inject
	GameListDAO listDAO;
		
	@RequestMapping(value="produceScene", method=RequestMethod.GET)
	public String produce(String gameid, HttpSession session, Model model) {
		int iGameid = 0;
		try {
			iGameid = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return "main";
		}
		
		/*if(!listDAO.gameSelect(iGameid).getNick().equals(session.getAttribute("nick"))) {
			return "home";
		}*/
		
		return "produce/pmain";
	}
	
	@ResponseBody
	@RequestMapping(value="sceneLoad", method=RequestMethod.GET)
	public ArrayList<GameNode> sceneLoad(HttpServletResponse response, String gameid) {
		response.setContentType("application/json");		

		int iGameid = 0;
		try {
			iGameid = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return null;
		}
		
		ArrayList<GameNode> gnList = loadDAO.selectGameNode(iGameid);
		
		return gnList;
	}
	
	@ResponseBody
	@RequestMapping(value="sceneSave", method=RequestMethod.POST)
	public String sceneSave(String gameid, GameNode node) {
		loadDAO.insertGameNode(node);
		
		return "true";
	}
}
