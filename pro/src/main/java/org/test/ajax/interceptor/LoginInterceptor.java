package org.test.ajax.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginInterceptor extends HandlerInterceptorAdapter{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
				throws Exception{
		HttpSession session = request.getSession();
		String loginid = (String)session.getAttribute("loginId");
		//로그인 하지 않았거나 세션이 만료된 경우
		if(loginid == null) {
			response.sendRedirect(request.getContextPath() + "/customer/loginForm");
			return false;
		}
		
		return super.preHandle(request, response, handler);
		
	}

}
