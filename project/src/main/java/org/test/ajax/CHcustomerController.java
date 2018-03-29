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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.test.ajax.service.customerDAO;
import org.test.ajax.vo.CHcustomer;

@Controller
@SessionAttributes("customer")
public class CHcustomerController {
	
	@Autowired
	customerDAO dao;
	
	@RequestMapping("home")
	public String home() {
		return "redirect:../";
	}
	
	@RequestMapping("customer/joinForm")
	public String joinForm() {
		return "/customer/joinForm";
	}

	@RequestMapping(value="customer/idcheck", method=RequestMethod.GET)
	public String idcheck(Model model) {
		model.addAttribute("selectCustomer", false);

		return "/customer/idcheck";
	}
	
	@RequestMapping(value="customer/idcheck", method=RequestMethod.POST)
	public String idcheck(String searchId, Model model) {
		CHcustomer c = dao.selectCustomer(searchId);
		model.addAttribute("searchId", searchId);
		model.addAttribute("searchResult", c);
		model.addAttribute("selectCustomer", true);
	return "customer/idcheck";
	}
	
	@RequestMapping("customer/join")
	public String join(CHcustomer c) {
		dao.insertCustomer(c);
		return "redirect:joinComplete";
	}
	
	@RequestMapping("customer/joinComplete")
	public String joinComplete(@ModelAttribute("CHcustomer") 
			CHcustomer c, SessionStatus sessionStatus, Model model) {
	
		model.addAttribute("id", c.getId());
		sessionStatus.setComplete();
		
		return "customer/joinComplete";
	}

}

