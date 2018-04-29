package net.mgm.www;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;

import javax.inject.Inject;

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
	public String gameList(Model model, String search) {
		if(search == null) {
			search = "";
		}
		
		ArrayList<Game> gList = glDAO.getGamelist(search); 
		
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
        System.out.println(updateGameAccount);
         
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
                mFile.transferTo(new File(path + newFileName));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }        
        
        System.out.println(updateGameAccount);
        glDAO.updateGameAccount(updateGameAccount);
         
        return "true";
    }
}
