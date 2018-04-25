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
		
	
	/**
	 * 게임 노드 보여주는 페이지
	 */
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
	
	/**
	 * 게임 노드 페이지에서 AJAX로 데이터 불러오는 부분
	 */
	@ResponseBody
	@RequestMapping(value="gameScenes", method=RequestMethod.GET)
	public ArrayList<GameNode> sceneLoad(HttpServletResponse response, String gameid) {
		response.setContentType("application/json");		

		int iGameid = 0;
		try {
			iGameid = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return null;
		}
		
		ArrayList<GameNode> gnList = loadDAO.loadGameScenes(iGameid);
		
		return gnList;
	}
	
	/**
	 * 맵에디터에서 페이지 수정시
	 */
	@ResponseBody
	@RequestMapping(value="/editScene", method=RequestMethod.GET)
	public GameNode editScene(String nodeid, HttpSession session) {
		int iNodeid = 0;
		try {
			iNodeid = Integer.parseInt(nodeid);
		}
		catch(Exception e) {
			return null;
		}
		
		HashMap<String, String> scene = loadDAO.editScene(iNodeid);
		/*String userid = (String)session.getAttribute("userid");
		
		if(!(scene.get("userid").equals(userid))) {
			return null;
		}*/
		
		GameNode returnScene = new GameNode();
		returnScene.setNodename(scene.get("nodename"));
		returnScene.setNodecontent(scene.get("nodecontent"));
		returnScene.setChildnode(loadDAO.getChildnode(iNodeid));
		
		return returnScene;		
	}
	
	/**
	 * 맵 에디터에서 데이터를 가져와 저장하는 부분
	 */
	@ResponseBody
	@RequestMapping(value="/saveScene", method=RequestMethod.POST)
	//public String saveScene(GameNode scene) {
	public String saveScene(int gameid, int nodeid, int parentid, String nodename, String nodecontent, ArrayList<Integer> childnode) {
		GameNode scene = new GameNode();
		scene.setGameid(gameid);
		scene.setNodeid(nodeid);
		scene.setParentid(parentid);
		scene.setNodename(nodename);
		scene.setNodecontent(nodecontent);
		scene.setChildnode(childnode);
		
		System.out.println(scene);
		
		loadDAO.saveGameScene(scene);
		
		//return "redirect:produceScene?gameid=" + scene.getGameid();
		return "produceScene?gameid=" + scene.getGameid();
	}
	
	/**
	 * 플레이시 scene 정보 가져오는 부분
	 */
	@ResponseBody
	@RequestMapping(value="loadScene", method=RequestMethod.GET)
	public GameNode loadScene(String nodeid, HttpSession session) {	
		int iNodeid = 0;
		try {
			iNodeid = Integer.parseInt(nodeid);
		}
		catch(Exception e) {
			return null;
		}
				
		HashMap<String, String> scene = loadDAO.editScene(iNodeid);
		
		GameNode returnScene = new GameNode();
		returnScene.setNodename(scene.get("nodename"));
		returnScene.setNodecontent(scene.get("nodecontent"));
		//returnScene.setChildnode(loadDAO.getChildnode(iNodeid));
		
		return returnScene;
	}
	
}
