package net.mgm.www;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Site Connect", locale);
		
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
}
