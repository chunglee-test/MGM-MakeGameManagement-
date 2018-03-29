package org.test.ajax.service;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.test.ajax.vo.CHorder;

public interface OrderMapper {

	//주문 (insert)
	public int insertOrder(CHorder order);
	//select 가지고오기
	public CHorder getOrder(int orderNum);
	//전체목록
	public ArrayList<CHorder> orderlist(RowBounds rb);
	//전체 게시글 수
	public int getOrderCount();
}
