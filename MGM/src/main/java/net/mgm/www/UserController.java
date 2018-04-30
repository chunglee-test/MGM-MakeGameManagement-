package net.mgm.www;

import java.io.File;
import java.util.Iterator;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import net.mgm.www.mapper.UserDAO;
import net.mgm.www.vo.User;

@Controller
public class UserController {
	@Inject
	private UserDAO udao;
	
	@ResponseBody
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login(User loginUser, HttpSession session) {		
		User loginResult = udao.loginUser(loginUser);
		
		if(loginResult.getUserid() == null) {
			return "false";
		}
		else {
			session.setAttribute("userid", loginResult.getUserid());
			session.setAttribute("nick", loginResult.getNick());
			
			return "true";
		}
	}
	
	@RequestMapping(value="/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		
		return "redirect:./";
	}
	
	@ResponseBody
	@RequestMapping(value="/signup", method=RequestMethod.POST)
    public String fileUp(MultipartHttpServletRequest multi) {
         
        String root = multi.getSession().getServletContext().getRealPath("/");
        String path = root+"resources/img/user/";
         
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
    			return "false";
    		}
    		
            newFileName = multi.getParameter("userid") + "." + fileName.substring(fileName.lastIndexOf(".")+1);
            
            try {
                mFile.transferTo(new File(path + newFileName));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        User user = new User(multi.getParameter("userid"), multi.getParameter("userpw"), multi.getParameter("nick"), multi.getParameter("email"));
        
        udao.signupUser(user);
         
        return "true";
    }
	
	@ResponseBody
	@RequestMapping(value="idCheck", method=RequestMethod.POST)
	public String idCheck(String joinId) {
		String result = udao.idCheck(joinId);
		
		if(result != null) {
			return "false";
		}
		
		return "true";
	}
	
	@ResponseBody
	@RequestMapping(value="signupProfile", method=RequestMethod.POST)
	public String signupProfile(HttpServletRequest img) {
		
		return "true";
	}
}