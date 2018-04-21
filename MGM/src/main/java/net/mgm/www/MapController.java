package net.mgm.www;

import java.util.ArrayList;
import javax.inject.Inject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import net.mgm.www.mapper.MapDAO;
import net.mgm.www.vo.maptest;

@Controller
public class MapController {

	@Inject
	private MapDAO mdao;
	
	@ResponseBody
	@RequestMapping(value="/getMap", method=RequestMethod.GET)
	public ArrayList<maptest> btn_change_map(Model model) {
		ArrayList<maptest>maplist = mdao.maplist();
		
		return maplist;
		
	}
	
}
