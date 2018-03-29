package org.test.ajax;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.test.ajax.service.customerDAO;
import org.test.ajax.vo.CHcustomer;

@Controller
@RequestMapping("customer")
@SessionAttributes("customer")
public class JoinController {
	private static final Logger logger = LoggerFactory.getLogger(JoinController.class);
	
	@Autowired
	customerDAO dao;
	
	@RequestMapping("/loginForm")
	public String gologinForm() {
		return "/customer/login";
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST) 
	public String login(String id, String pw, Model model, HttpSession session) {
		CHcustomer c = dao.selectCustomer(id); 
		if (c != null && c.getPw().equals(pw)) {
			session.setAttribute("loginId", c.getId());
			session.setAttribute("loginName", c.getName());
			return "redirect:../";
		}
		else {
			return "redirect:./";
		}
	}
	
	@RequestMapping (value="/logout", method=RequestMethod.GET)
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	
	@RequestMapping("/updateForm")
	public String goupdateForm() {
		return "/customer/updateForm";
	}
	/*
	@RequestMapping(value="/update", method=RequestMethod.GET)
	public String updateForm(HttpSession session, Model model) {
		String id = (String) session.getAttribute("loginId");
		CHcustomer c = dao.selectCustomer(id);

		model.addAttribute("customer", c);
		return "customer/updateForm";
	}*/
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	public String update(Model model, HttpSession session) {
		String id = (String) session.getAttribute("loginId");
		CHcustomer c = dao.selectCustomer(id);
		model.addAttribute("customer", c);
		dao.updateCustomer(c);
		return "redirect:../";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
