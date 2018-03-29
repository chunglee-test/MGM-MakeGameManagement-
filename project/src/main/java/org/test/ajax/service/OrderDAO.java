package org.test.ajax.service;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.test.ajax.vo.CHorder;

@Repository
public class OrderDAO {

	@Autowired
	SqlSession session;
	
	public int insertOrder(CHorder order) {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		int result = mapper.insertOrder(order);
		
		return result; 
	}
	
	public CHorder getOrder(int orderNum) {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		CHorder order = mapper.getOrder(orderNum);
		
		return order;
	}
	
	public ArrayList<CHorder> orderlist(RowBounds rb) {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		ArrayList<CHorder> olist = mapper.orderlist(rb);
		
		return olist;
	}

	public int getOrderCount() {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		int result = mapper.getOrderCount();
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
