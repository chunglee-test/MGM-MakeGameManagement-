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

import net.mgm.www.mapper.GamePlayDAO;
import net.mgm.www.vo.GameNode;
import net.mgm.www.vo.UserGamePlay;


@Controller
public class GamePlayController {
   @Inject
   GamePlayDAO playDAO;
   
   /**
    * 지금까지 진행 하던 게임 저장
    */
   @ResponseBody
   @RequestMapping(value="/saveGame", method=RequestMethod.GET)
   public String saveGame(int gameid, int nodeid, HttpSession session) {
      UserGamePlay userGamePlay = new UserGamePlay();
      userGamePlay.setGameid(gameid);
      userGamePlay.setNodeid(nodeid);
      userGamePlay.setUserid((String)session.getAttribute("userid"));
      
      System.out.println(userGamePlay);
      
      UserGamePlay isSave = playDAO.checkSaveData(userGamePlay);
      System.out.println(isSave);
      
      if(isSave != null) {
    	  playDAO.updateGame(userGamePlay);
      }
      else {          
          playDAO.saveGame(userGamePlay);    	  
      }

      return "true";
   }
   
   /**
    * 지금까지 진행 하던 게임 불러오기
    */
   @RequestMapping(value="/loadGameFromHis", method=RequestMethod.GET)
   public String loadGameFromHis(int gameid, HttpSession session, Model model) {
      UserGamePlay userGamePlay = new UserGamePlay();
      userGamePlay.setGameid(gameid);
      userGamePlay.setUserid((String)session.getAttribute("userid"));
      
      GameNode scene = playDAO.loadGame(userGamePlay);

      model.addAttribute("scene", scene);

      return "play/playGame";
   }
   
}