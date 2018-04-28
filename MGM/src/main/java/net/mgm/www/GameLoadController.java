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
		//returnScene.setChildnode(loadDAO.getChildnode(iNodeid));
		
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
		System.out.println("loadScene() nodeid: " + nodeid);
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
		
		return returnScene;
	}
	
	/**
	 * 자식노드 추가
	 */
	@ResponseBody
	@RequestMapping(value="addChildScene", method=RequestMethod.GET)
	public String addChildScene(String gameid, String nodeid) {
		System.out.println("nodeid: " + nodeid);
		int iNodeid = 0;
		try {
			iNodeid = Integer.parseInt(nodeid);
		}
		catch(Exception e) {
			return "false";
		}

		int iGameid = 0;
		try {
			iGameid = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return "false";
		}
		
		System.out.println(iGameid + "/" + iNodeid);
		
		GameNode addNode = new GameNode();
		addNode.setGameid(iGameid);
		addNode.setParentid(iNodeid);
		
		loadDAO.addChildScene(addNode);
		
		return "true";
	}
	
	/**
	 * 맵 에디터에서 정보를 수정하고 해당 노드의 정보를 업데이트하는 메소드
	 */
	@ResponseBody
	@RequestMapping(value="/updateGameScene", method=RequestMethod.POST)
	public String updateGameScene(int nodeid, String nodename, String nodecontent) {
		GameNode scene = new GameNode();
		scene.setNodeid(nodeid);
		scene.setNodename(nodename);
		scene.setNodecontent(nodecontent);
		
		loadDAO.updateNodeContent(scene);
		
		return "true";
	}
	
	/**
	 * 노드 에디터에서 맵 수정으로 넘어갈 때 노드의 정보 가져오는 메소드
	 */
	@RequestMapping(value="/loadGameScene", method=RequestMethod.GET)
	public String loadGameScene(String nodeid, Model model) {
		int iNodeid = 0;
		try {
			iNodeid = Integer.parseInt(nodeid);
		}
		catch(Exception e) {
			return null;
		}
		
		HashMap<String, String> scene = loadDAO.loadGameScene(iNodeid);
		ArrayList<GameNode> childList = loadDAO.getChildnode(iNodeid);
		
		if (scene.get("nodecontent") == null) {
			scene.put("nodecontent", "null");
		}
		
		model.addAttribute("scene", scene);
		model.addAttribute("childList", childList);
		
		return "mapEdit/mapEditor";		
	}
	
	/**
	 * 게임 플레이시 첫 노드 화면을 가져오는 메소드
	 */
	@RequestMapping(value="/loadGame", method=RequestMethod.GET)
	public String loadGame(String gameid, Model model) {
		int iGameid = 0;
		try {
			iGameid = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return null;
		}
		
		HashMap<String, String> scene = loadDAO.loadGame(iGameid);
		//ArrayList<Integer> childList = loadDAO.getChildnode(Integer.parseInt(scene.get("nodeid")));
		
		if (scene.get("nodecontent") == null) {
			scene.put("nodecontent", "null");
		}
		
		model.addAttribute("scene", scene);
		
		return "play/playGame";
	}
}
