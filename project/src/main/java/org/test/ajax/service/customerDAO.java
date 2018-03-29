package org.test.ajax.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.test.ajax.vo.CHcustomer;

@Repository
public class customerDAO implements customerMapper{

	@Autowired
	SqlSession session;

	@Override
	public int insertCustomer(CHcustomer c) {
		return session.getMapper(customerMapper.class).insertCustomer(c);
	}

	@Override
	public CHcustomer selectCustomer(String id) {
		return session.getMapper(customerMapper.class).selectCustomer(id);
	}

	@Override
	public int updateCustomer(CHcustomer c) {
		return session.getMapper(customerMapper.class).updateCustomer(c);
	}

	@Override
	public int deleteCustomer(CHcustomer c) {
		return session.getMapper(customerMapper.class).deleteCustomer(c);
	}

	

	
	
}
