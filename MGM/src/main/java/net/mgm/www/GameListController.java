package net.mgm.www;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import net.mgm.www.mapper.GameListDAO;
import net.mgm.www.vo.Game;
import net.mgm.www.vo.GameComment;

@Controller
public class GameListController {
	@Inject
	GameListDAO glDAO;
	
	@RequestMapping(value="gameList", method=RequestMethod.GET)
	public String gameList(Model model, String search, String query, String page, HttpSession session) {
		if(search == null) {
			search = "popular";
		}
		
		int iPage = 1;
		try {
			iPage = Integer.parseInt(page);
			
			if(iPage < 1) {
				iPage = 1;
			}
		}
		catch(Exception e) {}
		
		RowBounds rb = new RowBounds((iPage-1)*4, 4);		
		ArrayList<Game> gList = null;
		
		switch(search) {
			case "popular":
				gList = glDAO.getPopularGame(rb);
				break;
				
			case "recently":
				gList = glDAO.getRecentGame(rb);
				break;
				
			case "played":
				if(session.getAttribute("userid") == null) {
					return "redirect:./";
				}
				
				gList = glDAO.getPlayedGame(rb, (String)session.getAttribute("userid"));
				break;
				
			case "made":
				if(session.getAttribute("userid") == null) {
					return "redirect:./";
				}
				
				gList = glDAO.getMadeGame(rb, (String)session.getAttribute("userid"));
				break;
			case "name":
				if(query == null) {
					return "./";
				}
				gList = glDAO.searchGame(query);
				break;
		}		
		
		model.addAttribute("gList", gList);
		
		return "main/GameList";
	}
	
	@RequestMapping(value="gameBoard", method=RequestMethod.GET)
	public String gameBoard(Model model, String gameid) {
		int iGameId = 0;
		try {
			iGameId = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return "main/GameList";
		}				
		
		Game game = glDAO.gameSelect(iGameId);
		ArrayList<GameComment> cList = glDAO.gameComment(iGameId);
		
		model.addAttribute("game", game);
		model.addAttribute("cList", cList);
		
		return "main/gameBoard";
	}
	

	@ResponseBody
	@RequestMapping(value="/saveGameAccount", method=RequestMethod.POST)
    public String saveGameAccount(MultipartHttpServletRequest multi, Game updateGameAccount) {
        String root = multi.getSession().getServletContext().getRealPath("/");
        String path = root+"resources/img/game/";
         
        String newFileName = ""; // 업로드 되는 파일명     
         
        Iterator<String> files = multi.getFileNames();
        while(files.hasNext()){
            String uploadFile = files.next();
                         
            MultipartFile mFile = multi.getFile(uploadFile);
            String fileName = mFile.getOriginalFilename();
            String fileExtention = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
    		
            /*파일 확장자 검증*/
    		String[] imgExt = {"jpg", "png"};
    		boolean isImg = false;
    		
    		for(String ext : imgExt) {
    			if(fileExtention.equals(ext)) {
    				isImg = true;
    				break;
    			}
    		}    		
    		if(!isImg) {
    			break;
    		}
    		
            newFileName = updateGameAccount.getGameid() + "_maintitle." + fileName.substring(fileName.lastIndexOf(".")+1);
            try {
            	File saveImg = new File(path + newFileName);
            	if(saveImg.isFile()) {
            		saveImg.delete();
            	}
                mFile.transferTo(saveImg);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }        
        glDAO.updateGameAccount(updateGameAccount);
         
        return "true";
    }
	
	@ResponseBody
	@RequestMapping(value="/saveGameScreenshot", method=RequestMethod.POST)
    public String saveGameScreenshot(MultipartHttpServletRequest multi, int gameid) {         
        String root = multi.getSession().getServletContext().getRealPath("/");
        String path = root+"resources/img/game/";
         
        String newFileName = ""; // 업로드 되는 파일명     
         
        Iterator<String> files = multi.getFileNames();
        int imgCnt=1;
        while(files.hasNext()){
            String uploadFile = files.next();
            
            MultipartFile mFile = multi.getFile(uploadFile);
            String fileName = mFile.getOriginalFilename();
            String fileExtention = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
    		
            /*파일 확장자 검증*/
    		String[] imgExt = {"jpg", "png"};
    		boolean isImg = false;
    		
    		for(String ext : imgExt) {
    			if(fileExtention.equals(ext)) {
    				isImg = true;
    				break;
    			}
    		}    		
    		if(!isImg) {
    			break;
    		}
    		
            newFileName = gameid + "_screenshot_"+ imgCnt +"." + fileName.substring(fileName.lastIndexOf(".")+1);
            try {
            	File saveImg = new File(path + newFileName);
            	if(saveImg.isFile()) {
            		saveImg.delete();
            	}
            	
            	System.out.println(path + newFileName);
                mFile.transferTo(saveImg);
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            imgCnt++;
        }
        
        return "true";
    }
	
	@ResponseBody
	@RequestMapping(value="openGame", method=RequestMethod.GET)
	public String openGame(String gameid, String isopen, HttpSession session) {
		int getGameid = 0;
		try {
			getGameid = Integer.parseInt(gameid);
		}
		catch(Exception e) {
			return "false";
		}
		
		Game game = new Game();
		game.setGameid(getGameid);
		game.setIsopen(isopen);
		
		Game targetGame = glDAO.gameSelect(game.getGameid());
		
		if(session.getAttribute("userid").equals(targetGame.getUserid())) {
			glDAO.isOpenGame(game);
			
			return "true";
		}
		else {
			return "false";
		}
	}
	
	@RequestMapping(value="newGame")
	public String newGame(HttpSession session) {
		String userid = (String)session.getAttribute("userid");
		Game newGame = glDAO.newGameSelect(userid);
		
		if(newGame == null) {
			glDAO.newGame(userid);
			newGame = glDAO.newGameSelect(userid);
			glDAO.newGameNode(newGame.getGameid());
		}
		else {
			newGame = glDAO.newGameSelect(userid);			
		}
		
		return "redirect:./gameBoard?gameid=" + newGame.getGameid();
	}
}
