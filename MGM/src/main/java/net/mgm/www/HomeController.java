package net.mgm.www;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import javax.inject.Inject;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.mgm.www.mapper.GameListDAO;
import net.mgm.www.vo.Game;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@Inject
	GameListDAO glDAO;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		return "home";
	}
	
	@RequestMapping (value = "/mapEdit", method = RequestMethod.GET)
	public String mapEditPage() {
		return "mapEdit/mapEditor";
	}
	
	@RequestMapping (value = "/eventEdit", method = RequestMethod.GET)
	public String mapEditEventPage() {
		return "mapEdit/eventEditor";
	}
	
	@RequestMapping (value = "/scriptEdit", method = RequestMethod.GET)
	public String mapEditScriptPage() {
		return "mapEdit/scriptEditor";
	}
	
	@RequestMapping (value = "/playGame", method = RequestMethod.GET)
	public String playGamePage() {
		return "play/playGame";
	}
	
	@RequestMapping(value="/main")
	public String main(Model model) {
		RowBounds rb = new RowBounds(0,4);
		
		ArrayList<Game> pList = glDAO.getPopularGame(rb);
		ArrayList<Game> rList = glDAO.getRecentGame(rb);
		
		model.addAttribute("pList", pList);
		model.addAttribute("rList", rList);
		
		return "main/main";
	}
}
