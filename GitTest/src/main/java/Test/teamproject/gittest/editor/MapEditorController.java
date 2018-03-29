package Test.teamproject.gittest.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("mapeditor")
public class MapEditorController {
	
	@RequestMapping (value = "/main", method = RequestMethod.GET)
	public String mapEditorMain() {
		return "MapEditors/mapEditor";
	}
}
