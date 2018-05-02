package net.mgm.www.interceptor; 
import javax.servlet.http.HttpServletRequest; 
import javax.servlet.http.HttpServletResponse; 
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter; 

public class Interceptor extends HandlerInterceptorAdapter{ 
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
		try { 
			//logininfo ���ǰ��� ���ϰ�� 
			if(request.getSession().getAttribute("userid") == null ){ 
				//�α�����������  redirect 
				response.sendRedirect("main");	
				return false; 
			} 
		} 
		catch (Exception e) { 
			e.printStackTrace();		
		} 
		//���� �ƴϸ� ���������� ��Ʈ�ѷ� ȣ�� 
		
		return true; 
	} 		
}