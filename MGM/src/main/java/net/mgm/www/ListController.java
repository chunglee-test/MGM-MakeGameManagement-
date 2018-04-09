package net.mgm.www;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ListController {
	
	@RequestMapping(value="gameList")
	public String gameList() {
		return "";
	}
}
