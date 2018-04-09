package net.mgm.www;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.mgm.www.mapper.UserDAO;
import net.mgm.www.vo.User;

@Controller
public class UserController {
	@Inject
	private UserDAO udao;
	 
	@RequestMapping(value="/loginPage")
	public String loginPage() {
		return "main/loginPage";
	}
	
	@RequestMapping(value="/login")
	public String login(User loginUser, HttpSession session) {
		User loginResult = udao.loginUser(loginUser);
		
		if(loginResult.getUserid() == null) {
			return "";
		}
		else {
			session.setAttribute("userid", loginResult.getUserid());
			session.setAttribute("nick", loginResult.getNick());
			
			return "home";
		}
	}
	
	@RequestMapping(value="/logout")
	public String logout() {
		return "home";
	}
}