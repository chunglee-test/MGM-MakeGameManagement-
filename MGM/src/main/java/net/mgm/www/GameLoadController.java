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
    * ���� ��� �����ִ� ������
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
    * ���� ��� ���������� AJAX�� ������ �ҷ����� �κ�
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
    * �ʿ����Ϳ��� ������ ������
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
    * �� �����Ϳ��� �����͸� ������ �����ϴ� �κ�
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
    * �÷��̽� scene ���� �������� �κ�
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
      
      return returnScene;
   }
   
   /**
    * �ڽĳ�� �߰�
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
    * �� �����Ϳ��� ������ �����ϰ� �ش� ����� ������ ������Ʈ�ϴ� �޼ҵ�
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
    * ��� �����Ϳ��� �� �������� �Ѿ �� ����� ���� �������� �޼ҵ�
    */
   @RequestMapping(value="/loadGameScene", method=RequestMethod.GET)
   public String loadGameScene(String nodeid, Model model) {
      System.out.println("loadGameScene called with " + nodeid);

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

      System.out.println(childList);
      
      return "mapEdit/mapEditor";      
   }
   
   /**
    * ���� �÷��̽� ù ��� ȭ���� �������� �޼ҵ�
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
      
      if (scene.get("nodecontent") == null) {
         scene.put("nodecontent", "null");
      }
      
      model.addAttribute("scene", scene);
      
      return "play/playGame";
   }
}