package org.test.ajax.service;

import org.test.ajax.vo.CHcustomer;

public interface customerMapper {
	//회원 가입
	public int insertCustomer(CHcustomer c);
	//ID로 해당 회원 정보 검색
	public CHcustomer selectCustomer(String id);
	//회원 정보 수정
	public int updateCustomer(CHcustomer c);
	//회원 탈퇴
	public int deleteCustomer(CHcustomer c);
	
}
